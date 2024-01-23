
import React, { useState, useEffect } from "react";

import { Link} from "react-router-dom";

function Home () {

    return (
        <>
        <p>
            Welcome to our Lottery Decentralized Application , Please go to user contest Section
        </p>

             <Link to="/user">
              <button className="button">Contest</button>
            </Link>

      

        {/* <img src="download.jpeg" alt="lottery" width="500" height="600"></img> */}
        
        </>
    )

}

export default Home;