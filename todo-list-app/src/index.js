import { Project } from "./project";
import { Todo } from "./todo";
import { sideBar, projectPage, projectButton } from "./uiController";
import { addProject, addTodoToProject, allProjects } from "./projectController";


if (allProjects.length === 0) {
    console.log("Creating default project. nothing found  to load");
    addProject("My Tasks");
}
console.log("Projects loaded/initialized:", allProjects);

sideBar();
projectButton();


projectPage(allProjects);

