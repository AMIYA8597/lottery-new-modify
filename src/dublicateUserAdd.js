// sanchita s edit 

// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import Web3 from "web3";
// import { contractAddress, contractAbi } from "./constant.js";
// const ethers = require("ethers");



//  function UserAdd() {
//   const [user, setUser] = useState(null);
//   const [web3, setWeb3] = useState(null);
//   const [connected, setConnected] = useState(false);
//   const [amountDed, setAmountDed] = useState(false);
//   const [account, setAccount] = useState(null);
//   const [provider, setProvider] = useState(null);
//   const [contractInstance, setContractInstance] = useState(null);
//   // const  [ userdata , setUserData] = useState();

//   const connectWithMetamask = async () => {
//     try {
//       if (window.ethereum) {
//         const web3Ins = new Web3(window.ethereum);
//         setWeb3(web3Ins);

//         const accounts = await window.ethereum.request({
//           method: "eth_requestAccounts",
//         });

//         const userObject = {
//           address: accounts[0],
//         };

//         setUser(userObject);
//         setConnected(true);
//       } else {
//         console.error("Metamask not detected");
//       }
//     } catch (error) {
//       console.error("Error connecting:", error);
//     }
//   };

//   const participate = async () => {
//     const provider = new ethers.BrowserProvider(window.ethereum);
//     const signer = provider.getSigner();
//     const contractIns = new ethers.Contract(contractAddress, contractAbi, signer);
//     setContractInstance(contractIns);
//   };

//   useEffect(() => {
//     participate();
   
//   }, []);

//   const enterLottery = async () => {
   
//     // setUserData(userAddressData)
//     try {
//       const userAddressData = localStorage.getItem("userAddress");
//       if (window.ethereum && userAddressData == null) {
//         await window.ethereum.request({ method: "eth_requestAccounts" });
//         const sendingAmount = ethers.parseEther("0.0001");
//         const transactionParameters = {
//           to: contractInstance.target,
//           from: window.ethereum.selectedAddress,
//           value: sendingAmount.toString(),
//         };

//         const txn = await window.ethereum.request({
//           method: "eth_sendTransaction",
//           params: [transactionParameters],
//         });

//         setConnected(true);
//         setAmountDed(true);

//         // Store user address in local storage
//         localStorage.setItem("userAddress", window.ethereum.selectedAddress);
//       } else {
//         console.error("MetaMask not detected. Please install MetaMask extension.");
//       }
//     } catch (error) {
//     alert("Something went wrong !");
//           console.error("Error during transaction:", error);
//       // Handle errors as needed
//     }
//   };

//   const disconnectFromMetamask = () => {
//     setWeb3(null);
//     setUser(null);
//     setConnected(false);
//   };

//   useEffect(() => {
//     // Check if there's a stored user address in local storage and set it in state
//     const storedUserAddress = localStorage.getItem("userAddress");
//     if (storedUserAddress) {
//       setUser({ address: storedUserAddress });
//       setConnected(true);
//     }

//     connectWithMetamask();
//   }, []);

//   return (
//     <div className="user">
//       <p>Welcome {connected && user ? user.address : "User"}</p>
//       {!connected && (
//         <div>
//           <p>Connect with your Metamask button</p>
//           <button onClick={connectWithMetamask}>Connect</button>
//         </div>
//       )}

//       {connected && (
//         <div>
//           <p>Now please enter the amount through Metamask for lottery participation</p>
//           <button className="button" onClick={enterLottery}>
//             Enter Amount
//           </button>

//           {amountDed && connected && (
//             <>
//               <p>Now go to the winner page to see if you are the winner or not</p>
//               <Link to="/winner">
//                 <button className="button">Contest Result</button>
//               </Link>
//             </>
//           )}

//           <p>Disconnect from Metamask</p>
//           <button onClick={disconnectFromMetamask}>Disconnect</button>
//         </div>
//       )}
//     </div>
//   );
// }

// export default UserAdd;