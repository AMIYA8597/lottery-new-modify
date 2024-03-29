import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Web3 from "web3";
import { contractAddress, contractAbi } from "./constant.js";
const ethers = require("ethers");

 function UserAdd() {
  const [user, setUser] = useState(null);
  const [web3, setWeb3] = useState(null);
  const [connected, setConnected] = useState(false);
  const [amountDed, setAmountDed] = useState(false);
  const [account, setAccount] = useState(null);
  const [provider, setProvider] = useState(null);
  const [contractInstance, setContractInstance] = useState(null);
  // const  [ userdata , setUserData] = useState();
  // const [subdivide , setSubdivide] = useState("");

  const connectWithMetamask = async () => {
    try {
      if (window.ethereum) {
        const web3Ins = new Web3(window.ethereum);
        setWeb3(web3Ins);

        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });

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

  const participate = async () => {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = provider.getSigner();
    const contractIns = new ethers.Contract(contractAddress, contractAbi, signer);
    setContractInstance(contractIns);
  };

  useEffect(() => {
    participate();
   
  }, []);

  const navigate = useNavigate();

  const enterLottery = async () => {
   
    // setUserData(userAddressData)
    try {
      const userAddressData = localStorage.getItem("userAddress"); 
      if (window.ethereum && userAddressData == null) {
        await window.ethereum.request({ method: "eth_requestAccounts" });
        const sendingAmount = ethers.parseEther("0.0001");
        const transactionParameters = {
          to: contractInstance.target,
          from: window.ethereum.selectedAddress,
          value: sendingAmount.toString(),
        };

        const txn = await window.ethereum.request({
          method: "eth_sendTransaction",
          params: [transactionParameters],
        });

        setConnected(true);

        setAmountDed(true);

        alert("congratulations you complete your payment !");

        navigate("/winner")

        // Store user address in local storage
        localStorage.setItem("userAddress", window.ethereum.selectedAddress);
      } else {
        console.error("MetaMask not detected. Please install MetaMask extension.");
      }
    } catch (error) {
    // alert("Something went wrong !");
    alert("You reject lottery entry Fees !");
          console.error("Error during transaction:", error);
      // Handle errors as needed
    }
  };

  const disconnectFromMetamask = () => {
    setWeb3(null);
    setUser(null);
    setConnected(false);
  };

  useEffect(() => {
 
    const storedUserAddress = localStorage.getItem("userAddress");
    if (storedUserAddress) {
      setUser({ address: storedUserAddress });
      setConnected(true);
    }

    connectWithMetamask();
  }, []);




//   function isPalindrome(s) {
//     // Convert the string to lowercase and remove non-alphanumeric characters
//     const cleanString = s.toLowerCase().replace(/[^a-z0-9]/g, '');
    
//     // Check if the clean string is equal to its reverse
//     return cleanString === cleanString.split('').reverse().join('');
// }

// // Example usage:
// const string1 = "A man, a plan, a canal, Panama!";
// console.log(isPalindrome(string1)); // Output: true

// const string2 = "race a car";
// console.log(isPalindrome(string2)); // Output: false


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
          <button className="button" onClick={enterLottery}>
            Enter Amount
          </button>

          {amountDed && connected && (
            <>
              <p>Now go to the winner page to see if you are the winner or not</p>


              {/* <button className="button">Contest Result
              <Link to="/winner">
               
              </Link>
              </button> */}
              
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






















// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import Web3 from "web3";
// import { contractAddress, contractAbi } from "./constant.js";
// const ethers = require("ethers");

// function UserAdd() {
//   const [user, setUser] = useState(null);
//   const [web3, setWeb3] = useState(null);
//   const [connected, setConnected] = useState(false);
//   const [amountDed, setAmountDed] = useState(false);
//   const [account, setAccount] = useState(null);
//   const [provider, setProvider] = useState(null);
//   const [contractInstance, setContractInstance] = useState(null);

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
//     try {
//       if (window.ethereum) {
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
//       console.error("Error during transaction:", error);
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




























// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import Web3 from "web3";
// import {contractAddress , contractAbi} from "./constant.js";
// const ethers = require("ethers")
// // import { BigNumb er } from "ethers";
// // import { ethers } from "ethers"; // interacting with wallet
// function UserAdd() {
//   const [user, setUser] = useState(null);
//   const [web3, setWeb3] = useState(null);
//   const [connected, setConnected] = useState(false);
//   const [amountDed, setAmountDed] = useState(false);
//   const [account, setAccount] = useState(null);
//   const [provider, setProvider] = useState(null);
//   const [contractInstance, setContractInstance] = useState(null);

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
//     // console.log("participate with lottery");
//     // const provider = new ethers.providers.Web3Provider(window.ethereum);
//     const provider = new ethers.BrowserProvider(window.ethereum)
//     // console.log("Create a provider using ethers.BrowserProvider with MetaMask's Ethereum provider" , provider);

//     const signer = provider.getSigner();
//     const contractIns = new ethers.Contract(contractAddress,contractAbi,signer);
//     // console.log("Create an instance of the Ethereum smart contract using its address and ABI");
//     // const contractIns = new ethers.Contract(constants.contractAddress,constants.contractAbi,provider );
//     setContractInstance(contractIns);
//   };
//   useEffect(() => {
//     participate()
//   }, [])
  

//   const enterLottery = async () => {
//     console.log("contract instance is",contractInstance);
//     console.log("entry lottery");
//     try {
//         if (window.ethereum) {
//             await window.ethereum.request({ method: 'eth_requestAccounts' });
//             const sendingAmount = ethers.parseEther('0.0001');
//             // const sendingAmount = ethers.parseWei('100000000000000');
//             console.log("sendingAmount", sendingAmount);
//             const transactionParameters = {
//                 to: contractInstance.target, 
//                 from: window.ethereum.selectedAddress, 
//                 value: sendingAmount.toString(),
//               };
//             console.log("transaction started" , transactionParameters);

//             const txn = await window.ethereum.request({
//                 method: 'eth_sendTransaction',
//                 params: [transactionParameters],
//             });
//             console.log("txn complete" , txn);
        
//             // Wait for the transaction to be mined and confirmed
//             // await contractInstance.provider.waitForTransaction(txn);

//             // Additional actions can be added here based on the success of the transaction
//             // For example, setting flags like setConnected(true) or setAmountDed(true)
//             setConnected(true);
//             setAmountDed(true)
//         } else {
//             console.error('MetaMask not detected. Please install MetaMask extension.');
//         }
//     } catch (error) {
//         console.error('Error during transaction:', error);
//         // Handle errors as needed
//     }
// };




// // async function waitForTransactionConfirmation(txnHash) {
// //   return new Promise((resolve, reject) => {
// //       const intervalId = setInterval(async () => {
// //           try {
// //               const receipt = await window.ethereum.request({
// //                   method: 'eth_getTransactionReceipt',
// //                   params: [txnHash],
// //               });

// //               if (receipt && receipt.blockNumber) {
// //                   clearInterval(intervalId);
// //                   resolve(receipt);
// //               }
// //           } catch (error) {
// //               clearInterval(intervalId);
// //               reject(error);
// //           }
// //       }, 3000); // Check every 3 seconds
// //   });
// // }


//     // const claimPrize = async () => {
//     //     const txn = await contractInstance.claimPrize();
//     //     await txn.wait();
//     // }

//      // const entryLottery = async () => {
//   //   setConnected(true);
//   //   setAmountDed(true);
//   // };

//   const disconnectFromMetamask = () => {
//     setWeb3(null);
//     setUser(null);
//     setConnected(false);
//   };



//   useEffect(() => {
//     connectWithMetamask();
//     // participate();
//     // initiateWalletConnection();
//     // contractConnect();
//     // loadBlockchainData()
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
//           <p>
//             Now please enter the amount through Metamask for lottery
//             participation
//           </p>
//           {/* <button className="button" onClick={enterLottery}> */}
//           <button className="button" onClick={enterLottery}>
//             Enter Amount
//           </button>

//           {amountDed && connected &&  (
//             <>
//               <p>
//                 Now go to the winner page to see if you are the winner or not
//               </p>
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


































// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import Web3 from "web3";
// import constants from "./constant.js";
// const ethers = require("ethers")
// // import { ethers } from "ethers"; // interacting with wallet
// function UserAdd() {
//   const [user, setUser] = useState(null);
//   const [web3, setWeb3] = useState(null);
//   const [connected, setConnected] = useState(false);
//   const [amountDed, setAmountDed] = useState(false);
//   const [account, setAccount] = useState(null);
//   const [provider, setProvider] = useState(null);
//   const [contractInstance, setContractInstance] = useState(null);

//   // const [status, setStatus] = useState(null);
//   // const [winner, setWinner] = useState(null);
//   // const [currentAccount, setCurrentAccount] = useState(null);

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

//   const participate = () => {
//     console.log("participate with lottery");
//     // const provider = new ethers.providers.Web3Provider(window.ethereum);
//     const provider = new ethers.BrowserProvider(window.ethereum);
//     console.log("provider", provider);

//     const signer = provider.getSigner();
//     const contractIns = new ethers.Contract(constants.contractAddress,constants.contractAbi,signer
//     // const contractIns = new ethers.Contract(constants.contractAddress,constants.contractAbi,provider
//     );
//     setContractInstance(contractIns);
//   };

//   const enterLottery = async () => {
//     const sendingAmount = ethers.parseEther("0.0001");
//     console.log("hiubhjb",contractInstance);
//     if (contractInstance) {
//       const txn = await contractInstance.enter({ value: sendingAmount });
//       await txn.wait();
//     }
//     // setConnected(true);
//     // setAmountDed(true);
//   };

//   // const claimPrize = async () => {
//   //     const txn = await contractInstance.claimPrize();
//   //     await txn.wait();
//   // }

//   // const entryLottery = async () => {
//   //   setConnected(true);
//   //   setAmountDed(true);
//   // };

//   const disconnectFromMetamask = () => {
//     setWeb3(null);
//     setUser(null);
//     setConnected(false);
//   };

//   useEffect(() => {
//     connectWithMetamask();
//     // enterLottery();
//     // participate();
//     // initiateWalletConnection();
//     // contractConnect();
//     // loadBlockchainData()
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

//       {connected  &&(
//         <div>
//           <p>
//             Now please enter the amount through Metamask for lottery
//             participation
//           </p>
//           {/* <button className="button" onClick={enterLottery}> */}

//           <button className="button" onClick={participate}>
//             participate
//           </button>
//           {/* <button className="button" onClick={enterLottery}>
//             Enter Amount
//           </button> */}

//           {amountDed && connected && (
//             <>
//               <p>
//                 Now go to the winner page to see if you are the winner or not
//               </p>
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










// import React, {useState, useEffect} from "react";
// import { ethers } from "ethers";
// import Web3 from 'web3';
// import constants from './constant';

// function UserAdd () {
//   const [currentAccount, setCurrentAccount] = useState("");
//   const [contractInstance, setcontractInstance] = useState('');
//   const [status, setStatus] = useState(false);
//   const [isWinner, setIsWinner] = useState('');

//   useEffect(() => {
//       const loadBlockchainData = async () => {
//           if (typeof window.ethereum !== 'undefined') {
//               const provider = ((window.ethereum != null) ? new ethers.providers.Web3Provider(window.ethereum) : ethers.providers.getDefaultProvider());

//               // const provider = new ethers.providers.Web3Provider(Web3.currentProvider);
//               // const signer = provider.getSigner();
//               try {
//                   const signer = provider.getSigner();
//                   const address = await signer.getAddress();
//                   console.log(address);
//                   setCurrentAccount(address);
//                   window.ethereum.on('accountsChanged', (accounts) => {
//                       setCurrentAccount(accounts[0]);
//                       console.log(currentAccount);
//                   })
//               } catch (err) {
//                   console.error(err);
//               }
//           } else {
//               alert('Please install Metamask to use this application')

//           }
//       };

//       const contract = async () => {
//           // const provider = new ethers.providers.Web3Provider(window.ethereum);
//           // const signer = provider.getSigner();

//           await window.ethereum.enable()
//           // const provider = new ethers.providers.Web3Provider(window.ethereum);
//           const provider = ((window.ethereum != null) ? new ethers.providers.Web3Provider(window.ethereum) : ethers.providers.getDefaultProvider());

//           const signer = provider.getSigner();
//           const contractIns = new ethers.Contract(constants.contractAddress, constants.contractAbi, signer);
//           setcontractInstance(contractIns);
//           const status = await contractInstance.isComplete;
//           setStatus(status);
//           const winner = await contractInstance.getWinner;
//           if (winner === currentAccount) {
//               setIsWinner(true);
//           } else {
//               setIsWinner(false);
//           }
//       }

//       loadBlockchainData();
//       contract();
//   }, [currentAccount]);

//   const enterLottery = async () => {
//       const amountToSend = ethers.utils.parseEther('0.0001');
//       const tx = await contractInstance.enter({value: amountToSend,});
//       await tx.wait();
//   }

//   const claimPrize = async () => {
//       const tx = await contractInstance.claimPrize();
//       await tx.wait();
//   }

//   return(
//       <div className="container">
//           <h1>Lottery Page</h1>
//           <div className="button-container">
//               {status ? ( isWinner ? (<button className="enter-button" onClick={claimPrize}> Claim Prize </button>):
//               (<p>You are not the winner</p>)) :
//               (<button className="enter-button" onClick={enterLottery}> Enter Lottery </button>)

//               }
//           </div>
//       </div>
//   )

// }

// export default UserAdd;

// import React, {useState, useEffect} from "react";
// import { ethers } from "ethers";
// import Web3 from 'web3';
// import constants from './constant';

// function Home () {
//     const [currentAccount, setCurrentAccount] = useState("");
//     const [contractInstance, setcontractInstance] = useState('');
//     const [status, setStatus] = useState(false);
//     const [isWinner, setIsWinner] = useState('');

//     useEffect(() => {
//         const loadBlockchainData = async () => {
//             if (typeof window.ethereum !== 'undefined') {
//                 const provider = ((window.ethereum != null) ? new ethers.providers.Web3Provider(window.ethereum) : ethers.providers.getDefaultProvider());

//                 // const provider = new ethers.providers.Web3Provider(Web3.currentProvider);
//                 // const signer = provider.getSigner();
//                 try {
//                     const signer = provider.getSigner();
//                     const address = await signer.getAddress();
//                     console.log(address);
//                     setCurrentAccount(address);
//                     window.ethereum.on('accountsChanged', (accounts) => {
//                         setCurrentAccount(accounts[0]);
//                         console.log(currentAccount);
//                     })
//                 } catch (err) {
//                     console.error(err);
//                 }
//             } else {
//                 alert('Please install Metamask to use this application')

//             }
//         };

//         const contract = async () => {
//             // const provider = new ethers.providers.Web3Provider(window.ethereum);
//             // const signer = provider.getSigner();

//             await window.ethereum.enable()
//             // const provider = new ethers.providers.Web3Provider(window.ethereum);
//             const provider = ((window.ethereum != null) ? new ethers.providers.Web3Provider(window.ethereum) : ethers.providers.getDefaultProvider());

//             const signer = provider.getSigner();
//             const contractIns = new ethers.Contract(constants.contractAddress, constants.contractAbi, signer);
//             setcontractInstance(contractIns);
//             const status = await contractInstance.isComplete;
//             setStatus(status);
//             const winner = await contractInstance.getWinner;
//             if (winner === currentAccount) {
//                 setIsWinner(true);
//             } else {
//                 setIsWinner(false);
//             }
//         }

//         loadBlockchainData();
//         contract();
//     }, [currentAccount]);

//     const enterLottery = async () => {
//         const amountToSend = ethers.utils.parseEther('0.0001');
//         const tx = await contractInstance.enter({value: amountToSend,});
//         await tx.wait();
//     }

//     const claimPrize = async () => {
//         const tx = await contractInstance.claimPrize();
//         await tx.wait();
//     }

//     return(
//         <div className="container">
//             <h1>Lottery Page</h1>
//             <div className="button-container">
//                 {status ? ( isWinner ? (<button className="enter-button" onClick={claimPrize}> Claim Prize </button>):
//                 (<p>You are not the winner</p>)) :
//                 (<button className="enter-button" onClick={enterLottery}> Enter Lottery </button>)

//                 }
//             </div>
//         </div>
//     )

// }

// export default Home;

// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import { ethers } from "ethers";

// function UserAdd() {
//   const [user, setUser] = useState(null);
//   const [connected, setConnected] = useState(false);
//   const [amountDed, setAmountDed] = useState(false);
//   const [account, setAccount] = useState(null);
//   const [provider, setProvider] = useState(null);

//   const initiateWalletConnection = async () => {
//     try {
//       if (window.ethereum) {
//         await window.ethereum.request({ method: "eth_requestAccounts" });
//         const provider = new ethers.providers.Web3Provider(window.ethereum);
//         const signer = provider.getSigner();
//         const address = await signer.getAddress();
//         setProvider(provider);
//         setAccount(address);
//         setConnected(true);
//       } else {
//         console.error("Metamask not detected");
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const enterLottery = async () => {
//     // Perform actions related to entering the lottery
//     setAmountDed(true);
//   };

//   const disconnectFromMetamask = () => {
//     setProvider(null);
//     setAccount(null);
//     setConnected(false);
//   };

//   useEffect(() => {
//     initiateWalletConnection();
//   }, []);

//   return (
//     <div className="user">
//       <p>Welcome {connected && account ? account : "User"}</p>
//       {!connected && (
//         <div>
//           <p>Connect with your MetaMask account</p>
//           <button onClick={initiateWalletConnection}>Connect</button>
//         </div>
//       )}
//       {connected && (
//         <div>
//           <p>Now please enter the amount through MetaMask for lottery participation</p>
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

//           <p>Disconnect from MetaMask</p>
//           <button onClick={disconnectFromMetamask}>Disconnect</button>
//         </div>
//       )}
//     </div>
//   );
// }

// export default UserAdd;

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
