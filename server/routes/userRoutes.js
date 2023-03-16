import express from 'express'
import upload from '../config/multer.js';
import {  addUserPosts, getAllPosts, getUserPost } from '../controller/postController.js';
import { registerUser,userLogin } from '../controller/userController.js';
import { verifyToken } from '../middlewares/authentication.js';


const router=express.Router();


router.post('/signup',registerUser);
router.post('/login',userLogin)
router.post('/addPosts',verifyToken,upload.single('image'),addUserPosts);


router.get('/userPosts/:id',verifyToken,getUserPost);
router.get('/posts',verifyToken,getAllPosts)



export default router