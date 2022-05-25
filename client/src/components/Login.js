import React, {useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";


const Login = (props) => {
    const [email, setEmail] = useState("");
    
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    const login = (e) => {
        e.preventDefault();
        axios
            .post(
                "http://localhost:8000/api/users/login", 
                {
                    
                    email: email,
                    password: password,
                },
                {
                    withCredentials: true,
                },
            )
            .then((res) => {
                console.log(res);
                console.log(res.data);
                
                navigate("/home"); 
            
            })
            .catch((err) => {
                console.log(err.response.data);
                setErrorMessage(err.response.data.message);
            });
    };

    return(
        <div>
            <h2>Login</h2>
            <p className="error-text">{errorMessage ? errorMessage : ""}</p>

            <form onSubmit={login}>

                <div className="form-group mt-3">
                    <label  className="form-label" >Email</label>
                    <input
                        type = "text"
                        name = "email"
                        value = {email}
                        onChange = {(e) => setEmail(e.target.value)}
                        className="form-control"
                    />
                </div>

                <div className="form-group mt-3">
                    <label>Password</label>
                    <input
                        type = "password"
                        name = "password"
                        value = {password}
                        onChange = {(e) => setPassword(e.target.value)}
                        className="form-control"
                    />
                </div>

                    <button className="btn  btn-outline-success mt-3"> Login</button>
            </form>
        </div>
    );
};

    export default Login
    

