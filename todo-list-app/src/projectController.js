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
const getTodoByProjectAndTitle = (projectName, todoTitle) => {
    const project = getProjectbyName(projectName);
    if(project && project.todos){
        return project.todos.find(todo => todo.title === todoTitle);
    }
    return null;
}

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
const updateTodo = (projectName, originalTodoTitle, newTitle, newDescription, newDueDate, newPriority) => {
    const project = getProjectbyName(projectName);
    
    if(project && project.todos){
        const todoIndex = project.todos.findIndex(todo => todo.title === originalTodoTitle);
        if(todoIndex !== -1){
            project.todos[todoIndex].title = newTitle;
            project.todos[todoIndex].description = newDescription;
            project.todos[todoIndex].dueDate = newDueDate;
            project.todos[todoIndex].priority = newPriority;

            saveData(allProjects);
            console.log(`task ${originalTodoTitle} inproject ${projectName} updated to ${newTitle}`);
            return true;
        }else {
            console.error(`task ${originalTodoTitle} not found in project ${projectName}for update`);
            return false;
        }
    }else {
        console.error(`project ${projectName} not found or has no todos to update`);
        return false; 
    }
};
const toggleTodoCompletion = (projectName, todoTitle, isComplete) =>{
    const project = getProjectbyName(projectName);

    if(project && project.todos){
        const todo = project.todos.find(t => t.title === todoTitle);
        if(todo){
            todo.isComplete = isComplete;
            saveData(allProjects);
            console.log(`Task ${todoTitle} in project ${projectName} masked as ${isComplete ? "Completed" : "Not Completed"}`);
            return true;
        } else{
            console.log(`Error task ${todoTitle} not found in project ${projectName}`);
            return false;
        } 
    }else {
        console.error(`error project ${projectName} not found or doesn't have tasks to complete`);
        return false;
    }
};
const deleteProject = (projectName) => {
    const initialLenght = allProjects.length;
    allProjects = allProjects.filter(project => project.name !== projectName);

    if (allProjects.length < initialLenght){
        saveData(allProjects);
        console.log(`project ${projectName} deleted with success`);
        return true;
    } else {
        console.error(`error project ${projectName} not found to delete`);
        return false;
    }
};
const deleteTodo = (projectname,todoTitle) => {
    const project = getProjectbyName(projectname);

    if(project && project.todos) {
        const initialLenght = project.todos.length;
        project.todos = project.todos.filter(todo => todo.title !== todoTitle);

        if(project.todos.length < initialLenght){
            saveData(allProjects);
            console.log(`task ${todoTitle} deleted from the project ${projectname}`);
            return true;
        }else{
            console.error(`error task ${todoTitle} not found in the project ${projectName}`);
            return false;
        }
    }else {
        console.error(`error project ${projectname} not found or doesn't have a task`);
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
export {allProjects, addProject, addTodoToProject, getProjectbyName, updateProject, getTodoByProjectAndTitle,updateTodo, toggleTodoCompletion, deleteProject, deleteTodo};