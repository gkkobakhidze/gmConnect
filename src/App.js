import './App.css';
import { Navigate, Route, Routes } from 'react-router-dom';
import TreecoLayout from './treeco/TreecoLayout';

import * as React from "react";

import { Journey } from './treeco/Journey';
import TreecoScan from './treeco/TreecoScan';
import TreecoScanMe from './treeco/TreecoScanMe';



export default function App() {
  return (
    <Routes>

      <Route path="" element= {<TreecoLayout/> } >
        <Route path="" element ={<Navigate to="/gm" replace/>} />
        <Route path="/gm" element= {<TreecoScanMe/> } />
        <Route path="/bd" element= {<TreecoScan/> } />
        <Route path="/bd/:connection" element= {<TreecoScan/> } />
        <Route path="/journey" element= {<Journey/> } />
      </Route>
    </Routes>
  )
}







