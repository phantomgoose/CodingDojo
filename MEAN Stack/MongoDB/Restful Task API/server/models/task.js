const mongoose = require("mongoose");

const CounterSchema = new mongoose.Schema({
    count: { type: Number, default: 0 }
});
const Counter = mongoose.model("counter", CounterSchema);

const TaskSchema = new mongoose.Schema(
    {
        id: { type: String },
        title: { type: String, required: true },
        description: { type: String, default: "" },
        completed: { type: Boolean, default: false }
    },
    { timestamps: true }
);

TaskSchema.pre("save", function(next) {
    this.numeric_id = 10;
    next();
});

TaskSchema.pre("save", function(next) {
    let doc = this;
    Counter.findByIdAndUpdate(
        { _id: "TaskSchemaID" },
        { $inc: { count: 1 } },
        { upsert: true },
        (err, counter) => {
            if (err) {
                console.log(err.message);
                return next(err);
            } else {
                doc.id = counter.count;
                console.log(doc);
                next();
            }
        }
    );
});

mongoose.model("Task", TaskSchema);
