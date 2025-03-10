import React, { useMemo } from 'react';
import { useTheme } from '@mui/material';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import { makeStyles } from 'tss-react/mui';

import config from 'config';
import AssetBadge from 'components/AssetBadge';
import {
  calculateUSDPrice,
  getExplorerUrl,
  getUSDFormat,
  millisToRelativeTime,
  trimTxHash,
} from 'utils';

import type { Transaction } from 'config/types';
import { useTokens } from 'contexts/TokensContext';
import ExplorerLink from 'components/ExplorerLink';

const useStyles = makeStyles()((theme: any) => ({
  container: {
    width: '100%',
    maxWidth: '420px',
  },
  card: {
    width: '100%',
    borderRadius: '8px',
    border: `1px solid ${theme.palette.input.border}`,
  },
  cardHeader: {
    paddingBottom: 0,
  },
}));

type Props = {
  data: Transaction;
};

const TxHistoryItem = (props: Props) => {
  const { classes } = useStyles();
  const theme = useTheme();

  const {
    txHash,
    amount,
    amountUsd,
    fromChain,
    fromToken,
    toChain,
    toToken,
    receiveAmount,
    senderTimestamp,
    explorerLink,
  } = props.data;

  // Separator with a unicode dot in the middle
  const separator = useMemo(
    () => (
      <Typography component="span" padding="0px 8px">{`\u00B7`}</Typography>
    ),
    [],
  );
  const { getTokenPrice, lastTokenPriceUpdate } = useTokens();

  // Render details for the sent amount
  const sentAmount = useMemo(() => {
    const sourceChainConfig = config.chains[fromChain]!;

    return (
      <Stack alignItems="center" direction="row" justifyContent="flex-start">
        <AssetBadge chainConfig={sourceChainConfig} token={fromToken} />
        <Stack direction="column" marginLeft="12px">
          <Typography fontSize={16}>
            {amount} {fromToken?.symbol}
          </Typography>
          <Typography color={theme.palette.text.secondary} fontSize={14}>
            {amountUsd ? (
              <>
                {getUSDFormat(amountUsd)}
                {separator}
              </>
            ) : null}
            {sourceChainConfig?.displayName}
          </Typography>
        </Stack>
      </Stack>
    );
  }, [
    amount,
    amountUsd,
    fromChain,
    separator,
    theme.palette.text.secondary,
    fromToken,
  ]);

  // Render details for the received amount
  const receivedAmount = useMemo(() => {
    const destChainConfig = config.chains[toChain]!;
    const destTokenConfig = toToken;

    const receiveAmountPrice = receiveAmount
      ? calculateUSDPrice(
          getTokenPrice,
          parseFloat(receiveAmount),
          destTokenConfig,
        )
      : 0;

    const receiveAmountDisplay = receiveAmountPrice ? (
      <>
        {receiveAmountPrice}
        {separator}
      </>
    ) : null;

    return (
      <Stack alignItems="center" direction="row" justifyContent="flex-start">
        <AssetBadge chainConfig={destChainConfig} token={destTokenConfig} />
        <Stack direction="column" marginLeft="12px">
          <Typography fontSize={16}>
            {receiveAmount} {destTokenConfig?.symbol}
          </Typography>
          <Typography color={theme.palette.text.secondary} fontSize={14}>
            {receiveAmountDisplay}
            {destChainConfig?.displayName}
          </Typography>
        </Stack>
      </Stack>
    );
    // ESLint complains that lastTokenPriceUpdate is unused/unnecessary here,
    // but we want to recompute the price after we update conversion rates.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    lastTokenPriceUpdate,
    toChain,
    toToken,
    receiveAmount,
    getTokenPrice,
    separator,
    theme.palette.text.secondary,
  ]);

  // Vertical line that connects sender and receiver token icons
  const verticalConnector = useMemo(
    () => (
      <Stack
        height="24px"
        borderLeft="1px solid #8B919D"
        marginLeft="16px"
      ></Stack>
    ),
    [],
  );

  const transactionDateTime = useMemo(() => {
    if (!senderTimestamp) {
      return 'Unknown time';
    }

    const senderDate = new Date(senderTimestamp);

    // If it's been less than a day, show relative time
    const timePassed = Date.now() - senderDate.getTime();
    if (timePassed < 1000 * 60 * 60 * 24) {
      return millisToRelativeTime(timePassed);
    }

    const dateTimeFormat = new Intl.DateTimeFormat('en-US', {
      dateStyle: 'short',
      timeStyle: 'short',
    });

    return `${dateTimeFormat.format(senderDate)}`;
  }, [senderTimestamp]);

  const chainExplorerLink = useMemo(() => {
    return (
      <ExplorerLink
        url={getExplorerUrl(fromChain, txHash, 'tx')}
        text={trimTxHash(txHash, 4, 4)}
      />
    );
  }, [fromChain, txHash]);

  return (
    <div className={classes.container}>
      <Card className={classes.card}>
        <CardActionArea
          disableTouchRipple
          onClick={() => {
            window.open(explorerLink, '_blank');
          }}
        >
          <CardHeader
            className={classes.cardHeader}
            title={
              <Typography
                justifyContent="space-between"
                color={theme.palette.text.secondary}
                display="flex"
              >
                <span>Transaction #{chainExplorerLink}</span>
                <span>{transactionDateTime}</span>
              </Typography>
            }
          />
          <CardContent>
            {sentAmount}
            {verticalConnector}
            {receivedAmount}
          </CardContent>
        </CardActionArea>
      </Card>
    </div>
  );
};

export default TxHistoryItem;
