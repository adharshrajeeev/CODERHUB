import express from 'express'
import upload from '../config/multer.js';
import {  addPostComment, addUserPosts, deletePostComment, deleteUserPost, exploreAllPosts, getAllPosts, getEditPost, 
        getLikedPostCount, getUserPost, likePost, reportPostByUser, unLikePost, updateUserPost } from '../controller/postController.js';
import { addCoverPicture, addProfilePicture, addUserBio, changeUserPassword, followUser, getAllConnections, getAllFollowers, getAllFollowings, getAllUsers, getUserAllData, getUserBio, getUserDetails, getUserProfileInfo, getUserProfilePic, getUserSuggestion, registerUser,
        removeFollower,
        sendOtpToMail,
        unFollowUser,updateUserDetals,UpdateUserPicture,uptadeUserBio,userLogin } from '../controller/userController.js';
import { verifyToken } from '../middlewares/authentication.js';


const router=express.Router();


router.post('/signup',registerUser);
router.post('/login',userLogin)
router.post('/addPosts',verifyToken,upload.single('image'),addUserPosts);

router.get('/userDetails/:id',verifyToken,getUserDetails)
router.get('/users',verifyToken,getAllUsers);
router.get('/suggestionUsers/:id',getUserSuggestion) //need to rectify
router.get('/userPosts/:id',verifyToken,getUserPost);

router.get('/getUserData',verifyToken,getUserAllData)

router.get('/userProfileDetails',verifyToken,getUserProfileInfo)
router.post('/updateUserDetails/:id',verifyToken,updateUserDetals)

router.put('/changePassword',verifyToken,changeUserPassword)

router.get('/posts/:id',verifyToken,getAllPosts);
router.get('/explore/:id',verifyToken,exploreAllPosts)
router.get('/editPost/:id',verifyToken,getEditPost)
router.put('/updatePost',verifyToken,upload.single('image'),updateUserPost)
router.delete('/deletePost/:id',verifyToken,deleteUserPost)
router.put('/like',verifyToken, likePost)
router.put('/unLike',verifyToken,unLikePost);

router.get('/likeCount/:id',getLikedPostCount)
 
router.post('/follow',verifyToken,followUser) 
router.post('/unFollow',verifyToken,unFollowUser)
router.post('/removeFollower',verifyToken,removeFollower)

router.post('/addBio',verifyToken,addUserBio)
router.get('/bio/:id',verifyToken,getUserBio)
router.put('/updatebio/:id',verifyToken,uptadeUserBio)


router.post('/profilePicture/:id',verifyToken,upload.single('image'),addProfilePicture);
router.post('/coverPicture/:id',verifyToken,upload.single('image'),addCoverPicture)


router.get('/profilePic/:id',verifyToken,getUserProfilePic)
router.put('/updateProPic/:id',verifyToken,upload.single('image'),UpdateUserPicture);


router.post('/addComment',verifyToken,addPostComment);
router.put('/deleteComment',verifyToken,deletePostComment)

router.get('/connections/:id',verifyToken,getAllConnections);
router.get('/followings/:id',verifyToken,getAllFollowings)
router.get('/followers/:id',verifyToken,getAllFollowers)


router.post('/reportPost',verifyToken,reportPostByUser)

router.post('/sendOtp',verifyToken,sendOtpToMail)

export default router