import logo from './logo.svg';
import './App.css';
import { Web3Modal } from '@web3modal/react'
import { Web3Button, useAccount } from '@web3modal/react';


const config = {
  projectId: 'b950e421001d469595984c3d35d06e97',
  theme: 'dark',
  accentColor: 'default',
  ethereum: {
    appName: 'web3Modal'
  }
}

export default function App() {
  const { account } = useAccount()
  
  return (
      <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>

      {account.isConnected ? <h1>{account.address}</h1> : null}
      <Web3Button />
      <Web3Modal config={config} />
      </header>
    </div>
  )
}
