import path from 'path'
import cloudinary from '../config/cloudinary.js';
import Posts from '../model/posts.js';
import User from '../model/users.js';
import { addLikeNotification, removeLikeNotification } from '../repositories/notificationRepository.js';



export const addUserPosts = async (req, res) => {

    try {




        const { content, userId, userName, profilePic, postContent,
            imageContent, videoContent, contentVideo, contentImg } = req.body


    
           
        
        if (imageContent) {

            const cloudImage = await cloudinary.uploader.upload(req.files.image[0].path, {
                folder: "Posts"
            });

            await Posts.create({
                content,
                postedUser: {
                    _id: userId,
                    userName,
                    profilePic
                },
                image: {
                    PublicId: cloudImage.public_id,
                    url: cloudImage.url
                },
                userName: userName
            })
            const posts = await Posts.find().sort({ createdAt: -1 });
            return res.status(200).json({ success: true, message: "post added sucess", posts })
        }

        if (videoContent) {

            let ext = path.extname(req.files['my-video'][0].originalname);
            if (ext !== ".mp4" && ext !== ".mkv" && ext !== ".jpeg" && ext !== ".jpg" && ext !== ".png") {

                return res.status(401).json({ message: "File Format not supported" })
            }

            if (ext == ".mp4" || ext == ".mkv") {
                const cloudVideo = await cloudinary.uploader.upload(req.files['my-video'][0].path, {
                    resource_type: "video",
                    folder: "User-videos"
                })
                await Posts.create({
                    postedUser: {
                        _id: userId,
                        userName,
                        profilePic
                    },
                    videoUrl: cloudVideo.url,
                    userName: userName
                })
                const posts = await Posts.find().sort({ createdAt: -1 });
                return res.status(200).json({ success: true, message: "post added sucess", posts })
            }


        }
        if (contentVideo) {

            const cloudVideo = await cloudinary.uploader.upload(req.files['my-video'][0].path, {
                resource_type: "video",
                folder: "User-videos"
            })
            console.log(":second")
            await Posts.create({
                content,
                postedUser: {
                    _id: userId,
                    userName,
                    profilePic
                },
                videoUrl: cloudVideo.url,
                userName: userName
            })
            const posts = await Posts.find().sort({ createdAt: -1 });
            return res.status(200).json({ success: true, message: "post added sucess", posts })
        }

        if (contentImg) {

            const cloudImage = await cloudinary.uploader.upload(req.files.image[0].path, {
                folder: "Posts"
            });

            await Posts.create({
                content,
                postedUser: {
                    _id: userId,
                    userName,
                    profilePic
                },
                image: {
                    PublicId: cloudImage.public_id,
                    url: cloudImage.url
                },
                userName: userName
            })
            const posts = await Posts.find().sort({ createdAt: -1 });
            return res.status(200).json({ success: true, message: "post added sucess", posts })
        }
        

        await Posts.create({
            content,
            postedUser: {
                _id: userId,
                userName: userName,
                profilePic: profilePic
            },
        })
        const posts = await Posts.find().sort({ createdAt: -1 });
        return res.status(200).json({ success: true, message: "sucess post added", posts })
    } catch (err) {
        console.log(err)
        res.status(400).json({ success: false, error: err, message: "somehting went wrong" })
    }
}


export const getUserPost = async (req, res) => {
    try {
        const userId = req.params.id;
        const posts = await Posts.find({ "postedUser._id": userId }).sort({ createdAt: -1 });

        res.status(200).json({ success: true, posts })
    } catch (err) {
        res.status(400).json({ success: false, error: err.message,message:"Failed to Fetch Posts" })
    }

}
 
export const getEditPost = async (req, res) => {
    try {
        const postDetails = await Posts.findById(req.params.id)
        res.status(200).json({ success: true, postDetails })
    } catch (err) {
        res.status(500).json({ success: false, error: err,message:"Failed to Fetch Posts" })
    }
}


export const updateUserPost = async (req, res) => {
    try {

        const { content, postId, userId } = req.body;
        console.log("content", content, "posteIId", postId, "userId", userId)
        if (req.file) {
            const cloudImage = await cloudinary.uploader.upload(req.file.path, {
                folder: "Posts"
            });
            await Posts.findOneAndUpdate({ _id: postId }, {
                $set: {
                    "image.url": cloudImage.url,
                    content: content
                }
            })
            const post = await Posts.findOne({ _id: postId })
            return res.status(200).json({ success: true, post, message: "post updated" })
        }
        await Posts.findOneAndUpdate({ _id: postId }, {
            $set: {
                content: content
            }
        })
        const post = await Posts.findOne({ _id: postId })
        res.status(200).json({ success: true, post, message: "post updated" })

    } catch (err) {
        res.status(500).json({ success: false, error: err })
    }
}

