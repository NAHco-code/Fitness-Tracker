const mongoose = require("mongoose");

const Schema = mongoose.Schema;
// *NOTE: reference seed file to understand how to write model definition


// *NOTE: exerciseSchema is a sub-field of workoutSchema
//        thus, able to condense to one model file
//        -- define sub-field first in order to reference in workoutSchema
const exerciseSchema = new Schema({

    type: { type: String, required: true }, //make first field object //bug work-around
    name: { type: String, required: true },
    duration: { type: Number, required: true },
    distance: Number,
    weight: Number,
    reps: Number,
    sets: Number
});

const workoutSchema = new Schema({
    day: { type: Date, default: Date.now },
    exercises: { type: [exerciseSchema]}
});

const Workout = mongoose.model("Workout", workoutSchema);

module.exports = Workout;
