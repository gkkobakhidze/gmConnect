import './App.css';

import * as React from "react";
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

import { Treeco } from './contractInteractions/Treeco';




export class App extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
        greeting: "",
      }
  }

  buttonClick = () => {
    console.log("yes")
  }



  render() {
    return (
      <Stack>

        <Button onClick={() => this.buttonClick()}>
          Click me
        </Button>
        <Treeco/>
      </Stack>
    )
  }
}







