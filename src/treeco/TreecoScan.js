import { useParams } from "react-router";

import React from "react";
// material
import { Container } from '@material-ui/core';
// components
import { TreecoQR } from "./TreecoQR";


// ----------------------------------------------------------------------


export default function TreecoScan() {
  let connection = useParams();  
  return (
    <Container maxWidth="xl">
      <TreecoQR connection = {connection}/>
    </Container>
  );
}
