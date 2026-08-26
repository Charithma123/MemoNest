const Note = require('../Model/noteModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.getAllNotes = catchAsync(async (req, res, next) => {
    const notes = await Note.find({ userId: req.user.uid }).sort({
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

    const note = await Note.findOne({ _id: id, userId: req.user.uid });
    if (!note) return next(new AppError("Note not found", 404));

    res.status(200).json({
        status: "success",
        data: {
            note,
        }
    });
});

exports.createNote = catchAsync(async (req, res, next) => {
    const { title, content } = req.body;
    if (!title || !content) {
        return next(new AppError("Title and content are missing", 400));
    }

    const newNote = new Note({
        title,
        content,
        userId: req.user.uid,
    });
    await newNote.save();

    res.status(201).json({
        status: "success",
        data: {
            note: newNote,
        },
    });
});

exports.updateNote = catchAsync(async (req, res, next) => {
    const id = req.params.id;
    const { title, content } = req.body;

    const updatedNote = await Note.findOneAndUpdate(
        { _id: id, userId: req.user.uid },
        {
            title,
            content,
            updatedAt: Date.now(),
        },
        { new: true }
    );

    if (!updatedNote)
        return next(new AppError("Note not found", 404));

    res.status(200).json({
        status: "success",
        data: {
            note: updatedNote,
        }
    });
});

exports.deleteNote = catchAsync(async (req, res, next) => {
    const id = req.params.id;

    const deletedNote = await Note.findOneAndDelete({ _id: id, userId: req.user.uid });
    if (!deletedNote) return next(new AppError("Note not found", 404));

    res.status(204).json({
        data: null,
    });
});