const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

module.exports = {

    getLoggedInUser: (req, res) => {
        User.findOne({ _id: req.jwtpayload.id }) // Get object of the single user that is logged in
            .then((user) => res.json(user))
            .catch((err) => {
                console.log(err);
            })
    },

    registerUser: (req, res) => {
        const user = new User(req.body);
        user.save()
            .then((user) => res.json({
                successMessage: "Success!",
                user: user
            }))
            .catch((err) => res.status(400).json(err))
    },

    loginUser: async (req, res) => {
        const user = await User.findOne({ username: req.body.username });
        if (user === null) {
            return res.status(400).json({ message: "Username does not exist" });
        }

        const correctPassword = await bcrypt.compare(req.body.password, user.password);
        if (!correctPassword) {
            return res.status(400).json({ message: "Password is incorrect" });
        }

        const userToken = jwt.sign({
            id: user._id,
            username: user.username
        }, process.env.SECRET_KEY);

        res
            .cookie("usertoken", userToken, process.env.SECRET_KEY, {
                httpOnly: true,
                expires: new Date(Date.now() + 90000000)
            })
            .json({
                msg: "You have successfully logged in!",
                userLoggedIn: user.username,
            });
    },

    logoutUser: (req, res) => {
        res.clearCookie("usertoken");
        res.json({ msg: "You have successfully logged out!" })
    },

}