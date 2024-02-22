const express = require ('express');
const cors = require ('cors');
const bodyParser = require ('body-parser');

const app = express();
const port = 40000;

app.use(cors());
app.use(bodyParser.json());

let tasks = [
    { id: "1", title: "Element 1", status: "Save" }
];

app.all('*', function (req, res, next) {

    res.header('Access-Control-Allow-Origin', '*');
  
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  
    res.header('Access-Control-Allow-Headers', 'Content-Type');
  
    next();
  
  });

app.get('/tasks', (req, res) => {
 res.json(tasks);
});

app.get('/tasks/:id', (req, res) => {
 const taskId = req.params.id;
 const task = tasks.find(task => task.id === taskId);
 if (!task) {
   return res.status(404).json({ error: 'Task not found' });
 }
 res.json(task);
});

app.post('/tasks', (req, res) => {
 const { title, status } = req.body;
 if (!title || !status) {
   return res.status(400).json({ error: 'Title and status are required' });
 }
 const newTask = {
   id: String(tasks.length + 1),
   title,
   status
 };
 tasks.push(newTask);
 res.status(201).json(newTask);
});

app.put('/tasks/:id', (req, res) => {
 const taskId = req.params.id;
 const { title, status } = req.body;
 const taskIndex = tasks.findIndex(task => task.id === taskId);
 if (taskIndex === -1) {
   return res.status(404).json({ error: 'Task not found' });
 }
 if (title) {
   tasks[taskIndex].title = title;
 }
 if (status) {
   tasks[taskIndex].status = status;
 }
 res.json(tasks[taskIndex]);
});

app.delete('/tasks/:id', (req, res) => {
 const taskId = req.params.id;
 const taskIndex = tasks.findIndex(task => task.id === taskId);
 if (taskIndex === -1) {
   return res.status(404).json({ error: 'Task not found' });
 }
 tasks.splice(taskIndex, 1);
 res.sendStatus(204);
});
app.listen(port, () => {
 console.log(`Server is running on http://localhost:${port}`);
});