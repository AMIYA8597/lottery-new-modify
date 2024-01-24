// import "./styles.css"; // styling the component using CSS
import { useState } from "react"; // storing data in the state
import { ethers } from "ethers"; // interacting with wallet

function OtherOne() {
  const [publicKey, setPublickey] = useState();
  const [network, setNetwork] = useState();
  const [chainId, setChainId] = useState();
  const [msg, setMsg] = useState();

  const connectButton = async () => {
    const { ethereum } = window;
    if (ethereum.isMetaMask) {
     const provider = new ethers.BrowserProvider(window.ethereum)
      // const provider = new ethers.providers.Web3Provider(ethereum);
      const accounts = await provider.send("eth_requestAccounts", []);

      const { name, chainId } = await provider.getNetwork();

      setNetwork(name);
      setChainId(chainId);
      setPublickey(accounts[0]);
    } else {
      setMsg("Install MetaMask");
    }
  };

  // const swithcNetwork = async (chainId) => {
  //   try {
  //     await window.ethereum.request({
  //       method: "wallet_addEthereumChain",
  //       params: [avlNetwork[`${chainId}`]]
  //     });
  //     setNetwork(avlNetwork[`${chainId}`].chainName);
  //     setChainId(chainId);
  //   } catch (error) {
  //     setMsg(error);
  //   }
  // };

  const avlNetwork = {
    11155111: {
      chainId: `0x${Number(11155111).toString(16)}`,
      rpcUrls: ["https://sepolia.infura.io/v3/"],
      chainName: "Sepolia test network",
      nativeCurrency: {
        name: "SEPOLIA",
        symbol: "SEPOLIA",
        decimals: 18,
      },
      blockExplorerUrls: ["https://sepolia.etherscan.io/"],
    },
  };

  return (
    <div className="App">
      <h1>Connect MetaMask</h1>
      <button onClick={connectButton}>Connect Wallet</button>
      <br />

      {/* <button className="btn" onClick={() => swithcNetwork(137)}>
            Connect Polygon
          </button>
          <br />
          <button className="btn" onClick={() => swithcNetwork(43114)}>
            Connect Avalanche
          </button> */}

      <p>Public Key: {publicKey}</p>
      <p>Network: {network}</p>
      <p>Chain ID : {chainId}</p>
      {msg && <p>{msg}</p>}
    </div>
  );
}

export default OtherOne;
