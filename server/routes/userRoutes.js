import express from 'express'
import upload from '../config/multer.js';
import {  addPostComment, addUserPosts, deletePostComment, deleteUserPost, exploreAllPosts, getAllPosts, getEditPost, 
        getLikedPostCount, getUserPost, likePost, reportPostByUser, reportPostUserHome, unLikePost, updateUserPost } from '../controller/postController.js';
import { addCoverPicture, addProfilePicture, addUserBio, changeUserPassword, followUser, getAllConnections, getAllFollowers, getAllFollowings, getAllUsers, getUserBio, getUserDetails, getUserProfileInfo,
         getUserProfilePic, getUsers, otpSignupVerification, registerUser, removeFollower,resetAndConfrimOtp,searchAllUsers,searchUserFollowing,sendOtpToMail,
        unFollowUser,updateUserDetals,UpdateUserPicture,uptadeUserBio,userLogin, verificationAndSignup } from '../controller/userController.js';
import { verifyToken } from '../middlewares/authentication.js';
import { addConversation, getAllConversation } from '../controller/conversationController.js';
import { getAllMessgaes, postMessage } from '../controller/messageController.js';
import { isBlocked } from '../middlewares/authorize.js';
import { deteletUserNotification, getAllNotifications, readNotification } from '../controller/notificationController.js';

// import { imageUpload, videoUpload } from '../config/multer.js';


const router=express.Router(); 

``
router.post('/signup',registerUser);
router.post('/signupVerification',verificationAndSignup);
router.post('/otpVerification',otpSignupVerification)
router.post('/login',userLogin) 
// router.post('/addPosts',verifyToken,upload.single('image'),isBlocked,addUserPosts);
// router.post('/addPosts',verifyToken,upload.single('image'),upload.single('my-video'),addUserPosts);

 router.post('/addPosts',verifyToken,isBlocked,upload.fields([
        { name: 'image', maxCount: 1 },
        { name: 'my-video', maxCount: 1 }
      ]),addUserPosts);

router.get('/user/:userId',verifyToken,isBlocked,getUsers)

router.get('/userDetails/:id',verifyToken,isBlocked,getUserDetails)  
router.get('/users',verifyToken,isBlocked,getAllUsers); 

router.get('/userPosts/:id',verifyToken,isBlocked,getUserPost);


router.get('/userProfileDetails',verifyToken,isBlocked,getUserProfileInfo)
router.post('/updateUserDetails/:id',verifyToken,isBlocked,updateUserDetals)

router.put('/changePassword',verifyToken,isBlocked,changeUserPassword)

router.get('/posts/:id',verifyToken,isBlocked,getAllPosts);
router.get('/explore',verifyToken,isBlocked,exploreAllPosts)
router.get('/editPost/:id',verifyToken,isBlocked,getEditPost)
router.put('/updatePost',verifyToken,upload.fields([
        { name: 'image', maxCount: 1 },
        { name: 'my-video', maxCount: 1 }
      ]),isBlocked,updateUserPost) 
router.delete('/deletePost',verifyToken,isBlocked,deleteUserPost)
router.put('/like',verifyToken, isBlocked,likePost)
router.put('/unLike',verifyToken,isBlocked,unLikePost);

router.get('/likeCount/:id',verifyToken,isBlocked,getLikedPostCount)
 
router.post('/follow',verifyToken,isBlocked,followUser) 
router.post('/unFollow',verifyToken,isBlocked,unFollowUser)
router.post('/removeFollower',verifyToken,isBlocked,removeFollower)

router.post('/addBio',verifyToken,isBlocked,addUserBio)
router.get('/bio/:id',verifyToken,isBlocked,getUserBio)
router.put('/updatebio/:id',verifyToken,isBlocked,uptadeUserBio)


router.post('/profilePicture/:id',verifyToken,upload.single('image'),isBlocked,addProfilePicture); 
router.post('/coverPicture/:id',verifyToken,upload.single('image'),isBlocked,addCoverPicture)


router.get('/profilePic/:id',verifyToken,isBlocked,getUserProfilePic)
router.put('/updateProPic/:id',verifyToken,upload.single('image'),isBlocked,UpdateUserPicture);  


router.post('/addComment',verifyToken,isBlocked,addPostComment);
router.put('/deleteComment',verifyToken,isBlocked,deletePostComment)

router.get('/connections/:id',verifyToken,isBlocked,getAllConnections);
router.get('/followings/:id',verifyToken,isBlocked,getAllFollowings)
router.get('/followers/:id',verifyToken,isBlocked,getAllFollowers)


router.post('/reportPost',verifyToken,isBlocked,reportPostByUser)
router.post('/reportPostHome',verifyToken,isBlocked,reportPostUserHome)


router.post('/sendOtp',sendOtpToMail)
router.post('/resetPassword',resetAndConfrimOtp)

router.get('/searchUsers',verifyToken,isBlocked,searchUserFollowing)
router.get('/searchAll',verifyToken,isBlocked,searchAllUsers)



//CONVERSATION ROUTES
router.post('/conversation',verifyToken,addConversation)

router.get('/allConversation/:userId',verifyToken,getAllConversation)


//MESSAGES ROUTES
router.post('/messages',verifyToken,postMessage)
router.get('/allMessages/:conversationId',verifyToken,getAllMessgaes)


//NOTIFACTION ROUTERS
router.get('/notifications/:userId',verifyToken,isBlocked,getAllNotifications)
router.put('/readNotification/:notificationId',verifyToken,isBlocked,readNotification)
router.delete('/deleteNotification/:notificationId',verifyToken,isBlocked,deteletUserNotification)


export default router 