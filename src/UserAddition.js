import React, { useState, useEffect } from "react";
import Web3 from 'web3';

function UserAdd() {
  const [user, setUser] = useState(null);
  const [web3, setWeb3] = useState(null);
  const [connected, setConnected] = useState(false);

  // Define the function to connect with Metamask outside useEffect
  const connectWithMetamask = async () => {
    try {
      if (window.ethereum) {
        const web3Instance = new Web3(window.ethereum);
        setWeb3(web3Instance);

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
      // Handle error, maybe show a message to the user
    }
  };

  useEffect(() => {
    // Call the function within useEffect
    connectWithMetamask();
  }, []); // Empty dependency array to run the effect only once when the component mounts

  const handleLiveContest = () => {
    console.log("Participating in the lottery contest");
    // Handle logic for participating in the lottery contest
    // You can navigate to another page, show a modal, etc.
  };

  return (
    <div className="user">
      <p className="userp">Welcome {connected && user ? user.address : "User"}</p>
      {!connected && (
        <div>
          <p>Connect with your Metamask button</p>
          <button onClick={connectWithMetamask}>Connect</button>
        </div>
      )}
      {connected && (
        <div>
          <p>Please enter the button so you can participate in our lottery contest</p>
          <button className="button" onClick={handleLiveContest}>
            Live Contest
          </button>
        </div>
      )}
    </div>
  );
}

export default UserAdd;




























// import React, { useState, useEffect } from "react";
// import { Web3 } from 'web3';
// // import { ethers } from "ethers";

// function UserAdd () {

//     //usestate is a state variable that declare under the function
//     const [user , setUser] = useState([]);
//     const [connect , setConnect] = useState("")

//     useEffect( () => {
//         //this is a predefined hooks that handles the effect of an dependency array . 
//         //It is called everyTime whenever any state in the dependency array is modified or update



   
//     })
    
//     return (
//         <div className="user">
//             <p className="userp">
//                 welcome User 
//             </p>
//             <p>connect with your metamask button</p>
//         <button>connect</button>
//             <p className="userp"> 
//                 please enter the button , so you can participate our lottery contest
//             </p>
//             <button className="button">
//                 liveContest
//             </button>
//         </div>
//     )
// }

// export default UserAdd;


