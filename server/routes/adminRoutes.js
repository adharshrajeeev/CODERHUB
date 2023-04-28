import express from 'express'
import { adminLogin, changePostStatus, changeUserStatus, deleteUserPosts, getAllReportedPost, getAlluserPosts, getAllUsers, getMonthWiseUserGrowth } from '../controller/adminController.js';
import { adminVerification } from '../middlewares/adminAuth.js';

const router=express.Router();




router.post('/login',adminLogin)
router.get('/allUsers',adminVerification,getAllUsers)
router.get('/allPosts',adminVerification,getAlluserPosts)
router.put('/changeStatus',adminVerification,changeUserStatus)
router.get('/reportedPosts',adminVerification,getAllReportedPost)
router.put('/postStatus',adminVerification,changePostStatus)
router.patch('/deletePost/:id',adminVerification,deleteUserPosts)
router.get('/monthWiseUser',adminVerification,getMonthWiseUserGrowth)


export default router