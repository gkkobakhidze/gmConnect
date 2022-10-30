
import WalletConnectModal from './walletConnect/walletConnectModal';
import {useAccount } from '@web3modal/react';
import QRCode from "react-qr-code";

import * as React from "react";
import { ethers } from 'ethers';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import gmTree from '../artifacts/contracts/gmTree.sol/gmTree.json';

const GMTREE_ADDRESS = "0x0f25D96D2d4444CF1feF83FC40042E1Ad975B64d";



export class Treeco extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      address:"0",
    }
  }

  async componentDidMount() {
    const _address = await window.ethereum.request({ method: 'eth_requestAccounts' });
    this.setState({
      address: _address[0]
    })
  }

  

  async requestAccount() {
    await window.ethereum.request({ method: 'eth_requestAccounts' });
  }

  render() {
    return (
      <Stack
        justifyContent="center"
        alignItems="center"
        spacing={2}
      >
        <Typography variant='h1'>gm</Typography>
        <QRCode value={"https://sparkling-basbousa-57fd5a.netlify.app/bd/"+(this.state.address)} size={200} />
        <Typography variant='body'>❤︎ Scan this QR code to connect with me and build your custom NFT gm tree ❤︎ </Typography>
      </Stack>
    )
  }
}

