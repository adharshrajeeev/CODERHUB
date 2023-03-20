import express from 'express'
import upload from '../config/multer.js';
import {  addUserPosts, getAllPosts, getEditPost, getUserPost, updateUserPost } from '../controller/postController.js';
import { addProfilePicture, addUserBio, followUser, getAllUsers, getUserBio, registerUser,unFollowUser,uptadeUserBio,userLogin } from '../controller/userController.js';
import { verifyToken } from '../middlewares/authentication.js';


const router=express.Router();


router.post('/signup',registerUser);
router.post('/login',userLogin)
router.post('/addPosts',verifyToken,upload.single('image'),addUserPosts);

router.get('/users',verifyToken,getAllUsers)
router.get('/userPosts/:id',verifyToken,getUserPost);

router.get('/posts/:id',verifyToken,getAllPosts);
router.get('/editPost/:id',verifyToken,getEditPost)

router.put('/updatePost/:id',verifyToken,upload.single('image'),updateUserPost)

router.post('/follow',verifyToken,followUser)
router.post('/unFollow',verifyToken,unFollowUser)

router.post('/addBio',verifyToken,addUserBio)
router.get('/bio/:id',verifyToken,getUserBio)
router.put('/updatebio/:id',verifyToken,uptadeUserBio)


router.post('/profilePicture/:id',verifyToken,upload.single('image'),addProfilePicture)



export default router