export const getAllPosts = async (req, res) => {
    try {

        const userId = req.params.id
        const user = await User.findOne({ _id: userId })
        const followingIds = user.following.map(follower => follower._id);
        const userPosts = await Posts.find({ $and: [{ "postedUser._id": { $in: followingIds } }, { "reports.userId": { $ne: userId } }] }).sort({ createdAt: -1 });
        res.status(200).json(userPosts)
    } catch (err) {
        console.log(err)
        res.status(500).json({ error: err })
    }
}


export const deleteUserPost = async (req, res) => {
    try {

        const { userId, postId } = req.query;


        Posts.findByIdAndDelete(postId).then(async () => {
            const posts = await Posts.find({ "postedUser._id": userId }).sort({ createdAt: -1 });
            return res.status(200).json({ success: true, message: "Post Deleted Success Fully", posts });

        }).catch((err) => {
            return res.status(401).json({ success: false, message: "No post found", error: err })
        })

    } catch (err) {
        res.status(500).json({ error: err })
    }
}

export const exploreAllPosts = async (req, res) => {
    try {

        const { page = 1, limit = 10, userId } = req.query
        const posts = await Posts.find({ $and: [{ "reports.userId": { $ne: userId } }, { "postedUser._id": { $ne: userId } }] }).sort({ createdAt: -1 }).limit(limit * 1).skip((page - 1) * limit);
        res.status(200).json(posts)
    } catch (err) {

        res.status(500).json({ error: err })
    }
}

export const likePost = async (req, res) => {
    try {

        const { postId, userId } = req.body;

        return new Promise((resolve, reject) => {
            Posts.findOneAndUpdate({ _id: postId }, {
                $addToSet: {
                    likes: userId
                }
            }).then(async(response) => {
                await addLikeNotification(response?.postedUser?._id,userId,postId,"LIKE")
                resolve(res.status(200).json({ message: "user liked post", response }))
            }).catch((err) => {
                resolve(res.status(400).json({ message: "Oops Something went wrong in Like", error: err }))
            })
        })
    } catch (err) {
        res.status(500).json({ error: err })

    }
}

export const unLikePost = async (req, res) => {
    try {

        const { postId, userId } = req.body;

        const post = await Posts.findOneAndUpdate({ _id: postId }, {
            $pull: {
                likes: userId
            }
        },{new:true})
        await removeLikeNotification(post?.postedUser?._id,userId,postId,"LIKE")
        res.status(200).json({ success: true, message: "user unliked post", post })
    } catch (err) {

        res.status(500).json({ error: err })

    }
}


export const getLikedPostCount = async (req, res) => {
    try {
        const postId = req.params.id;

        const { likes } = await Posts.findOne({ _id: postId })
        res.status(200).json(likes.length)

    } catch (err) {
        res.status(500).json({ error: err })
    }
}


export const addPostComment = async (req, res) => {
    try {

        const commentDate = new Date();
        const { postId, userId, content } = req.body;
        const userDetails = await User.findOne({ _id: userId })
        const newComment = {
            userId: userId,
            content: content,
            createdAt: commentDate,
            userName: userDetails.userName,
            userPic: userDetails.profilePic
        }
        await Posts.findOneAndUpdate({ _id: postId }, {
            $push: {
                comments: newComment,
            },
        })
        const post = await Posts.findOne({ _id: postId })
        res.status(200).json(post)
    } catch (err) {
        res.status(500).json({ error: err.message,message:"Failed to add Comment" })
    }
}



export const deletePostComment = async (req, res) => {
    const { postId, commentId } = req.body;
    Posts.findOneAndUpdate({ _id: postId },
        { $pull: { comments: { _id: commentId } } }
    ).then(async (response) => {
        const post = await Posts.findOne({ _id: postId })
        res.status(200).json(post)
    }).catch((err) => {
        res.status(500).json({ error: err.message,message:"Failed to delete Comment" })
    })

}

export const reportPostByUser = async (req, res) => {
    const { userId, postId, content } = req.body;
    const newReport = {
        content: content,
        userId: userId
    }
    const post = await Posts.findOneAndUpdate({ _id: postId }, {
        $addToSet: {
            reports: newReport
        }
    }, { new: true })
    const posts = await Posts.find({ $and: [{ "reports.userId": { $ne: userId } }, { "postedUser._id": { $ne: userId } }] }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, message: "U have Reported post", posts })
}

export const reportPostUserHome = async (req, res) => {
    const { userId, postId, content } = req.body;
    const newReport = {
        content: content,
        userId: userId
    }
    const post = await Posts.findOneAndUpdate({ _id: postId }, {
        $addToSet: {
            reports: newReport
        }
    }, { new: true })
    const user = await User.findOne({ _id: userId })
    const followingIds = user.following.map(follower => follower._id);
    const posts = await Posts.find({ $and: [{ "postedUser._id": { $in: followingIds } }, { "reports.userId": { $ne: userId } }] }).sort({ createdAt: -1 });
    //   const posts=await Posts.find({$and:[{"reports.userId":{$ne:userId}},{"postedUser._id":{$ne:userId}}]}).sort({ createdAt: -1 });
    res.status(200).json({ success: true, message: "U have Reported post", posts })
}

