import React, { useState} from "react";

function ComponentIncrease () {
    const [count , setCount] = useState(5);

    // let counts = [];

    
    const increaseCount = () => {
        setCount(count -1);
        if (count <=0) {
            setCount(count +5)
        }
    }


    return ( 
        <div>
        <h2>
            counter : {count}
        </h2>
        <button onClick={increaseCount}>
            clickMe
        </button>
        </div>
    ) 
}

export default ComponentIncrease;