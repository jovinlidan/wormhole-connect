import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  amount as sdkAmount,
  chainIdToChain,
  toNative,
  Wormhole,
} from '@wormhole-foundation/sdk';

import config from 'config';
import { WORMSCAN } from 'config/constants';
import { getGasToken } from 'utils';

import type { Chain, ChainId } from '@wormhole-foundation/sdk';
import type { Transaction } from 'config/types';
import { toFixedDecimals } from 'utils/balance';
import { useTokens } from 'contexts/TokensContext';
import { Token } from 'config/tokens';

interface WormholeScanTransaction {
  id: string;
  content: {
    payload: {
      amount: string;
      callerAppId: string;
      fromAddress: string;
      parsedPayload: {
        feeAmount: string;
        recipientWallet: string;
        toNativeAmount: string;
      };
      toAddress: string;
      toChain: number;
      tokenAddress: string;
      tokenChain: number;
    };
    standarizedProperties: {
      appIds: Array<string>;
      fromChain: ChainId;
      fromAddress: string;
      toChain: ChainId;
      toAddress: string;
      tokenChain: ChainId;
      tokenAddress: string;
      amount: string;
      feeAddress: string;
      feeChain: number;
      fee: string;
      normalizedDecimals?: number;
    };
  };
  sourceChain: {
    chainId: number;
    timestamp: string;
    transaction: {
      txHash: string;
    };
    from: string;
    status: string;
    fee: string;
    gasTokenNotional: string;
    feeUSD: string;
  };
  targetChain?: {
    chainId: 6;
    timestamp: string;
    transaction: {
      txHash: string;
    };
    status: string;
    from: string;
    to: string;
    fee: string;
    gasTokenNotional: string;
    feeUSD: string;
  };
  data: {
    symbol: string;
    tokenAmount: string;
    usdAmount: string;
  };
}

// TODO: SDKV2 route specific details don't belong here
interface WormholeScanPorticoParsedPayload {
  finalTokenAddress: string;
  flagSet: {
    flags: {
      shouldWrapNative: boolean;
      shouldUnwrapNative: boolean;
    };
  };
  minAmountFinish: string;
  recipientAddress: string;
  relayerFee: string;
}

type Props = {
  address: string;
  page?: number;
  pageSize?: number;
};

// Number of decimals from WHScan API results are fixed to 8
const DECIMALS = 8;

