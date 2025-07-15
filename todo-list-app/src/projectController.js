import { Todo } from "./todo";
import { Project } from "./project";
import { saveData, loadData } from "./storageManager";

let allProjects = loadData();

const addProject = (projectName) => {
    const newProject = new Project(projectName);
    allProjects.push(newProject);
    saveData(allProjects);
    console.log(`Project "${projectName}" added and saved`);
};
const addTodoToProject = (projectName, title, description, dueDate, priority) => {
    const project = allProjects.find(p => p.name === projectName);

    if(project) {
        const newTodo = new Todo(title, description, dueDate, priority);
        project.todos.push(newTodo);
        saveData(allProjects);
        console.log(`Task "${title}" added to the project "${projectName}" and saved`);
    } else {
        console.error(`Project "${projectName}" not found to add the task`);
    }
};
export {allProjects, addProject, addTodoToProject};