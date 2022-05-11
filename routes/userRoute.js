const express = require("express");
const router = express.Router();
const User = require("../models/userModel");
const logger = require("../utils/logger");

router.post("/register", async(req, res) => {
    
    logger.log({
        level: "info",
        message: "Register user called",
      });

    const {name , email , password} = req.body

    const newUser = new User({name , email , password})

    try {
        newUser.save()
        logger.log({
            level: "info",
            message: "User registered successfully",
          });
        res.send('User Registered successfully')
    } catch (error) {
         return res.status(400).json({ message: error });
    }

});


router.post("/login", async(req, res) => {

    logger.log({
        level: "info",
        message: "Signin Called",
      });
    const {email , password} = req.body

    try {
        
        const user = await User.find({email , password})

        if(user.length > 0)
        {
            const currentUser = {
                name : user[0].name , 
                email : user[0].email, 
                isAdmin : user[0].isAdmin, 
                _id : user[0]._id
            }
            logger.log({
                level: "info",
                message: "Signin Successfull",
              });
            res.send(currentUser);
        }
        else{
            logger.log({
                level: "error",
                message: "Signin Failed",
              });
            return res.status(400).json({ message: 'User Login Failed' });
        }

    } catch (error) {
           return res.status(400).json({ message: 'Something went weong' });
    }
  
});


router.get("/getallusers", async(req, res) => {
    logger.log({
        level: "info",
        message: "user info called",
      });
    try {
        const users = await User.find({})
        logger.log({
            level: "info",
            message: "user info successfull",
          });
        res.send(users)
    } catch (error) {
        logger.log({
            level: "info",
            message: "user info get failed",
          });
        return res.status(400).json({ message: error });
    }
  
});

router.post("/deleteuser", async(req, res) => {
  
    const userid = req.body.userid
    logger.log({
        level: "info",
        message: "delete user called",
      });

    try {
        await User.findOneAndDelete({_id : userid})
        logger.log({
            level: "info",
            message: "user deleted successfully",
          });
        res.send('User Deleted Successfully')
        
    } catch (error) {
        logger.log({
            level: "error",
            message: "user delete failed",
          });
        return res.status(400).json({ message: error });
    }

});



module.exports = router