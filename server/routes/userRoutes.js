import express from 'express'
import { registerUser,userLogin } from '../controller/userController.js';

const router=express.Router();


router.post('/signup',registerUser);
router.post('/login',userLogin)



export default router