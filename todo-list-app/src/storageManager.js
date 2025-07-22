import { Todo } from "./todo";
import { Project } from "./project";

const STORAGE_KEY = "toDoProjects";

const saveData = (projects) => {
    try {
        const projectsJSON = JSON.stringify(projects);

        localStorage.setItem(STORAGE_KEY, projectsJSON);
        console.log("Saved data with success in localStorage");
    } catch (error) {
        console.error("Error to save data in localStorage:", error);
        alert("Error to save data in localStorage, please contact support");
    }
};
const loadData = () => {
    try {
        const projectsJSON = localStorage.getItem(STORAGE_KEY);

        if (!projectsJSON) {
            console.log("Nothing found in localStorage. Returning default data.");
            return[];
        }

        const plainProjects = JSON.parse(projectsJSON);
        const loadedProjects = plainProjects.map(plainProject => {
            const newProject = new Project(
                plainProject.name,
                plainProject.startDate,
                plainProject.finalDate

            );

            newProject.todos = plainProject.todos.map(plainTodo => {
                const newTodo = new Todo(
                    plainTodo.title,
                    plainTodo.description,
                    plainTodo.dueDate,
                    plainTodo.priority
                );
                newTodo.isComplete = plainTodo.isComplete;
                return newTodo;
            });
            return newProject;
        });
        console.log("successfully loaded data from localStorage");
        return loadedProjects;
    } catch (error) {
        console.error("Error to load data from localStorage:", error);
        return [];
    }
};
export {saveData, loadData };