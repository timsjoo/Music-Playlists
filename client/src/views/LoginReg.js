import React, { useState, useEffect } from "react";
import Login from "../components/Login";
import Register from "../components/Register";

import '../App.css';

const LoginReg = (props) => {


    return (

        <div className="container-sm " >

                <div className="container-sm col-6 mx-auto mt-5">
            
                    <div className="row">

                        <div className="col-6 mt-5 pb-5">
                            <Register />
                        </div>

                        <div className="col-6 mt-5 pb-5">
                            <Login />
                        </div>


                    </div>
                </div>
        </div>

    
        
    );
}


export default LoginReg;