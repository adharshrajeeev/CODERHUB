import express from 'express'
import { adminLogin, getAllUsers } from '../controller/adminController.js';
const router=express.Router();




router.post('/login',adminLogin)
router.get('/allUsers',getAllUsers)


export default router