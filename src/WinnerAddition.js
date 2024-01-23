function WinnerAdd () {
      // const [isWinner, setIsWinner] = useState(false);
      // const [loading, setLoading] = useState(false);


    return (
        <div className="winner">
          <p>Here you can check you are winner or not using this button</p>
            <button className="winnerBtn">
                check
            </button>
        </div>
    )

}

export default WinnerAdd;












// import React, { useState, useEffect } from "react";

// function WinnerAdd() {
//   const [isWinner, setIsWinner] = useState(false);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     // You can perform any asynchronous operation here, such as checking if the user is a winner
//     // For demonstration purposes, let's simulate an asynchronous operation with setTimeout
//     const checkWinnerStatus = async () => {
//       setLoading(true);

//       try {
//         // Simulating an asynchronous operation that takes some time
//         await new Promise(resolve => setTimeout(resolve, 2000));

//         // Assuming some condition here, you might want to replace it with your logic
//         const userIsWinner = Math.random() > 0.5;

//         setIsWinner(userIsWinner);
//       } catch (error) {
//         console.error("Error checking winner status:", error);
//         // Handle error, maybe show a message to the user
//       } finally {
//         setLoading(false);
//       }
//     };

//     // Call the function when the component mounts
//     checkWinnerStatus();
//   }, []); // Empty dependency array to run the effect only once when the component mounts

//   const handleCheckWinner = () => {
//     // You can perform additional logic when the user clicks the button
//     console.log("Checking winner status again");
//     // You might want to call checkWinnerStatus again here or perform other actions
//   };

//   return (
//     <div className="winner">
//       <p>Here you can check if you are a winner by clicking the button</p>
//       {loading ? (
//         <p>Loading...</p>
//       ) : (
//         <div>
//           <button className="winnerBtn" onClick={handleCheckWinner}>
//             Check
//           </button>
//           {isWinner !== null && (
//             <p>{isWinner ? "Congratulations! You are a winner!" : "Sorry, you are not a winner."}</p>
//           )}
//         </div>
//       )}
//     </div>
//   );
// }

// export default WinnerAdd;
