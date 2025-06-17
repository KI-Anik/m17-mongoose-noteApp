import express, { Request, Response } from "express"
import { Note } from "../models/notes.model"

export const notesRoutes = express.Router()

notesRoutes.post('/create', async (req: Request, res: Response) => {

    // approach 1
    // const myNote = new Note({
    //     title: 'TypeScript',
    //     tags: {
    //         label: 'backend'
    //     }
    // })
    // await myNote.save()

    // approach 2
    const body = req.body
    const note = await Note.create(body)

    res.status(201).json({
        success: true,
        // note: myNote
        NewNote: note
    })
})

//  get all
notesRoutes.get('/', async (req: Request, res: Response) => {
    const result = await Note.find()

    res.status(201).send(result)
})
// single get
notesRoutes.get('/:noteId', async (req: Request, res: Response) => {
    const noteId = req.params.noteId
    const result = await Note.findById(noteId)
    // const result = await Note.findOne({title : noteId})

    res.status(201).send(result)
})

notesRoutes.patch('/:noteId', async (req: Request, res: Response) => {
    const noteId = req.params.noteId
    const updatedBody = req.body;
    const result = await Note.findByIdAndUpdate(noteId, updatedBody, {new : true}) //recommended
    // const result = await Note.findOneAndUpdate({_id : noteId}, updatedBody, {new : true})
    // const result = await Note.updateOne({ _id: noteId }, updatedBody)
    res.send(result)
})

notesRoutes.delete('/:noteId', async (req: Request, res: Response) => {
    const noteId = req.params.noteId
    const result = await Note.findByIdAndDelete(noteId)
    // const result = await Note.findOneAndDelete({_id : noteId})
    // const result = await Note.deleteOne({_id : noteId})

    res.json({ message: 'deleted', result })
})