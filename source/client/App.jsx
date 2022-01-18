import React from "react";

import { BrowserRouter, Routes, Route } from 'react-router-dom';

import * as Hyperverse from "@decentology/hyperverse";
import * as HyperverseFlow from '@decentology/hyperverse-flow';
import * as Tribes from '@decentology/hyperverse-flow-tribes';

import * as Pages from './pages';

const hyperversePromise = Hyperverse.initialize({
  blockchain: HyperverseFlow,
  network: Hyperverse.networks.TestNet,
  modules: [
    { bundle: Tribes, tenantID: '0x1960ff14acc51991' }
  ]
});

function App() {
  const flow = HyperverseFlow.useFlow();

  if (flow.isInitialized) {
    return (
      <Routes>
        <Route path="/" element={<Pages.Tribes />} />
        <Route path="/all-tribes" element={<Pages.AllTribes />} />
        <Route path="/my-tribe" element={<Pages.MyTribe />} />
      </Routes>
    );
  } else {
    return (
      <div>Not Logeed In.</div>
    );
  }
}

function WrappedApp(props) {
  return (
    <div>
      <BrowserRouter>
        <Hyperverse.Provider hyperverse={hyperversePromise}>
          <App />
        </Hyperverse.Provider>
      </BrowserRouter>
    </div>
  );
}

export default WrappedApp;
