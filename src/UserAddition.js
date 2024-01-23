import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"
import Web3 from 'web3';
import constant from "./constant.js"
const ethers = require("ethers")
// import { ethers } from "ethers";

function UserAdd() {
  const [user, setUser] = useState(null);
  const [web3, setWeb3] = useState(null);
  const [connected, setConnected] = useState(false);
  const [amountDed, setAmountDed] = useState(false);
  const [account, setAccount] = useState(null);
  const [provider, setProvider] = useState(null);

const initiateWalletConnection = async () => {
    try {
        const provider = new ethers.BrowserProvider(window.ethereum)
        const accounts = await provider.send("eth_requestAccounts", []);
        const account = accounts[0];
        setProvider(provider);
        setAccount(account);
    } catch (error) {
        console.log(error);
    }
};

  const connectWithMetamask = async () => {
    try {
      if (window.ethereum) {
        const web3Ins = new Web3(window.ethereum);
        setWeb3(web3Ins);

        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });

        const userObject = {
          address: accounts[0],
        };

        setUser(userObject);
        setConnected(true);

      } else {
        console.error("Metamask not detected");
      }
    } catch (error) {
      console.error("Error connecting:", error);
    }
  };



  const enterLottery = async () => {
      setConnected(true);
      setAmountDed(true);
  }

  const disconnectFromMetamask = () => {
    setWeb3(null);
    setUser(null);
    setConnected(false);
  };

 

  useEffect(() => {
    connectWithMetamask();
    initiateWalletConnection()
  }, []);

  return (
    <div className="user">
      <p>Welcome {connected && user ? user.address : "User"}</p>
      {!connected && (
        <div>
          <p>Connect with your Metamask button</p>
          <button onClick={connectWithMetamask}>Connect</button>
        </div>
      )}
      {connected && (
        <div>
          <p>Now please enter the amount through Metamask for lottery participation</p>
          <button className="button" onClick={enterLottery}>Enter Amount</button>

          {amountDed && connected && (
              <>
               <p>Now go to the winner page to see if you are the winner or not</p>
               <Link to="/winner">
                 <button className="button">Contest Result</button>
              </Link>
             </>
          )}

          <p>Disconnect from Metamask</p>
          <button onClick={disconnectFromMetamask}>Disconnect</button>
        </div>
      )}
    </div>
  );
}

export default UserAdd;












// const contract = async () => {
//     // const provider = new ethers.providers.Web3Provider(window.ethereum);
//     // const signer = provider.getSigner();

//     await window.ethereum.enable()
//     // const provider = new ethers.providers.Web3Provider(window.ethereum);
//     const provider = ((window.ethereum != null) ? new ethers.providers.Web3Provider(window.ethereum) : ethers.providers.getDefaultProvider());

//     const signer = provider.getSigner();
//     const contractIns = new ethers.Contract(constants.contractAddress, constants.contractAbi, signer);
//     setcontractInstance(contractIns);
//     const status = await contractInstance.isComplete;
//     setStatus(status);
//     const winner = await contractInstance.getWinner;
//     if (winner === currentAccount) {
//         setIsWinner(true);
//     } else {
//         setIsWinner(false);
//     }
// }













// import React, { useState, useEffect } from "react";
// import constant from "./constant.js";
// import Web3 from 'web3';

// function UserAdd(props) {
//   const [user, setUser] = useState(null);
//   const [web3, setWeb3] = useState(null);
//   const [connected, setConnected] = useState(false);
//   const [amountDed, setAmountDed] = useState(false);

//   const connectWithMetamask = async () => {
//     try {
//       if (window.ethereum) {
//         const web3Ins = new Web3(window.ethereum);
//         setWeb3(web3Ins);

//         const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });

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

//   const amountEnter = async => {
//     console.log("start connect with metamask button");
//   }

//   const disconnectFromMetamask = () => {
//     setWeb3(null);
//     setUser(null);
//     setConnected(false);
//   };

//   const dedaction = () => {
//     setWeb3(null);
//     setUser(null);
//     setConnected(true);
//     setAmountDed(false);
//   };

// //   const notDedaction = () => {
// //     setAmountDed(false);
// //   };

//   useEffect(() => {
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
//           <button className="button">Enter Amount</button>
          
//           {/* Conditionally render based on some condition */}

//           {/* {  user && user.address && dedaction && (
//             <>
//               <p>Now go to the winner page to see if you are the winner or not</p>
//               <Link to="/winner">
//                 <button className="button">Contest Result</button>
//               </Link>
//             </>
//           )} */}
          
//           <p>Disconnect from Metamask</p>
//           <button onClick={disconnectFromMetamask}>Disconnect</button>
//         </div>
//       )}
//     </div>
//   );
// }

// export default UserAdd;



























// import React, { useState, useEffect } from "react";
// import { BrowserRouter as Router, Link, Route } from "react-router-dom";
// import Web3 from 'web3';

// function UserAdd() {
//   const [user, setUser] = useState(null);
//   const [web3, setWeb3] = useState(null);
//   const [connected, setConnected] = useState(false);

//   const connectWithMetamask = async () => {
//     try {
//       if (window.ethereum) {
//         const web3Ins = new Web3(window.ethereum);
//         setWeb3(web3Ins);

//         const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });

//         const userObject = {
//           address: accounts[0],
//         };

//         setUser(userObject);
//         // setUser();

//         // setConnected(false);
//         setConnected(true);
//       } else {
//         console.error("Metamask not detected");
//       }
//     } catch (error) {
//       console.error("Error connecting:", error);
//     }
//   };

//   const disconnectFromMetamask = () => {
//     setWeb3(null);
//     setUser(null);
//     setConnected(false);
//   };

//   useEffect(() => {
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
//           <button className="button">Enter Amount</button>
//           <p>Now go to winner page so you can see if you are the winner or not</p>
//           <Link to="/winner">
//             <button className="button">Contest Result</button>
//           </Link>
//           <p>Disconnect from Metamask</p>
//           <button onClick={disconnectFromMetamask}>Disconnect</button>
//         </div>
//       )}
//     </div>
//   );
// }

// export default UserAdd;







































// // import React, { useState, useEffect } from "react";
// // import { Web3 } from 'web3';
// // // import { ethers } from "ethers";

// // function UserAdd () {

// //     //usestate is a state variable that declare under the function
// //     const [user , setUser] = useState([]);
// //     const [connect , setConnect] = useState("")

// //     useEffect( () => {
// //         //this is a predefined hooks that handles the effect of an dependency array . 
// //         //It is called everyTime whenever any state in the dependency array is modified or update



   
// //     })
    
// //     return (
// //         <div className="user">
// //             <p className="userp">
// //                 welcome User 
// //             </p>
// //             <p>connect with your metamask button</p>
// //         <button>connect</button>
// //             <p className="userp"> 
// //                 please enter the button , so you can participate our lottery contest
// //             </p>
// //             <button className="button">
// //                 liveContest
// //             </button>
// //         </div>
// //     )
// // }

// // export default UserAdd;


