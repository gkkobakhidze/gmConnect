
import WalletConnectModal from './walletConnect/walletConnectModal';
import * as React from "react";
import { ethers } from 'ethers';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Greeter from '../artifacts/contracts/Greeter.sol/Greeter.json';

const GREETER_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3";



export class Treeco extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      greeting: "",
    }
  }

  async fetchGreeting() {
    if (typeof window.ethereum !== "undefined") {
      //ethereum is usable get reference to the contract
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract(GREETER_ADDRESS, Greeter.abi, provider);
      //try to get the greeting in the contract
      try {
        const data = await contract.greet();
        this.setState({ greeting: data });
        console.log("Data: ", data);
      } catch (e) {
        console.log("Err: ", e)
      }
    }
  }

  async setGreeting(newGreeting) {
    if (newGreeting && typeof window.ethereum !== "undefined") {
      //ethereum is usable, get reference to the contract
      await this.requestAccount();
      const provider = new ethers.providers.Web3Provider(window.ethereum);

      //signer needed for transaction that changes state
      const signer = provider.getSigner();
      const contract = new ethers.Contract(GREETER_ADDRESS, Greeter.abi, signer);

      //perform transaction
      const transaction = await contract.setGreeting(newGreeting);
      await transaction.wait();
      this.fetchGreeting();
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
        <Typography variant='h1'>Greeting</Typography>
        <Typography variant='h2'>Current "Greet": {this.state.greeting} </Typography>
        {<Button onClick={() => this.fetchGreeting()}>
          Get Greeting
        </Button>}
        <input id={"new-greeting"} placeholder={"New Greeting"} />
        <button onClick={() => {
          const newGreeting = document.getElementById("new-greeting").value;
          this.setGreeting(newGreeting);
        }}>Update Greeting</button>
        <WalletConnectModal />
      </Stack>
    )
  }
}







