const Journal = require('../Model/journalModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.getAllJournals = catchAsync(async (req, res, next) => {
    const journals = await Journal.find({ userId: req.user.uid }).sort({ createdAt: -1 });
    res.status(200).json({ status: "success", data: { journals } });
});

exports.getJournalById = catchAsync(async (req, res, next) => {
    const journal = await Journal.findOne({ _id: req.params.id, userId: req.user.uid });
    if (!journal) return next(new AppError("Journal entry not found", 404));
    res.status(200).json({ status: "success", data: { journal } });
});

exports.createJournal = catchAsync(async (req, res, next) => {
    const { mood, prompt, content, images } = req.body;
    if (!mood || !content) return next(new AppError("Mood and content are required", 400));

    const newJournal = new Journal({
        mood,
        prompt: prompt || "",
        content,
        images: images || [],
        userId: req.user.uid,
    });
    await newJournal.save();

    res.status(201).json({ status: "success", data: { journal: newJournal } });
});

exports.updateJournal = catchAsync(async (req, res, next) => {
    const { mood, content, images } = req.body;

    const updatedJournal = await Journal.findOneAndUpdate(
        { _id: req.params.id, userId: req.user.uid },
        { mood, content, images, updatedAt: Date.now() },
        { new: true }
    );

    if (!updatedJournal) return next(new AppError("Journal entry not found", 404));
    res.status(200).json({ status: "success", data: { journal: updatedJournal } });
});

exports.deleteJournal = catchAsync(async (req, res, next) => {
    const deleted = await Journal.findOneAndDelete({ _id: req.params.id, userId: req.user.uid });
    if (!deleted) return next(new AppError("Journal entry not found", 404));
    res.status(204).json({ data: null });
});