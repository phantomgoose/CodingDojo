const mongoose = require("mongoose");
const Task = mongoose.model("Task");

module.exports = {
    list: (req, res) => {
        Task.find((err, tasks) => {
            err ? console.log(err.message) : res.json(tasks);
        });
    },
    retrieve: (req, res) => {
        Task.findOne(req.params, (err, task) => {
            err ? console.log(err.message) : res.json(task);
        })
    },
    create: (req, res) => {
        console.log(req.body);
        let task = new Task(req.body);
        task.save((err) => {
            err ? console.log(err.message) : res.json(task);
        });
    },
    replace: (req, res) => {
        Task.findOneAndUpdate(req.params, req.body, (err, task) => {
            err ? console.log(err.message) : res.json(task);
        })
    },
    delete: (req, res) => {
        Task.findOneAndRemove(req.params, (err, task) => {
            err ? console.log(err.message) : res.json(task);
        })
    }
};
