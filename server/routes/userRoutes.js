import express from 'express'
import { addUserPosts } from '../controller/postController.js';
import { registerUser,userLogin } from '../controller/userController.js';

const router=express.Router();


router.post('/signup',registerUser);
router.post('/login',userLogin)
router.post('/addPosts/:id',addUserPosts)



export default router