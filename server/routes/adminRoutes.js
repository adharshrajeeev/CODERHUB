import express from 'express'
import { adminLogin, changePostStatus, changeUserStatus                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       , getAllReportedPost, getAlluserPosts, getAllUsers, getMonthWiseUserGrowth, getMothWisePostCount, getPostDetails } from '../controller/adminController.js';
import { adminVerification } from '../middlewares/adminAuth.js';

const router=express.Router();




router.post('/login',adminLogin)
router.get('/allUsers',adminVerification,getAllUsers)
router.get('/allPosts',adminVerification,getAlluserPosts)
router.put('/changeStatus',adminVerification,changeUserStatus)
router.get('/reportedPosts',adminVerification,getAllReportedPost)
router.put('/postStatus',adminVerification,changePostStatus)
router.get('/monthWiseUser',adminVerification,getMonthWiseUserGrowth)
router.get('/monthWisePostCount',adminVerification,getMothWisePostCount)
router.get('/postDetails/:postId',adminVerification,getPostDetails)


export default router