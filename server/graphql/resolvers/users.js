const User=require('../../models/userModel')
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
const {SECRET_KEY}=require('../../config')
const {UserInputError}=require('apollo-server')
const {validateRegisterInput,validateLoginInput}=require('../../utility/validator')

function generateToken(user){
    return jwt.sign({
        id:user.id,
        email:user.email,
        username:user.username
    },'a secret value for all',{expiresIn:'1h'});
}

module.exports={
    Mutation:{
        register:async(_,{
            registerInput: { username, email, password, confirmPassword }
        },context,info)=>{
            //We can Validate the Users
            const {valid,errors}=validateRegisterInput(username, email, password, confirmPassword)
            if(!valid){
                throw new UserInputError('Errors',{errors})
            }
            //User Already Exist or not
            //Password and tokens
            const user=await User.findOne({username});
            if(user){
                throw new UserInputError("Username Already Exist",{
                    errors:{
                        username:'Username already exists',
                    }
                })
            }
            password=await bcrypt.hash(password,12)
            const newUser=new User({
                email,
                username,
                password,
                createdAt:new Date().toISOString(),
            })
            const res=await newUser.save();
            const token= generateToken(res)

            return {
                ...res._doc,
                id:res._id,
                token
            };
        },
        async login(_,{username,password}){
            const {errors,valid}=validateLoginInput(username,password);
            if(!valid){
                throw new UserInputError("Errors",{errors})
            }
            const user=await User.findOne({username})
            if(!user){
            errors.general="User Not Found";
            throw new UserInputError("Login Credentials are Wrong",{errors})
            }
            const match=await bcrypt.compare(password,user.password);
            if(!match){
                errors.general="Credentials are Wrong";
                throw new UserInputError("Login Credentials are Wrong",{errors})
            }
            const token= generateToken(user);
            return {
                ...user._doc,
                id:user._id,
                token
            };
        },
    }
}