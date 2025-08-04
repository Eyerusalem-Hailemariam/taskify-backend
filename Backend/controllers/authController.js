const authService = require('../services/authSevice');
const jwt = require('jsonwebtoken');
const jwtSecret = process.env.JWT_SECRET;

async function signup(req, res, next){

    const {name, email, password, role} = req.body;
    console.log("name", name)
    console.log("email", email)
    console.log("password", password)
    const existingUser = await authService.checkIfUserExists(email);

    if (existingUser) {
        return res.status(400).json({message: "User already exists"});
    }

    else{
        try {
            const userData = req.body;

            const user = await authService.signup(userData);

            if (!user) {
                res.status(400).json({
                     error: "Failed to add the employee!"
                })
            } else {
                
             
                res.status(200).json({
                  status: "true",
                  message: "Employee added successfully!",
                });
            }

        } catch(error) {
            console.log(error.message);
            res.status(400).json({
              error: "Something went wrong!"
            }); 
        }
    }
}


async function getUser(req, res, next) {

    const {id} = req.params;

    console.log("id", id)
    const response = await authService.getUser(id);
    
    if (!response) {
        res.status(400).json({
             error: "Failed to get the employee!"
        })
    }
    else {  
        console.log("response am in", response)
        return res.status(200).json(response);
    }


}

async function login(req, res, next) {
    try {

        const user = await authService.login(req.body);

        if (user.status == "fail") {
            return res.status(403).json({
                status: user.status,
                message: user.message,
            });
        }

        const payload = {
            user_id: user.data._id,
            user_email: user.data.email,
            user_name: user.data.name,
            user_role: user.data.role
        }
    
        const token = jwt.sign(
            payload,
            jwtSecret, 
            {expiresIn: '1d'}
        );
       
        
        const sendBack = {
            user_token: token,
        };
         
        return res.status(200).json({
            status: "success",
            message: "Employee login successfully!",
            data: sendBack,
        });
    
    } catch(error) {
        console.error('Login error:', error);
        return res.status(500).json({
            status: "fail",
            message: "Internal server error"
        });
    }
}

module.exports = {
    signup,
    getUser,
    login
}

    