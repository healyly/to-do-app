const API_URL= "http://localhost:3000/tasks";

async function getTasks() {
    //sends a get request
    const res= await fetch(API_URL);
    //reads the input as a JSON
    const tasks= await res.json();
    //gets the document/container where the list is kept
    const list= document.getElementById("taskList");
    //clears the task list each time (so no tasks are repeated)
    list.innerHTML= "";

    //loops through each object in tasks
    tasks.forEach(task => {
        //creats a new list item
        const li= document.createElement("li");
        //sets the list item's text to the description or "Untittled Task"
        li.textContent= task.description || "Untitled task";
        //checks if task is completed
        if (task.completed) li.classList.add("completed");

        //complete button
        const completeBtn= document.createElement("button");
        completeBtn.textContent= "Complete";
        completeBtn.onclick= () => updateTask(task.id, {completed: true});
        //delets the complete button if task is completed
        if (task.completed) {
            completeBtn.disabled= true;
        }

        //delete button
        const deleteBtn= document.createElement("button");
        deleteBtn.textContent= "Delete";
        deleteBtn.onclick= () => deleteTask(task.id);

        //appends the delete and complete buttons to the task
        li.appendChild(completeBtn);
        li.appendChild(deleteBtn);
        //appends the task to the list of tasks on the screen
        list.appendChild(li);
    });

}

async function addTask() {
    //geits the input from the user text input
    const input= document.getElementById("taskInput");
    //removes ending white space
    const description= input.value.trim();
    //prevents empty tasks
    if (!description) return;

    //sends a post with the input data
    await fetch(API_URL, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({description, completed: false})
    });

    //clears input after use so can be used again
    input.value= "";
    //reload task list
    getTasks();
}

async function deleteTask(id) {
    //sends a delete request and waits for it to come back
    await fetch(`${API_URL}/${id}`, {method: "DELETE"});
    //reload task list
    getTasks();
}

async function updateTask(id, updates){
    //sends a put request with the object updates and waits for it to come back
    await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(updates)
    });
    //reload task list
    getTasks();
}

//loads the tasks
getTasks();
