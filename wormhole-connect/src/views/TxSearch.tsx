import React, { useCallback, useContext, useEffect, useState } from 'react';
import { makeStyles } from 'tss-react/mui';
import { useDispatch } from 'react-redux';
import { Select, MenuItem, CircularProgress, useTheme } from '@mui/material';

import config, { getWormholeContextV2 } from 'config';
import { isValidTxId } from 'utils';
import {
  setRoute as setRedeemRoute,
  setIsResumeTx,
  setTxDetails,
} from 'store/redeem';
import { setRoute as setAppRoute } from 'store/router';
import PageHeader from 'components/PageHeader';
import Search from 'components/Search';
import Button from 'components/Button';
import Spacer from 'components/Spacer';
import AlertBanner from 'components/AlertBanner';
import { setToChain } from 'store/transferInput';
import FooterNavBar from 'components/FooterNavBar';
import { useExternalSearch } from 'hooks/useExternalSearch';
import { RouteContext } from 'contexts/RouteContext';

import { parseReceipt } from 'utils/sdkv2';
import {
  TransferState,
  AttestedTransferReceipt,
  Chain,
} from '@wormhole-foundation/sdk';

const useStyles = makeStyles()((theme) => ({
  container: {
    maxWidth: '650px',
  },
  chain: {
    width: '175px',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
  },
  inputs: {
    display: 'flex',
    flexDirection: 'row',
    gap: '16px',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
    },
  },
  search: {
    flexGrow: 1,
  },
  footerNavBar: {
    width: '100%',
    maxWidth: '700px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: '20px',
  },
}));

const EMPTY = '';

function TxSearch() {
  const { classes } = useStyles();
  const dispatch = useDispatch();
  const [state, setState] = useState({
    chain: EMPTY,
    tx: EMPTY,
    autoSearch: false,
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const theme = useTheme();

  const routeContext = useContext(RouteContext);

  function setChain(e: any) {
    setState((prevState) => ({ ...prevState, chain: e.target.value }));
  }

  function setTx(e: any) {
    setState((prevState) => ({ ...prevState, tx: e.target.value }));
  }

  async function search() {
    if (!state.tx || !state.chain) {
      return setError('Enter the source chain and transaction ID');
    }
    if (!isValidTxId(state.chain as Chain, state.tx)) {
      return setError('Invalid transaction ID');
    }

    setLoading(true);

    const resumeResult = await config.routes.resumeFromTx({
      chain: state.chain as Chain,
      txid: state.tx,
    });

    if (resumeResult === null) {
      setError(
        'Transfer not found, check that you have the correct chain and transaction ID',
      );
      setLoading(false);
      return;
    }

    const { route } = resumeResult;
    let { receipt } = resumeResult;
    const wh = await getWormholeContextV2();
    const sdkRoute = new (config.routes.get(route).rc)(wh);
    setError('');

    // Track until we have an attestation
    if (receipt.state < TransferState.Attested) {
      for await (receipt of sdkRoute.track(receipt)) {
        if (receipt.state >= TransferState.Attested) {
          break;
        }
      }
    }

    const txDetails = await parseReceipt(
      route,
      receipt as AttestedTransferReceipt<any>,
    );

    if (txDetails) {
      dispatch(setTxDetails(txDetails));

      dispatch(setIsResumeTx(true)); // To avoid send transfer.success event in Resume Transaction case
      dispatch(setRedeemRoute(route));
      dispatch(setAppRoute('redeem'));
      dispatch(setToChain(receipt.to));

      routeContext.setRoute(sdkRoute);
      routeContext.setReceipt(receipt);
    } else {
      console.error('Failed to parse receipt', receipt);
    }

    setLoading(false);
  }

  const { hasExternalSearch, txHash, chainName, clear } = useExternalSearch();

  // set the txHash and chainName from configs and reset it to undefined
  useEffect(() => {
    const autoSearch = !!(hasExternalSearch && txHash && chainName);
    if (autoSearch) {
      setState({ chain: chainName, tx: txHash, autoSearch });
      clear();
    }
  }, [hasExternalSearch, txHash, chainName, clear]);

  const doSearch = useCallback(() => search(), [state]);

  // search on load if txHash and chainName are set
  useEffect(() => {
    const { chain, tx, autoSearch } = state;
    if (autoSearch && chain !== EMPTY && tx !== EMPTY && !loading) {
      setState((prev) => ({ ...prev, autoSearch: false }));
      doSearch();
    }
  }, [doSearch, state, loading]);

  return (
    <div className={classes.container}>
      <PageHeader
        title="Resume transaction"
        description="Bridging can require a manual redemption process on the designation chain. If you did not complete the redemption during your initial transaction, you may do so here."
        back
      />

      <div className={classes.inputs}>
        <div className={classes.chain}>
          <Select
            sx={{ width: '100%', height: '100%', minHeight: '64.5px' }}
            value={state.chain}
            displayEmpty
            placeholder="Select network"
            onChange={(e) => setChain(e)}
          >
            <MenuItem disabled value="" key={0}>
              Select network
            </MenuItem>
            {config.chainsArr
              .filter((chain) => chain.key !== 'Wormchain')
              .map((chain, i) => {
                return (
                  <MenuItem value={chain.key} key={i + 1}>
                    {chain.displayName}
                  </MenuItem>
                );
              })}
          </Select>
        </div>
        <div className={classes.search}>
          <Search
            placeholder="Source chain transaction hash"
            onChange={setTx}
            onSearch={search}
            value={state.tx}
          />
        </div>
      </div>

      <Spacer />

      <AlertBanner show={!!error} content={error} error margin="0 0 16px 0" />

      <Button disabled={!state.chain || !state.tx} elevated onClick={search}>
        {loading ? (
          <CircularProgress
            size={24}
            sx={{
              color: theme.palette.primary.contrastText,
            }}
          />
        ) : (
          'Search'
        )}
      </Button>
      <div className={classes.footerNavBar}>
        <FooterNavBar />
      </div>
    </div>
  );
}

export default TxSearch;
