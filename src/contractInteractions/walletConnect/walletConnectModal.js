import {Web3Modal, Web3Button, useAccount } from '@web3modal/react';

import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';


const config = {
  projectId: 'b950e421001d469595984c3d35d06e97',
  theme: 'dark',
  accentColor: 'default',
  ethereum: {
    appName: 'web3Modal'
  }
}

export default function WalletConnectModal() {
  const { account } = useAccount()
  
  return (
    <Stack 
    justifyContent="center"
    alignItems="center"
    spacing={2}>
      {account.isConnected ? <Typography >{account.address}</Typography> : null}
      <Web3Button />
      <Web3Modal config={config} />
    </Stack>
  )
}