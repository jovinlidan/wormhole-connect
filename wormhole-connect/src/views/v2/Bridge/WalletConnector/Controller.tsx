import React, { useCallback, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from 'tss-react/mui';

import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';

import {
  usePopupState,
  bindTrigger,
  bindPopover,
} from 'material-ui-popup-state/hooks';

import { RootState } from 'store';
import { disconnectWallet as disconnectFromStore } from 'store/wallet';
import { TransferWallet } from 'utils/wallet';
import { copyTextToClipboard, displayWalletAddress } from 'utils';
import { joinClass } from 'utils/style';

import WalletIcons from 'icons/WalletIcons';
import config from 'config';
import ExplorerLink from './ExplorerLink';
import WalletSidebar from './Sidebar';
import { Tooltip } from '@mui/material';

const useStyles = makeStyles()((theme: any) => ({
  connectWallet: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '8px',
    cursor: 'pointer',
    paddingTop: '2px',
    opacity: 1.0,
  },
  walletAddress: {
    color: theme.palette.textSecondary,
    marginLeft: '8px',
  },
  disabled: {
    opacity: '0.6',
    cursor: 'default',
    pointerEvents: 'none',
  },
  dropdown: {
    backgroundColor: theme.palette.popover.background,
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    padding: '8px',
  },
  dropdownItem: {
    borderRadius: '8px',
    padding: '16px',
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: theme.palette.popover.secondary,
    },
  },
}));

type Props = {
  type: TransferWallet;
};

const COPY_MESSAGE_TIMOUT = 1000;

// Renders the connected state for a wallet given the type (sending | receiving)
const ConnectedWallet = (props: Props) => {
  const dispatch = useDispatch();

  const { classes } = useStyles();

  const { isTransactionInProgress } = useSelector(
    (state: RootState) => state.transferInput,
  );

  const wallet = useSelector((state: RootState) => state.wallet[props.type]);

  const [isOpen, setIsOpen] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const popupState = usePopupState({
    variant: 'popover',
    popupId: `connected-wallet-popover-${props.type}`,
  });

  const connectWallet = useCallback(() => {
    popupState?.close();
    setIsOpen(true);
  }, [popupState]);

  const copyAddress = useCallback(() => {
    copyTextToClipboard(wallet.address);
    popupState?.close();
    setIsCopied(true);
  }, [popupState, wallet.address]);

  const disconnectWallet = useCallback(() => {
    dispatch(disconnectFromStore(props.type));
    popupState?.close();
  }, [dispatch, popupState, props.type]);

  useEffect(() => {
    if (isCopied) {
      setTimeout(() => {
        setIsCopied(false);
      }, COPY_MESSAGE_TIMOUT);
    }
  }, [isCopied]);

  const popupTrigger = isTransactionInProgress ? {} : bindTrigger(popupState);

  if (!wallet?.address) {
    return <></>;
  }

  return (
    <>
      <div
        className={joinClass([
          classes.connectWallet,
          isTransactionInProgress && classes.disabled,
        ])}
        {...popupTrigger}
      >
        <WalletIcons name={wallet.name} icon={wallet.icon} size={20} />
        <Tooltip title="Copied" open={isCopied} placement="top" arrow>
          <Typography
            className={classes.walletAddress}
            fontSize={14}
            fontWeight={700}
          >
            {displayWalletAddress(wallet.type, wallet.address)}
          </Typography>
        </Tooltip>
      </div>
      <Popover
        {...bindPopover(popupState)}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <List>
          <ListItemButton onClick={copyAddress}>
            <Typography fontSize={14}>Copy address</Typography>
          </ListItemButton>
          {config.ui.explorer ? (
            <ExplorerLink
              address={wallet.address}
              href={config.ui.explorer.href}
              target={config.ui.explorer.target}
              label={config.ui.explorer.label}
            />
          ) : null}
          <ListItemButton onClick={connectWallet}>
            <Typography fontSize={14}>Change wallet</Typography>
          </ListItemButton>
          <ListItemButton onClick={disconnectWallet}>
            <Typography fontSize={14}>Disconnect</Typography>
          </ListItemButton>
        </List>
      </Popover>
      <WalletSidebar
        open={isOpen}
        type={props.type}
        onClose={() => {
          setIsOpen(false);
        }}
        showAddressInput={props.type === TransferWallet.RECEIVING}
      />
    </>
  );
};

export default ConnectedWallet;
