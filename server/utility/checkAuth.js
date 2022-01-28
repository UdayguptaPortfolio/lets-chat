const{AuthenticationError}=require('apollo-server')

const jwt=require('jsonwebtoken');
const{SECRET_KEY}=require('../config');

module.exports=(context)=>{
    const authHeader=context.req.headers.authorization;
    if(authHeader){
        const token=authHeader.split('Bearer ')[1];
        if(token){
            try{
                const user=jwt.verify(token,'a secret value for all');
                return user;
            }catch(err){
                throw new AuthenticationError('Expired/Invalid Token');
            }
        }
        throw new Error('Authentication token must be \'Bearer [token]');
    }
    throw new Error('Authorization header must be provided');
};