const useTransactionHistoryWHScan = (
  props: Props,
): {
  transactions: Array<Transaction> | undefined;
  error: string;
  isFetching: boolean;
  hasMore: boolean;
} => {
  const [transactions, setTransactions] = useState<
    Array<Transaction> | undefined
  >();
  const [error, setError] = useState('');
  const [isFetching, setIsFetching] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const { getOrFetchToken } = useTokens();

  const { address, page = 0, pageSize = 30 } = props;

  // Common parsing logic for a single transaction from WHScan API.
  // IMPORTANT: Anything specific to a route, please use that route's parser:
  // parseTokenBridgeTx | parseNTTTx | parseCCTPTx | parsePorticoTx
  const parseSingleTx = useCallback(
    async (tx: WormholeScanTransaction) => {
      const { content, data, sourceChain, targetChain } = tx;
      const { standarizedProperties } = content || {};

      const fromChainId =
        standarizedProperties.fromChain || sourceChain?.chainId;
      const toChainId = standarizedProperties.toChain || targetChain?.chainId;
      const tokenChainId = standarizedProperties.tokenChain;

      const fromChain = chainIdToChain(fromChainId);

      // Skip if we don't have the source chain
      if (!fromChain) {
        return;
      }

      const tokenChain = tokenChainId
        ? chainIdToChain(tokenChainId)
        : chainIdToChain(toChainId);

      // Skip if we don't have the token chain
      if (!tokenChain) {
        return;
      }

      let token: Token | undefined;
      try {
        token = await getOrFetchToken(
          Wormhole.tokenId(tokenChain, standarizedProperties.tokenAddress),
        );
      } catch (e) {
        // This is ok
      }

      if (!token) {
        // IMPORTANT:
        // If we don't have the token config from the token address,
        // we can check if we can use the symbol to get it.
        // So far this case is only for SUI and APT
        const foundBySymbol =
          data?.symbol && config.tokens.findBySymbol(tokenChain, data.symbol);
        if (foundBySymbol) {
          token = foundBySymbol;
        }
      }

      if (!token) {
        console.warn("Can't find token", tx);
      }

      const toChain = chainIdToChain(toChainId);

      let sentAmountDisplay: string | undefined = undefined;
      let receiveAmountDisplay: string | undefined = undefined;
      let usdAmount: number | undefined = undefined;

      if (data && data.tokenAmount) {
        sentAmountDisplay = data.tokenAmount;
      } else if (standarizedProperties.amount) {
        sentAmountDisplay = sdkAmount.display(
          {
            amount: standarizedProperties.amount,
            decimals: standarizedProperties.normalizedDecimals ?? DECIMALS,
          },
          0,
        );
      }

      if (standarizedProperties.amount && standarizedProperties.fee) {
        const receiveAmountValue =
          BigInt(standarizedProperties.amount) -
          BigInt(standarizedProperties.fee);
        // It's unlikely, but in case the above subtraction returns a non-positive number,
        // we should not show that at all.
        if (receiveAmountValue > 0) {
          receiveAmountDisplay = sdkAmount.display(
            {
              amount: receiveAmountValue.toString(),
              decimals: DECIMALS,
            },
            0,
          );
        }
      }

      if (data && data.usdAmount) {
        usdAmount = Number(data.usdAmount);
      }

      const txHash = sourceChain.transaction?.txHash;

      // Transaction is in-progress when the below are both true:
      //   1- Source chain has confirmed
      //   2- Target has either not received, or received but not completed
      const inProgress =
        sourceChain?.status?.toLowerCase() === 'confirmed' &&
        targetChain?.status?.toLowerCase() !== 'completed';

      const txData: Transaction = {
        txHash,
        sender: standarizedProperties.fromAddress || sourceChain.from,
        recipient: standarizedProperties.toAddress,
        amount: sentAmountDisplay,
        amountUsd: usdAmount,
        receiveAmount: receiveAmountDisplay,
        fromChain,
        fromToken: token,
        toChain,
        toToken: token,
        senderTimestamp: sourceChain?.timestamp,
        receiverTimestamp: targetChain?.timestamp,
        explorerLink: `${WORMSCAN}tx/${txHash}${
          config.isMainnet ? '' : '?network=TESTNET'
        }`,
        inProgress,
      };

      return txData;
    },
    [getOrFetchToken],
  );

  // Parser for Portal Token Bridge transactions (appId === PORTAL_TOKEN_BRIDGE)
  // IMPORTANT: This is where we can add any customizations specific to Token Bridge data
  // that we have retrieved from WHScan API
  const parseTokenBridgeTx = useCallback(
    (tx: WormholeScanTransaction) => {
      return parseSingleTx(tx);
    },
    [parseSingleTx],
  );

  // Parser for NTT transactions (appId === NATIVE_TOKEN_TRANSFER)
  // IMPORTANT: This is where we can add any customizations specific to NTT data
  // that we have retrieved from WHScan API
  const parseGenericRelayer = useCallback(
    (tx: WormholeScanTransaction) => {
      return parseSingleTx(tx);
    },
    [parseSingleTx],
  );

  // Parser for NTT transactions (appId === NATIVE_TOKEN_TRANSFER)
  // IMPORTANT: This is where we can add any customizations specific to NTT data
  // that we have retrieved from WHScan API
  const parseNTTTx = useCallback(
    (tx: WormholeScanTransaction) => {
      return parseSingleTx(tx);
    },
    [parseSingleTx],
  );

  // Parser for CCTP transactions (appId === CCTP_WORMHOLE_INTEGRATION)
  // IMPORTANT: This is where we can add any customizations specific to CCTP data
  // that we have retrieved from WHScan API
  const parseCCTPTx = useCallback(
    (tx: WormholeScanTransaction) => {
      return parseSingleTx(tx);
    },
    [parseSingleTx],
  );

  // Parser for Portico transactions (appId === ETH_BRIDGE or USDT_BRIDGE)
  // IMPORTANT: This is where we can add any customizations specific to Portico data
  // that we have retrieved from WHScan API
  const parsePorticoTx = useCallback(
    async (tx: WormholeScanTransaction) => {
      const txData = await parseSingleTx(tx);
      if (!txData) return;

      const payload = tx.content.payload
        .parsedPayload as unknown as WormholeScanPorticoParsedPayload;

      const {
        finalTokenAddress,
        flagSet,
        minAmountFinish,
        recipientAddress,
        relayerFee,
      } = payload;

      const nativeToken = config.tokens.get(
        chainIdToChain(tx.content.standarizedProperties.tokenChain) as Chain,
        tx.content.standarizedProperties.tokenAddress,
      );
      if (!nativeToken) return;

      const startToken = flagSet.flags?.shouldWrapNative
        ? getGasToken(txData.fromChain)
        : nativeToken;

      const finalToken = config.tokens.get(
        Wormhole.tokenId(
          txData.toChain,
          toNative(txData.toChain, finalTokenAddress).toString(),
        ),
      );

      if (!finalToken) return;

      const receiveAmount = BigInt(minAmountFinish) - BigInt(relayerFee);

      // Override with Portico specific data
      txData.fromToken = startToken;
      txData.toToken = flagSet.flags.shouldUnwrapNative
        ? getGasToken(txData.toChain)
        : finalToken;
      txData.receiveAmount =
        receiveAmount > 0
          ? toFixedDecimals(
              sdkAmount.display(
                sdkAmount.fromBaseUnits(receiveAmount, finalToken.decimals),
                0,
              ),
              DECIMALS,
            )
          : '';
      txData.recipient = toNative(txData.toChain, recipientAddress).toString();

      return txData;
    },
    [parseSingleTx],
  );

  // Parser for WLL or FAST_TRANSFERS transactions (appId === WORMHOLE_LIQUIDITY_LAYER, FAST_TRANSFERS)
  // IMPORTANT: This is where we can add any customizations specific to WLL data
  // that we have retrieved from WHScan API
  const parseLLTx = useCallback(
    (tx: WormholeScanTransaction) => {
      return parseSingleTx(tx);
    },
    [parseSingleTx],
  );

  const PARSERS = useMemo(
    () => ({
      PORTAL_TOKEN_BRIDGE: parseTokenBridgeTx,
      GENERIC_RELAYER: parseGenericRelayer,
      NATIVE_TOKEN_TRANSFER: parseNTTTx,
      CCTP_WORMHOLE_INTEGRATION: parseCCTPTx,
      ETH_BRIDGE: parsePorticoTx,
      USDT_BRIDGE: parsePorticoTx,
      FAST_TRANSFERS: parseLLTx,
      WORMHOLE_LIQUIDITY_LAYER: parseLLTx,
    }),
    [
      parseCCTPTx,
      parseNTTTx,
      parsePorticoTx,
      parseTokenBridgeTx,
      parseLLTx,
      parseGenericRelayer,
    ],
  );

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const parseTransactions = useCallback(
    async (allTxs: Array<WormholeScanTransaction>) => {
      return (
        await Promise.all(
          allTxs.map(async (tx) => {
            // Locate the appIds
            const appIds: Array<string> =
              tx.content?.standarizedProperties?.appIds || [];

            // TODO: SDKV2
            // Some integrations may compose with multiple protocols and have multiple appIds
            // Choose a more specific parser if available
            if (
              appIds.includes('ETH_BRIDGE') ||
              appIds.includes('USDT_BRIDGE')
            ) {
              return parsePorticoTx(tx);
            }

            for (const appId of appIds) {
              // Retrieve the parser for an appId
              const parser = PARSERS[appId];

              // If no parsers specified for the given appIds, we'll skip this transaction
              if (parser) {
                return parser(tx);
              }
            }
          }),
        )
      ).filter((tx) => !!tx); // Filter out unsupported transactions
    },
    [PARSERS, parsePorticoTx],
  );

  useEffect(() => {
    let cancelled = false;

    const headers = new Headers({
      accept: 'application/json',
    });

    const fetchTransactions = async () => {
      setIsFetching(true);

      try {
        const res = await fetch(
          `${config.wormholeApi}api/v1/operations?address=${address}&page=${page}&pageSize=${pageSize}`,
          { headers },
        );

        // If the fetch was unsuccessful, return an empty set
        if (res.status !== 200) {
          setTransactions([]);
          setHasMore(false);
          setIsFetching(false);
        } else {
          const resPayload = await res.json();

          if (!cancelled) {
            const resData = resPayload?.operations;
            if (resData) {
              const parsedTxs = await parseTransactions(resData);

              setTransactions((txs) => {
                if (txs && txs.length > 0) {
                  // We need to keep track of existing tx hashes to prevent duplicates in the final list
                  const existingTxs = new Set<string>();
                  txs.forEach((tx: Transaction) => {
                    if (tx?.txHash) {
                      existingTxs.add(tx.txHash);
                    }
                  });

                  // Add the new set transactions while filtering out duplicates
                  return txs.concat(
                    parsedTxs.filter(
                      (tx: Transaction) => !existingTxs.has(tx.txHash),
                    ),
                  );
                }
                return parsedTxs;
              });
            }

            if (resData?.length < pageSize) {
              setHasMore(false);
            }
          }
        }
      } catch (error) {
        if (!cancelled) {
          setHasMore(false);
          setError(
            `Error fetching transaction history from WormholeScan: ${error}`,
          );
        }
      } finally {
        setIsFetching(false);
      }
    };

    fetchTransactions();

    return () => {
      cancelled = true;
    };
  }, [address, page, pageSize, parseTransactions]);

  return {
    transactions,
    error,
    isFetching,
    hasMore,
  };
};

export default useTransactionHistoryWHScan;
