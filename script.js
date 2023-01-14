const taskContainer = document.getElementById("tasks")
const template = document.getElementById("task-template")
const newTaskForm = document.getElementById('new-task-form')
const newTaskInput = document.getElementById('new-task-input')
const taskCnt = document.getElementById('task-count')
const clearCompleted = document.getElementById('clear-task')
const clearAll = document.getElementById('delete-tasks')
const footer = document.getElementsByClassName('delete-stuff')

const LOCAL_STORAGE_TASK_KEY = 'lists.tasks'
let tasks = JSON.parse(localStorage.getItem(LOCAL_STORAGE_TASK_KEY)) || []

window.addEventListener('load',render())

newTaskForm.addEventListener('submit',e =>{
    e.preventDefault()
    const taskName = newTaskInput.value
    if(taskName == null || taskName === '') return
    const task = createTask(taskName)
    newTaskInput.value = null
    tasks.push(task)
    saveAndRender()
})

clearCompleted.addEventListener('click', e => {
    tasks = tasks.filter(task => !task.checked)
    saveAndRender()
})

clearAll.addEventListener('click', e =>{
    tasks = []
    console.log(tasks)
    saveAndRender()
})

taskContainer.addEventListener('click', e => {
    if (e.target.tagName.toLowerCase() === 'input') {
      const selectedTask = tasks.find(task => task.id === e.target.id)
      selectedTask.checked = e.target.checked
      
      saveAndRender()
    }
})

function createTask(taskName){
    return {id : Date.now().toString(), name : taskName, checked : false }
}
function saveAndRender(){
    save()
    render()
}

function save(){
    localStorage.setItem(LOCAL_STORAGE_TASK_KEY, JSON.stringify(tasks))
}

function render(){
    clearElement(taskContainer)

    tasks.forEach(task => {
        // console.log(task)
        const taskElement = document.importNode(template.content, true)
        const checkbox = taskElement.querySelector('input')
        checkbox.id = task.id
        checkbox.checked = task.checked
        const label = taskElement.querySelector('label')
        label.htmlFor = task.id
        label.append(task.name)
        taskContainer.appendChild(taskElement)

    });

    taskCount()
}


function taskCount(){

    const completed = tasks.filter(task => task.checked).length
    const total = tasks.length

    if(total != 0){
        taskCnt.innerText = `${completed} /${total}`
    } else{
        taskCnt.innerText = '';
    }
    toogleFooter()
}

function toogleFooter() {
    if (tasks.length == 0) {
        footer[0].style.display = "none";
    } else {
        footer[0].style.display = "flex";
    }
}

function clearElement(element){
    while(element.firstChild){
        element.removeChild(element.firstChild)
    }
}

render()