const PostResolvers=require('./posts');
const userResolvers=require('./users');
const commentResolvers=require('./comments')

module.exports={
    Query:{
        ...PostResolvers.Query
    },
    Mutation:{
        ...userResolvers.Mutation,
        ...PostResolvers.Mutation,
        ...commentResolvers.Mutation
    }
}