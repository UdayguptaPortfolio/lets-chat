const PostResolvers=require('./posts');
const userResolvers=require('./users');
const commentResolvers=require('./comments')

module.exports={

    Post:{
        likeCount(parent){
            return parent.likes.length;
        },
        commentCount:(parent)=>parent.comments.length
    },
    Query:{
        ...PostResolvers.Query
    },
    Mutation:{
        ...userResolvers.Mutation,
        ...PostResolvers.Mutation,
        ...commentResolvers.Mutation
    }
}