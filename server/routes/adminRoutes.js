import express from 'express'
import { adminLogin, changeUserStatus, getAlluserPosts, getAllUsers } from '../controller/adminController.js';
import { adminVerification } from '../middlewares/adminAuth.js';

const router=express.Router();




router.post('/login',adminLogin)
router.get('/allUsers',adminVerification,getAllUsers)

router.put('/changeStatus/:id',adminVerification,changeUserStatus)
router.get('/allPosts',adminVerification,getAlluserPosts)
router.patch('/deletePost/:id',adminVerification,)


export default router