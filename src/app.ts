import express, { Application, Request, Response } from 'express'
import { model, Schema } from 'mongoose'


const app: Application = express()
app.use(express.json())

const noteSchema = new Schema(
    {
        title: { type: String, required: true, trim: true },
        content: { type: String, default: '' },
        category: {
            type: String,
            category: ["personal", "work", "study"],
            default: 'personal'
        },
        pinned: { type: Boolean, default: false },
        tags: {
            label: { type: String, required: true },
            color: { type: String, default: 'green' }
        }
    },
    {
        versionKey: false, //removing _v field
        timestamps: true // add createdAt and updatedAt
    },

)

const Note = model('Note', noteSchema)

app.post('/notes/create', async (req: Request, res: Response) => {

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
app.get('/notes', async (req: Request, res: Response) => {
    const result = await Note.find()

    res.status(201).send(result)
})
// single get
app.get('/notes/:noteId', async (req: Request, res: Response) => {
    const noteId = req.params.noteId
    const result = await Note.findById(noteId)
    // const result = await Note.findOne({title : noteId})

    res.status(201).send(result)
})

app.patch('/notes/:noteId', async (req: Request, res: Response) => {
    const noteId = req.params.noteId
    const updatedBody = req.body;
    const result = await Note.findByIdAndUpdate(noteId, updatedBody, {new : true}) //recommended
    // const result = await Note.findOneAndUpdate({_id : noteId}, updatedBody, {new : true})
    // const result = await Note.updateOne({ _id: noteId }, updatedBody)
    res.send(result)
})

app.delete('/notes/:noteId', async (req: Request, res: Response) => {
    const noteId = req.params.noteId
    const result = await Note.findByIdAndDelete(noteId)
    // const result = await Note.findOneAndDelete({_id : noteId})
    // const result = await Note.deleteOne({_id : noteId})

    res.json({ message: 'deleted', result })
})

app.get('/', (req: Request, res: Response) => {
    res.send('Welcome to Note app')
})

export default app 