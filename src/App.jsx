import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

import { Web3 } from "web3";
import { ZKsyncPlugin } from "web3-plugin-zksync";

function App() {
  const [count, setCount] = useState(0);

  const web3 = new Web3();

  web3.registerPlugin(new ZKsyncPlugin(window.ethereum));

  async function sendOneWei() {
    const accounts = await web3.ZKsync.L2.eth.requestAccounts();

    const to = web3.eth.accounts.create();

    const tx = {
      from: accounts[0],
      to: to.address,
      value: 1,
    };

    const populated = await web3.ZKsync.L2.populateTransaction(tx);
    console.log("populated", populated);

    const txReceipt = await web3.ZKsync.L2.eth.sendTransaction(populated);

    console.log("signature", txReceipt.transactionHash);
  }

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={sendOneWei}>Send 1 wei</button>
      </div>
    </>
  );
}

export default App;
