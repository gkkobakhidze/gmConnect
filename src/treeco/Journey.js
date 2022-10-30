
import WalletConnectModal from './walletConnect/walletConnectModal';
import * as React from "react";
import { ethers } from 'ethers';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import svgTree from './svgTree';
import gmTree from '../artifacts/contracts/gmTree.sol/gmTree.json';
import  SvgXml, {Svg, Circle} from 'react-native-svg';

const GMTREE_ADDRESS = "0x6e4517eB8E2077eA984570ccA0ddF22f06973E1D";



export class Journey extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      greeting: "",
      address:"0",
      svgTree:"",
          
    }
  }
  async componentDidMount() {
    this.fetchTree()
  }
  async getTree() {
    if (typeof window.ethereum !== "undefined") {
      //ethereum is usable, get reference to the contract
      await this.requestAccount();
      const provider = new ethers.providers.Web3Provider(window.ethereum);

      //signer needed for transaction that changes state
      const signer = provider.getSigner();
      const contract = new ethers.Contract(GMTREE_ADDRESS, gmTree.abi, signer);

      //perform transaction
      const transaction = await contract.getTree();
      await transaction.wait();
      this.fetchTree();
    }
  }
  async fetchTree() {
    if (typeof window.ethereum !== "undefined") {
      const _address = await window.ethereum.request({ method: 'eth_requestAccounts' });
      //ethereum is usable get reference to the contract
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract(GMTREE_ADDRESS, gmTree.abi, provider);
      //try to get the greeting in the contract
      try {
        const tokenId = await contract.getTokenOf(_address[0]);
        const _svg = await contract.tokenURI(tokenId);
        this.setState({
          svgTree:_svg,
        })
      } catch (e) {
        console.log("Err: ", e)
      }
    }
  }

  async requestAccount() {
    await window.ethereum.request({ method: 'eth_requestAccounts' });
  }


  displaySvg = () => {
    if (this.state.svgTree){
      const dataURI = this.state.svgTree;
      const json = String(Buffer.from(dataURI.substring(29), "base64"));
      const result = JSON.parse(json);
      console.log(this.state.svgTree)
      console.log(result['image'])
      return(result['image'])
    }
  }

  render(){
    return (
      <Stack
        justifyContent="center"
        alignItems="center"
        spacing={2}
      >        
        <Button onClick={() => this.getTree()}>
          Get a Tree
        </Button>
        <Box component="span" sx={{ p: 2, border: '1px dashed grey' }}>{/* <test> */}
          <div class="example">
            <Typography variant='h1'>bom dia tree</Typography>
            <img alt="" src={this.displaySvg()} />
          </div>
        </Box>
      </Stack>
    )
  }
}