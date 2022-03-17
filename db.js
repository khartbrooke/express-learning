const mongoose = require("mongoose");

const Schema = mongoose.Schema;

mongoose.connect("mongodb://localhost:27017/tyranid", {
    useNewUrlParser: true
});

const tyranidSchema = new Schema({
    name: {
        type: String,
        required: true,
        minlength: 2
    },
    hiveFleet: {
        type: String,
        required: true,
        minlength: 2
    },
    points: {
        type: Number,
        required: true,
        min: 0,
        max: 1000
    },
});

module.exports = mongoose.model("Tyranid", tyranidSchema);