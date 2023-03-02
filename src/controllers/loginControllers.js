const User = require("../models/User.js");
const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require('../config');
const connection = require("../db_connection.js");

async function registerUser(user) {
    const savedUser = await user.save();
    const token = jwt.sign({id: savedUser._id}, SECRET_KEY, {
        expiresIn : 86400
    });
    return token;
};

const getLogin = (req, res) => {
    res.send("login");
};

const getSignup = (req, res) => {
    res.send("signup");
};

const postLogin = async (req, res) => {
    const { email, password} = req.body;
    const foundUser = await User.findOne({email});
    if(!foundUser){
        res.send("user not found");
    } else {
        const comparation = await User.comparePassword(password, foundUser.password);
        res.send(foundUser);
    }
};

const postSignup = async (req, res) => {
    const { name, email, password, confirm_password } = req.body;
    const foundEmail = await User.findOne({email});
    const foundName = await User.findOne({name});
    if(!foundEmail && !foundName) {
        if(password === confirm_password) {
            const newUser = new User({
                name: name,
                email: email,
                password: await User.encryptPassword(password)
            });
            const token = await registerUser(newUser);
            res.json({token});
            console.log("Account created");
        } else {
            console.log("password rejected");
            res.send("password rejected");
        };
    } else {
        console.log("There is already an account registered");
        res.send("There is already an account registered");
    }
};

module.exports = { 
    getLogin,
    getSignup,
    postLogin,
    postSignup
};