import { useParams } from "react-router";

import React from "react";
// material
import { Container } from '@material-ui/core';
// components
import { Treeco } from "./Treeco";


// ----------------------------------------------------------------------


export default function TreecoScan() {
  let connection = useParams();  
  return (
    <Container maxWidth="xl">
      <Treeco connection = {connection}/>
    </Container>
  );
}
