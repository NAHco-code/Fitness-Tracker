const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const exerciseSchema = new Schema({

    type: { type: String, required: true }, //make first field object //bug correction
    name: { type: String, required: true },
    duration: { type: Number, required: true },
    distance: Number,
    weight: Number,
    reps: Number,
    sets: Number
});

const workoutSchema = new Schema({
    day: { type: Date, default: Date.now },
    exercises: { type: [exerciseSchema] }
});

const Workout = mongoose.model("Workout", workoutSchema);

module.exports = Workout;
