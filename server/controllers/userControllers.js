 //========REGISTER A NEW USER
 // POST : api/users/register
 //UNPROTECTED
 const bcrypt = require('bcryptjs')
 const User = require('../models/userModel')
 const HttpError = require("../models/errorModel")
 const jwt = require("jsonwebtoken")
 const fs = require('fs')
 const path = require('path')
 const {v4: uuid} =require("uuid")
 
 const registerUser = async (req, res, next) => {
   try {
      const {name,email, password , password2} = req.body;
      if(!name || !email || !password){
         return next(new HttpError("Fill in all fields", 422))
      }
      const newEmail = email.toLowerCase()

      const emailExists = await User.findOne({email: newEmail})

      if(emailExists){
         return next(new HttpError("Email already exits." ,422))
      }
      if((password.trim()).length <6){
         return next(new HttpError("password shoud be at least 6 characters.",422))
      }
      if(password != password2){
         return next(new HttpError("password do not match",422))
      }
      const salt = await bcrypt.genSalt(10)
      const hashedPass = await bcrypt.hash(password, salt);
      const newUser = await User.create({name, email: newEmail, password: hashedPass})
      res.status(201).json(newUser)
   } catch (error) {
      return next(new HttpError("User registration failed.",422))
   }
 }

 //======== LOGING A REGISTER A NEW USER
 // POST : api/users/login
 //UNPROTECTED
 const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return next(new HttpError("Please fill all fields", 422));
    }
    const newEmail = email.toLowerCase();
    
    const user = await User.findOne({ email: newEmail });
    if (!user) {
      return next(new HttpError("Invalid credentials", 422));
    }
    
    const comparePass = await bcrypt.compare(password, user.password);
    if (!comparePass) {
      return next(new HttpError("Invalid credentials", 422));
    }
    
    const { _id: id, name } = user;
    const token = jwt.sign({ id, name }, process.env.JWT_SECRET, { expiresIn: "1d" });
    
    res.status(200).json({ token, id, name });
  } catch (error) {
    return next(new HttpError("Login failed. Please check your credentials", 422));
  }
};


 //======== USER PROFILE
 // POST : api/users/: id
 //PROTECTED
 const getUser = async (req, res, next) => {
    try {
      const {id} = req.params;
      const user = await User.findById(id).select('-password');
      if(!user) {
         return next(new HttpError("User not found." ,404))
      }
      res.status(200).json(user);
      
    } catch (error) {
      return next(new HttpError(error));
    }
 }



 //======== CHANGE USER AVATAR
 // POST : api/users/change-avatar
 //PROTECTED
 const changeAvatar = async (req, res, next) => {
     try {
       if(!req.files.avatar){
         return next(new HttpError('please chose an image', 422))
       }
       //find user from database
       const user = await User.findById(req.user.id)
      // delete old avatar if exit
      if(user.avatar){
         fs.unlink(path.join(__dirname,'..', 'uploads', user.avatar), (err) =>{
            if(err){
               return next(new HttpError(err))
            }
         } )
      }
      const {avatar} = req.files;
      //check file size
      if(avatar.size > 500000){
         return next(new HttpError("profile pitcher too big. Shoud be less than 500kb"), 422)
      }
      let fileName;
      fileName = avatar.name;
      let splittedfilename = fileName.plit('.')
      let newFilename = splittedfilename[0] + uuid() + '.' +splittedfilename[splittedfilename.length -1] 
      avatar.mv(path.join(__dirname,'..', 'uploads', newFilename), async (err) =>{
         if(err){
            return next(new HttpError(err))
         }

         const updatedAvatar = await User.findByIdAndUpdate(req.user.id, {avatar: newFilename},{new: true})
         if(!updatedAvatar){
            return next(new HttpError(), 422 )
         }
         res.status(200).json(updatedAvatar)
      })
     } catch (error) {
       return next(new HttpError(error))
     }
 }

//======== EDIT USER DETAILS (from profile)
// POST : api/users/edit-user
//PROTECTED
 const editUser = async (req, res, next) => {
    res.json("Edit user details")
 }


 //======== GET AUTHORS
// POST : api/users/authors
//UNPROTECTED
 const getAuthors = async (req, res, next) => {
    try {
       const authors = await User.find().select('-password');
       res.json(authors);
    } catch (error) {
       return next(new HttpError(error))
    }
 }


 module.exports = {registerUser, loginUser , getUser , changeAvatar , editUser , getAuthors}