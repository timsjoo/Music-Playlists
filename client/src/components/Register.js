import React, { useState, useEffect } from "react";
import axios from "axios";



const Register = (props) => {

    const [confirmReg, setConfirmReg] = useState("");
    const [errors, setErrors] = useState({});

    const [user, setUser] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    });


    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value,
        });
    };

    const register = (e) => {
        e.preventDefault();

        axios.post("http://localhost:8000/api/users/register", 
            user,

            {withCredentials: true}
            )
            .then((res) => {
                console.log(res.data);
                setUser({
                    username: "",
                    email: "",
                    password: "",
                    confirmPassword: "",
                });
                setConfirmReg(
                    "Thank you for Registering!",
                );
                setErrors({});
            })
            .catch((err) => {
                console.log(err);
                setErrors(err.response.data.errors);
            })

    }

    return(

        <div>

            <h2>Register</h2>

            {confirmReg ? <h4 style={{ color: "green" }}>{confirmReg}</h4> : null}

            <form onSubmit={register}>

            <div className="form-group mt-3">
                <label htmlFor="username" className="form-label">Username:</label>
                {errors.username ? (
                        <span className="error-text" >
                            {errors.username.message}
                        </span>
                    ) : null}
                <input type="text" name="username" value={user.username} onChange={(e) => handleChange(e)} className="form-control" />
            </div>


            <div className="form-group mt-3">
                    <label htmlFor="email" className="form-label">Email:</label>
                    {errors.email ? (
                        <span className="error-text">{errors.email.message}</span>
                    ) : null}
                    <input type="email" name="email" value={user.email} onChange={handleChange} className="form-control" />
            </div>


            <div className="form-group mt-3">
                    <label htmlFor="password" className="form-label">Password:</label>
                    {errors.password ? (
                        <span className="error-text">
                            {errors.password.message}
                        </span>
                    ) : null}
                    <input type="password" name="password" value={user.password} onChange={handleChange} className="form-control" />
            </div>


            <div className="form-group mt-3">
                    <label htmlFor="confirmPassword" className="form-label">Confirm Password:</label>
                    {errors.confirmPassword ? (
                        <span className="error-text">
                            {errors.confirmPassword.message}
                        </span>
                    ) : null}
                    <input type="password" name="confirmPassword" value={user.confirmPassword} onChange={handleChange} className="form-control" />
            </div>

                <button className="btn  btn-outline-success mt-3" >Register</button>


            </form>



        </div>
    )
}

export default Register;
