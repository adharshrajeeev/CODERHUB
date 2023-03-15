import Posts from '../model/posts.js'


export const addUserPosts = async (req, res) => {
    try{

        const userId = req.params.id
        const { content } = req.body;
    
        const newPost=await Posts.create({
            content,
            postedUser:userId
        })
        const posts=await Posts.find({postedUser:userId});
        res.status(200).json({message:"sucess post added",posts})
    }catch(err){
        res.status(400).json({error:err})
    }
}