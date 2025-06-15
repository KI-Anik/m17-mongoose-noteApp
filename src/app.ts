import express, { Application, Request, Response } from 'express'
import { model, Schema } from 'mongoose'


const app: Application = express()

const noteSchema = new Schema({
    name: String,
    content: String
})

const Note = model('Note', noteSchema)

app.post('/create', async (req: Request, res: Response) => {
    const myNote = new Note({
        name: 'Express',
        content: 'i am learning Express'
    })
    await myNote.save()

    res.status(201).json({
        success: true,
        note: myNote
    })
})

app.get('/', (req: Request, res: Response) => {
    res.send('Welcome to Note app')
})

export default app 