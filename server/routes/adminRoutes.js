import express from 'express'
import { adminLogin, changeUserStatus, getAllUsers } from '../controller/adminController.js';
const router=express.Router();




router.post('/login',adminLogin)
router.get('/allUsers',getAllUsers)
router.put('/changeStatus/:id',changeUserStatus)


export default router