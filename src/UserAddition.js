import React, { useState, useEffect } from "react";
import { Web3 } from 'web3';
// import { ethers } from "ethers";

function UserAdd ({userWallet}) {

    //usestate is a state variable that declare under the function
    const [user , setUser] = useState([]);
    const [connect , setConnect] = useState("")

    useEffect( () => {
        //this is a predefined hooks that handles the effect of an dependency array . 
        //It is called everyTime whenever any state in the dependency array is modified or updated

        const connection = createConnection(user , userWallet);

        // const initialValue = async () => {

        // }


        // const initializeContract = async () => {
        //     try {
        //         await window.ethereum.enable();
        //         const provider = new ethers.providers.Web3Provider(window.ethereum);
        //         const signer = provider.getSigner();
        //         const contractIns = new ethers.Contract(constants.contractAddress, constants.contractAbi, signer);
        //         setContractInstance(contractIns);

        //         const isComplete = await contractIns.isComplete();
        //         setStatus(isComplete);

        //         const currentWinner = await contractIns.getWinner();
        //         setWinner(currentWinner);

        //         const managerAddress = await contractIns.getManager();
        //         setOwner(managerAddress);

        //         setIsOwnerConnected(managerAddress === currentAccount);
        //     } catch (err) {
        //         console.error(err);
        //     }
        // };
    })
    
    return (
        <div className="user">
            <p className="userp">
                welcome User 
            </p>
            <p>connect with your metamask button</p>
        <button>connect</button>
            <p className="userp"> 
                please enter the button , so you can participate our lottery contest
            </p>
            <button className="button">
                liveContest
            </button>
        </div>
    )
}

export default UserAdd;






// function UserAdd() {
//     const [click, setClick] = useState(0);
//     // using array destructuring here 
//     // to assign initial value 0
//     // to click and a reference to the function 
//     // that updates click to setClick
//     return (
//         <div>
//             <p>You clicked {click} times</p>
 
//             <button onClick={() => setClick(click + 1)}>
//                 Click me
//             </button>
//         </div>
//     );
// }
 
 
// export default UserAdd;