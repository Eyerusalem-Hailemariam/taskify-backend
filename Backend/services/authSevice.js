const UserData = require('../models/userModel');
const bcrypt = require('bcrypt');

async function checkIfUserExists(email) {
    try {
        const user = await findUserByEmail(email, '-password');
        return !!user;
    } catch (error) {
        console.error('Error checking if user exists:', error);
        throw error;
    }
}

async function findUserByEmail(email, selectFields = '') {
    return await UserData.findOne({ email }).select(selectFields).lean();
}

async function findUserById(id, selectFields = '') {
    return await UserData.findById(id).select(selectFields).lean();
}


async function getUser(id) {
    try {
        console.log("hey")
        const user = await findUserById(id, '-password');

        console.log("user", user)
        return user;
    } catch (error) {
        console.error('Error checking if user exists:', error);
        throw error;
    }
}

async function signup(user) {
    try {
         username = user.name,
        email = user.email
        role = user.role

    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(user.password, salt);

    const newUser = new UserData({
       username, 
        email,
        password,
        role
    });

    await newUser.save();
    return newUser
}
catch(error) {
    console.log(error)
}
}


async function login(userData) {
    try {
        let returnData = {}

        const {email, password} = userData;

        console.log("email", email)
        console.log("password", password)
        const user = await findUserByEmail(email, '-password');

        if (!user){
            returnData = {
                status: "fail",
                message : "Employee doesn't exist"
            }
            return returnData
        }

       
        const passwordMatch = await bcrypt.compare(password, user.password)


        if(!passwordMatch) {
            returnData = {
                status: "fail",
                message: "incorrect password"
            };

            return returnData;  
        }

        returnData = {
            status: "success",
            data: user
        };
        // console.log(returnData)
        return returnData
    } catch (error) {

        console.log(error)
    }

}

module.exports = {
    checkIfUserExists,
    signup,
    getUser,
    login
};