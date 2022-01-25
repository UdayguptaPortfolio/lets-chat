const {ApolloServer}=require('apollo-server')
const gql=require('graphql-tag')
const mongoose=require('mongoose');
const Post=require('./models/PostModel')
const typeDefs=require('./graphql/typeDefs')
const resolvers=require('./graphql/resolvers')


const server=new ApolloServer({
    typeDefs,
    resolvers,
    context:({req})=>({req})
})

mongoose.connect('mongodb+srv://Udaygupta12:Udaygupta123@cluster0.2nekh.mongodb.net/lets_chat?retryWrites=true&w=majority',()=>console.log("Database Connected"));

server.listen({port:5050})
.then(res=>{
    console.log("Server Running");
})