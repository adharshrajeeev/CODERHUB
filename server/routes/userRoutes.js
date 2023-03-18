import express from 'express'
import upload from '../config/multer.js';
import {  addUserPosts, getAllPosts, getUserPost } from '../controller/postController.js';
import { addUserBio, followUser, getAllUsers, registerUser,unFollowUser,userLogin } from '../controller/userController.js';
import { verifyToken } from '../middlewares/authentication.js';


const router=express.Router();


router.post('/signup',registerUser);
router.post('/login',userLogin)
router.post('/addPosts',verifyToken,upload.single('image'),addUserPosts);

router.get('/users',verifyToken,getAllUsers)
router.get('/userPosts/:id',verifyToken,getUserPost);
router.get('/posts',verifyToken,getAllPosts)

router.post('/follow',verifyToken,followUser)
router.post('/unFollow',verifyToken,unFollowUser)

router.post('/addBio',verifyToken,addUserBio)


export default router