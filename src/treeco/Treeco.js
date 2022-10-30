
import WalletConnectModal from './walletConnect/walletConnectModal';
import {useAccount } from '@web3modal/react';
import QRCode from "react-qr-code";

import * as React from "react";
import { ethers } from 'ethers';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import gmTree from '../artifacts/contracts/gmTree.sol/gmTree.json';

const GMTREE_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3";



export class Treeco extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      greeting: "",
      address:"0",
      connection:props.connection.connection,
    }
  }

  async componentDidMount() {
    if (this.state.connection)
    {
      this.makeConnection()
    }
    const _address = await window.ethereum.request({ method: 'eth_requestAccounts' });
    this.setState({
      address: _address[0]
    })
  }

  async makeConnection() {
    if (typeof window.ethereum !== "undefined") {
      //ethereum is usable, get reference to the contract
      await this.requestAccount();
      const provider = new ethers.providers.Web3Provider(window.ethereum);

      //signer needed for transaction that changes state
      const signer = provider.getSigner();
      const contract = new ethers.Contract(GMTREE_ADDRESS, gmTree.abi, signer);

      //perform transaction
      const transaction = await contract.makeConnection(this.state.connection);
      await transaction.wait();
    }
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
        <QRCode value={this.state.address} size={200} />
        <Typography variant='body'>❤︎ Scan this QR code to connect with me and build your custom NFT gm tree ❤︎ </Typography>
      </Stack>
    )
  }
}

