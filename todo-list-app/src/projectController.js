import { Todo } from "./todo";
import { Project } from "./project";
import { saveData, loadData } from "./storageManager";

let allProjects = loadData();

if(allProjects.length === 0){
    const defaultProject = new Project("Default Project");
    allProjects.push(defaultProject);
    saveData(allProjects);
}
const getProjectbyName = (projectName) =>{
    return allProjects.find(project => project.name === projectName);
};

const updateProject = (originalName, newName, newStartDate = "", newFinalDate = "") => {
    const projectIndex = allProjects.findIndex(project => project.name === originalName);

    if(projectIndex !== -1){
        allProjects[projectIndex].name = newName;
        allProjects[projectIndex].startDate = newStartDate;
        allProjects[projectIndex].finalDate = newFinalDate;

        saveData(allProjects);
        console.log(`project ${originalName} updated to ${newName}`);
        return true;
    } else {
        console.error(`project ${originalName} not found fo update`);
        return false;
    }
};



const addProject = (projectName, startDate = "", finalDate = "") => {
    const newProject = new Project(projectName, startDate, finalDate);
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
export {allProjects, addProject, addTodoToProject, getProjectbyName, updateProject};