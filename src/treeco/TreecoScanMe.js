import { useParams } from "react-router";

import React from "react";
// material
import { Container } from '@material-ui/core';
// components
import { Treeco } from "./Treeco";


// ----------------------------------------------------------------------


export default function TreecoScanMe() {
  return (
    <Container maxWidth="xl">
      <Treeco/>
    </Container>
  );
}
