import React, { useState, useEffect } from "react";
import Login from "../components/Login";
import Register from "../components/Register";

import '../App.css';

const LoginReg = (props) => {


    return (

        <div>
            <nav className='navbar navbar-expand-sm navbar-light bg-dark shadow-lg p-3 mb-5 rounded-bottom'>
                <img src="https://img.icons8.com/fluency/96/000000/spotify.png" alt="spotifylogo" className="img ms-5 m-3 bg-dark"></img>
                    <div className='collapse navbar-collapse justify-content-between' id='navbarNav'>
                        <h2 className="bg-white border border-dark rounded px-3 py-2 text-success mr-5">Playlistify</h2>
                            <ul className='navbar-nav'>
                                <h4 className="text-light me-5">Using Spotify to create awesome playlists</h4>
                            </ul>
                    </div>
            </nav>
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