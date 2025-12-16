let taskData = {}

const todo = document.getElementById('todo');
const Progress = document.getElementById('progress');
const done = document.getElementById('done');
const column = [todo,Progress,done];
let dragElement = null;
const tasks = document.querySelectorAll('.task');

if(localStorage.getItem("tasks")){
    const data = JSON.parse(localStorage.getItem("tasks"));
    for(const col in data){
        const column = document.querySelector(`#${col}`);
        data[col].forEach(task =>{
           addTask(task.title, task.desc, column);
        })
        updateTaskCount();
    }
}

function addTask(title, desc, column){
    const div = document.createElement("div")
    div.classList.add("task");
    div.setAttribute("draggable", "true")

    div.innerHTML=`
                    <h2>${title}</h2>
                    <p>${desc}</p>
                    <button>Delete</button>
    `
    column.appendChild(div)

    div.addEventListener("drag", (e)=>{
        dragElement = div;
    })

    const deleteButton = div.querySelector("button");
    deleteButton.addEventListener("click", ()=>{
        div.remove();
        updateTaskCount();
    })

    return div;
}

function updateTaskCount(){
    column.forEach(col =>{
                const tasks = col.querySelectorAll(".task");
                const count = col.querySelector(".right");
                column.forEach(col =>{
                taskData[col.id] = Array.from(tasks).map(t =>{
                    return{
                        title: t.querySelector("h2").innerText,
                        desc: t.querySelector("p").innerText
                    }
                })
                localStorage.setItem("tasks", JSON.stringify(taskData))
                count.innerText = tasks.length;
             })
             })
}



tasks.forEach(task =>{
    task.addEventListener("drag", (e)=>{
        // console.log("dragging", e);
        dragElement = task;
    })
})



function addDragAndDropEvents(columns) {
    columns.addEventListener('dragenter',
        (e)=>{
            e.preventDefault();
            columns.classList.add('hover-over');
        }
    );
    columns.addEventListener('dragleave',
        (e)=>{
            e.preventDefault();
            columns.classList.remove('hover-over');
        }
    )
    columns.addEventListener('dragover',
        (e)=>{
            e.preventDefault();
        }   
    );

    columns.addEventListener('drop',
        (e)=>{
             e.preventDefault();
             columns.appendChild(dragElement);
             columns.classList.remove("hover-over");
            updateTaskCount();
        }
    );

}

addDragAndDropEvents(todo);
addDragAndDropEvents(Progress);
addDragAndDropEvents(done); 

// hamesha code esa likho ki behenchod bhi samajh jaye

// modal related logic

const toggleModalButton = document.querySelector("#toggle-modal")
const modalBg = document.querySelector(".modal .bg")
const modal = document.querySelector(".modal");
const addTaskButton = document.querySelector("#add-new-task")

modalBg.addEventListener("click",()=>{
    modal.classList.remove("active")
})

addTaskButton.addEventListener("click",()=>{
    const taskTitle = document.querySelector("#task-title-input")
    const taskDes = document.querySelector("#task-description-input")

addTask(taskTitle.value, taskDes.value, todo);
        updateTaskCount();
        modal.classList.remove("active")
})

toggleModalButton.addEventListener("click",()=>{
    modal.classList.toggle("active")
})

// functionalies jo banayi hai

