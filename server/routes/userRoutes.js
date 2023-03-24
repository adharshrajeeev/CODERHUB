import express from 'express'
import upload from '../config/multer.js';
import {  addUserPosts, deleteUserPost, exploreAllPosts, getAllPosts, getEditPost, getLikedPostCount, getUserPost, likePost, unLikePost, updateUserPost } from '../controller/postController.js';
import { addProfilePicture, addUserBio, followUser, getAllUsers, getUserBio, getUserProfilePic, registerUser,unFollowUser,UpdateUserPicture,uptadeUserBio,userLogin } from '../controller/userController.js';
import { verifyToken } from '../middlewares/authentication.js';


const router=express.Router();


router.post('/signup',registerUser);
router.post('/login',userLogin)
router.post('/addPosts',verifyToken,upload.single('image'),addUserPosts);

router.get('/users',verifyToken,getAllUsers)
router.get('/userPosts/:id',verifyToken,getUserPost);

router.get('/posts/:id',verifyToken,getAllPosts);
router.get('/explore',verifyToken,exploreAllPosts)
router.get('/editPost/:id',verifyToken,getEditPost)
router.put('/updatePost/:id',verifyToken,upload.single('image'),updateUserPost)
router.delete('/deletePost/:id',verifyToken,deleteUserPost)
router.post('/like',likePost)
router.post('/unLike',unLikePost);
router.get('/likeCount/:id',getLikedPostCount)

router.post('/follow',verifyToken,followUser) 
router.post('/unFollow',verifyToken,unFollowUser)

router.post('/addBio',verifyToken,addUserBio)
router.get('/bio/:id',verifyToken,getUserBio)
router.put('/updatebio/:id',verifyToken,uptadeUserBio)


router.post('/profilePicture/:id',verifyToken,upload.single('image'),addProfilePicture)
router.get('/profilePic/:id',verifyToken,getUserProfilePic)
router.put('/updateProPic/:id',verifyToken,upload.single('image'),UpdateUserPicture)


export default router