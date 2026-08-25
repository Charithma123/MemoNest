const Note = require('../Model/noteModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
// funactions create , update, delete

exports.getAllNotes = catchAsync(async (req, res, next) => {
    const notes = await Note.find().sort({
        createdAt: -1,
    });

    res.status(200).json({
        status: "success",
        data: {
            notes,
        },
    });

});

exports.getNoteById = catchAsync(async (req, res, next) => {

    const id = req.params.id;
    if (!id) return next(new AppError("No Note Found", 404));

    const note = await Note.findById(id);
    res.status(200).json({
        status:"success",
        data:{
            note,
        }
    });
});

exports.createNote = catchAsync(async (req, res, next) => {
   const {title,content}=req.body;
   if(!title || !content) {
    return next(new AppError("Title and content are missing", 400));
}

const newNote = new Note({
    title,
    content
})
await newNote.save();

res.status(201).json({
    status:"success",
    data:{
       note: newNote,
    },
});
});

exports.updateNote = catchAsync(async(req,res,next)=>{
    const id = req.params.id;
    const {title,content} = req.body;

    const updatedNote = await Note.findByIdAndUpdate(id,
        {
            title,
            content,
            updatedAt:Date.now(),

        },
        {new:true }
    );

    if(!updatedNote)
        return next(new AppError("Note not found", 404));

    res.status(200).json({
        status:"success",
        data:{
            updatedNote,
        }
    });
});

exports.deleteNote = catchAsync(async(req,res,next)=>{
    const id = req.params.id;
    await Note.findByIdAndDelete(id);

    res.status(204).json({
      
        data: null,
    });

    
});
