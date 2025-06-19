import express, { Request, Response } from 'express'
import { User } from '../models/user.model';

export const userRoutes = express.Router()

userRoutes.post('/create', async (req : Request, res : Response)=>{
    console.log('user');
    const body = req.body;
    const newUser = await User.create(body)
    res.send(newUser)
})
// get single
userRoutes.get('/:userId', async(req : Request, res : Response)=>{
    const userId = req.params.userId;
    const singleUser = await User.findById(userId)
    // res.send(singleUser)
    res.status(201).json({
        message : 'Single User retrieved sucessfully',
       singleUser
    })
})
// get all
userRoutes.get('/', async (req : Request, res : Response)=>{
 const allUsers = await User.find()
//  res.send(allUser)
res.status(201).json({
    message : 'all users retrieved successfully',
    allUsers
})
})

userRoutes.patch('/update/:userId', async (req : Request, res : Response)=>{
    const userId = req.params.userId;
    const updatedBody = req.body
    const result = await User.findByIdAndUpdate(userId, updatedBody, {new : true})
    res.send(result)
})

userRoutes.delete('/delete/:userId', async(req : Request, res : Response)=>{
    const userId = req.params.userId;
    const deletedUser = await User.findByIdAndDelete(userId)
    // res.send(deleteUser)
    res.status(201).json({
        message : 'deleted',
        deletedUser: deletedUser
    })
})