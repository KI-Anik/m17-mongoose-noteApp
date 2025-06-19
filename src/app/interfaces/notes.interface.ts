export interface Inotes {
    title : String,
    content : String,
    category : String,
    pinned : Boolean,
    tags: {
        label : String,
        color : String
    },
}