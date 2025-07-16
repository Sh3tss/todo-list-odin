import "./stylesheet.css";
import { sideBar, projectPage, projectButton,hideProjectModal, showProjectModal, modalProject, modalTask, showTaskModal, hideTaskModal, setupListeners} from "./uiController";
import { addProject, addTodoToProject, allProjects } from "./projectController";


if (allProjects.length === 0) {
    console.log("Creating default project. nothing found  to load");
    addProject("My Tasks");
}
console.log("Projects loaded/initialized:", allProjects);

sideBar();
const newProjBtn = projectButton();
modalProject();
modalTask();

projectPage(allProjects);
setupListeners();

if (newProjBtn) {
    newProjBtn.addEventListener('click', () => {
        showProjectModal();
    });
} else {
    console.error("button doesn't exist");
}



