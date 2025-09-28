const express= require('express');
//lets front and back end communicate
const cors= require('cors');

//creates express app object
const app= express();
//backend listens here
const PORT= 3000;

//allow cross origin resource sharing
app.use(cors());
//helps objects go to strings when front and back communicate
app.use(express.json());

//task list
let tasks= [];

//GET the to-dos from the user
//defines the get endpoint at /toDos
app.get('/tasks', (req, res) => {
    res.json(tasks);
});

//POST a to-do 
//post endpoint
app.post('/tasks', (req, res) => {
    //gets descritption and completed from the request body
    //completed default is false
    const {description, completed= false}= req.body;

    //responds with Bad Request error if no description of to-do given
    if(!description) {
        return res.status(400).json({error: "Description needed"});
    }

    //creates a to-do with an id, the description, and completed and adds it to the list.
    const task= {id: Date.now().toString(), description, completed};
    tasks.push(task);
    //sends toDo to frontend to get updated
    res.json(task);
});

//PUT update a task
//defines the put endpoint
app.put('/tasks/:id', (req, res) => {
    //pulls the id from the URL
    const {id}= req.params;
    //request body now has different 
    const {description, completed}= req.body;

    //finds the task with that index, if doesn't exist (-1) returns not found error
    const index= tasks.findIndex(t => t.id === id);
    if (index=== -1) return res.status(404).json({error: "Not found"});

    //updates the fields with the ones sent to the server
    if (description !== undefined) tasks[index].description= description;
    if (completed !== undefined) tasks[index].completed= completed;

    //sends the updated task back
    res.json(tasks[index]);
});

//DELETE a to-do
//defines the delete endpoint
app.delete('/tasks/:id', (req, res) => {
    //removes the task that matches id
    tasks= tasks.filter(t => t.id !== req.params.id);
    //respons with success
    res.json({success: true});
});

//starts the express server
app.listen(PORT, () => {
    //shows where the server is running 
    console.log(`Server running on http://localhost:${PORT}/tasks`);
});
