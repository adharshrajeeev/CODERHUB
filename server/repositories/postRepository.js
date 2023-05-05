import Posts from "../model/posts.js";


export const fetchAllPosts = async()=>{
    try{
        const posts=await Posts.find();
        return {data:posts}

    }catch(err){
       
        throw new Error(err.message);
    }
}


export const fetchTotalPostReports = async()=>{
    try{
        const posts=await Posts.aggregate([
            {
              $project: {
                _id: 1,
                content: 1,
                likes: 1,
                postedUser: 1,
                image: 1,
                videoUrl: 1,
                comments: 1,
                isDelete: 1,
                isBlocked: 1,
                isPrivate: 1,
                numReports: {
                  $size: "$reports"
                },
                reportsContent: "$reports.content"
              }
            },
            {
              $sort: {
                numReports: -1
              }
            }
          ])
          return {data:posts}
    }catch(err){
        throw new Error(err.message);
    }
}


export const blockPosts=async(postId)=>{
    try{
        const post=await Posts.findOneAndUpdate({_id:postId},{
            isBlocked:true
       })
       return {data:post}
    }catch(err){
        throw new Error(err.message);
    }   
}
export const unBlockPosts=async(postId)=>{
    try{
        const post=await Posts.findOneAndUpdate({_id:postId},{
            isBlocked:false
       })
       return {data:post}
    }catch(err){
        throw new Error(err.message);
    }   
}



export const fetchMonthWisePostGrowth = async()=>{
    try{
        const posts = await Posts.aggregate([
            {
              $group: {
                _id: { $month: "$createdAt" },
                count: { $sum: 1 }
              }
            }
          ])
          return {data:posts}
    }catch(err){
        throw new Error(err.message)
    }
}


export const fetchPostDetails=async(postId)=>{
  try{
    const post=await Posts.findOne({_id:postId})
    return {data:post}
  }catch(err){
    throw new Error(err.message)
  }
}