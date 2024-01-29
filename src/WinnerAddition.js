import React, { useState, useEffect } from "react";
import { contractAddress, contractAbi } from "./constant.js";
// import { ethers } from "ethers";
const ethers = require("ethers");
// import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

const LotteryWinner = () => {
  const [participants, setParticipants] = useState([]);
  const [winner, setWinner] = useState(null);

  useEffect(() => {
   
    const fetchParticipants = async () => {
      try {
       
        const response = await fetch();
        const data = await response.json();
        setParticipants(data.participants);
      } catch (error) {
        console.error("Error fetching participants:", error);
      }
    };

    fetchParticipants();
  }, []);

  const pickWinner = async () => {

    try {
      if (participants.length > 0) {
       
        const randomIndex = Math.floor(Math.random() * participants.length);
        const selectedWinner = participants[randomIndex];

        const provider = new ethers.providers.JsonRpcProvider();
        const signer = provider.getSigner();

        

        const contract = new ethers.Contract(contractAddress, contractAbi, signer);

        
        const transaction = await contract.declareWinner(selectedWinner);

        
        await transaction.wait();

        
        setWinner(selectedWinner);
      }
    } catch (error) {
      console.error("Error picking winner:", error);
    }
  };

  const winnerAddress= localStorage.getItem("userAddress")

  return (
    <div className="lottery-winner">
      <h2>Lottery Winner Selection</h2>
      {participants.length > 0 ? (
        <>
          <p>Participants:</p>
          <ul>
            {participants.map((participant, index) => (
              <li key={index}>{participant}</li>
            ))}
          </ul>
          <button onClick={pickWinner}>Pick Winner</button>
        </>
      ) : (

        <p> congrate you r the winner  : { winnerAddress } </p>
        
      )}

      {winner && (
        <div>
          <h3>Winner:</h3>
          <p>{winner}</p>
        </div>
      )}
    </div>
  );
};

export default LotteryWinner;













// function WinnerAdd () {
//   const [name, setName] = useState('');
//      const [isWinner, setIsWinner] = useState(false);
//      const [loading, setLoading] = useState(false);


//     return (
//         <div className="winner">
//           <p>Here you can check you are winner or not using this button</p>
//             <button className="winnerBtn">
//                 check
//             </button>
//         </div>
//     )

// }

// export default WinnerAdd;












// // import React, { useState, useEffect } from "react";

// // function WinnerAdd() {
// //   const [isWinner, setIsWinner] = useState(false);
// //   const [loading, setLoading] = useState(false);

// //   useEffect(() => {
// //     // You can perform any asynchronous operation here, such as checking if the user is a winner
// //     // For demonstration purposes, let's simulate an asynchronous operation with setTimeout
// //     const checkWinnerStatus = async () => {
// //       setLoading(true);

// //       try {
// //         // Simulating an asynchronous operation that takes some time
// //         await new Promise(resolve => setTimeout(resolve, 2000));

// //         // Assuming some condition here, you might want to replace it with your logic
// //         const userIsWinner = Math.random() > 0.5;

// //         setIsWinner(userIsWinner);
// //       } catch (error) {
// //         console.error("Error checking winner status:", error);
// //         // Handle error, maybe show a message to the user
// //       } finally {
// //         setLoading(false);
// //       }
// //     };

// //     // Call the function when the component mounts
// //     checkWinnerStatus();
// //   }, []); // Empty dependency array to run the effect only once when the component mounts

// //   const handleCheckWinner = () => {
// //     // You can perform additional logic when the user clicks the button
// //     console.log("Checking winner status again");
// //     // You might want to call checkWinnerStatus again here or perform other actions
// //   };

// //   return (
// //     <div className="winner">












// //       <p>Here you can check if you are a winner by clicking the button</p>
// //       {loading ? (
// //         <p>Loading...</p>
// //       ) : (
// //         <div>
// //           <button className="winnerBtn" onClick={handleCheckWinner}>
// //             Check
// //           </button>
// //           {isWinner !== null && (
// //             <p>{isWinner ? "Congratulations! You are a winner!" : "Sorry, you are not a winner."}</p>
// //           )}
// //         </div>
// //       )}
// //     </div>
// //   );
// // }

// // export default WinnerAdd;


















// import React, { useState, useEffect } from "react";
// import { contractAddress, contractAbi } from "./constant.js";
// // import { ethers } from "ethers";
// const ethers = require("ethers");
// // import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

// const LotteryWinner = () => {
//   const [participants, setParticipants] = useState([]);
//   const [winner, setWinner] = useState(null);

//   useEffect(() => {
//     // Simulating fetching participants from the backend
//     const fetchParticipants = async () => {
//       try {
//         // Replace this with your backend endpoint to fetch participants
//         // const response = await fetch("https://fake-backend.example.com/participants");
//         const response = await fetch();
//         const data = await response.json();
//         setParticipants(data.participants);
//       } catch (error) {
//         console.error("Error fetching participants:", error);
//       }
//     };

//     fetchParticipants();
//   }, []);

//   const pickWinner = async () => {

//     try {
//       if (participants.length > 0) {
//         // Pick a random index as the winner
//         const randomIndex = Math.floor(Math.random() * participants.length);
//         const selectedWinner = participants[randomIndex];

//         // Simulate sending a transaction to the smart contract to declare the winner
//         // Replace with your actual contract instance and method
//         // const provider = new ethers.providers.JsonRpcProvider("https://rinkeby.infura.io/v3/YOUR_INFURA_PROJECT_ID");
//         const provider = new ethers.providers.JsonRpcProvider();
//         const signer = provider.getSigner();

//         // Replace with your actual contract address and ABI
//         // const contractAddress = "0xYourContractAddress";
//         // const contractAbi = [...]; // Your contract ABI

//         const contract = new ethers.Contract(contractAddress, contractAbi, signer);

//         // Replace with your contract method to declare the winner
//         const transaction = await contract.declareWinner(selectedWinner);

//         // Wait for the transaction to be mined
//         await transaction.wait();

//         // Update the state with the winner
//         setWinner(selectedWinner);
//       }
//     } catch (error) {
//       console.error("Error picking winner:", error);
//     }
//   };

//   const winnerAddress= localStorage.getItem("userAddress")

//   return (
//     <div className="lottery-winner">
//       <h2>Lottery Winner Selection</h2>
//       {participants.length > 0 ? (
//         <>
//           <p>Participants:</p>
//           <ul>
//             {participants.map((participant, index) => (
//               <li key={index}>{participant}</li>
//             ))}
//           </ul>
//           <button onClick={pickWinner}>Pick Winner</button>
//         </>
//       ) : (

//         <p> congrate you r the winner  : { winnerAddress } </p>
        
//       )}

//       {winner && (
//         <div>
//           <h3>Winner:</h3>
//           <p>{winner}</p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default LotteryWinner;

