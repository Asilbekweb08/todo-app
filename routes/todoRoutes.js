const express = require('express');
const router = express.Router();
const Todo = require('../models/postmodel');

// Get all todos
router.get('/', async (req, res) => {
    try {
        const todos = await Todo.find();
        res.json(todos);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Create  new todo
router.post('/', async (req, res) => {
    const todo = new Todo({
        title: req.body.title,
        completed:req.body.completed // for success tasks
    });
    try {
        const newTodo = await todo.save();
        res.status(201).json(newTodo);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete  todo
router.delete('/:id', async (req, res) => {
    try {
        const todo = await Todo.findById(req.params.id);
        if (todo == null) {
            return res.status(404).json({ message: 'Todo not found' });
        }
        await todo.deleteOne()
        res.json({ message: 'Todo removed' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});
router.put('/:id', async (req, res) => {
    try {
        const todo = await Todo.findById(req.params.id);
        console.log(todo);
        if (!todo) {
            return res.status(404).json({ message: 'Todo not found' });
        }

        todo.title = req.body.title !== undefined ? req.body.title : todo.title;
        todo.completed = req.body.completed !== undefined ? req.body.completed : todo.completed;

        const updatedTodo = await todo.save();
        res.json(updatedTodo);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;
