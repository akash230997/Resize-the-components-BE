const mongoose = require('mongoose');

const Dataschema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Please add some data there!"]
        },
        quantity: {
            type: Number,
            required: true,
            default: 0
        }
    }
);

const DataModal = mongoose.model("dataModal", Dataschema);
module.exports = DataModal;

