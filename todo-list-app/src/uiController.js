import { addProject } from "./projectController";
import { allProjects, addTodoToProject,getProjectbyName, updateProject, getTodoByProjectAndTitle, updateTodo,toggleTodoCompletion} from "./projectController";

const sideBar = () => {
    const sideContainer = document.getElementById("sideBar-menu");
    if (sideContainer) {
        sideContainer.innerHTML = "";

        const sideTitle = document.createElement("h2");
        sideTitle.classList.add("side-title");
        sideTitle.textContent = "My tasks";

        const sideMenu = document.createElement("div");
        sideMenu.classList.add("side-menu");

        //buttons of the sidebar the "menu" part
        const allButton = document.createElement("button");
        allButton.classList.add("menubtn");
        allButton.textContent = "All Tasks"

        const weekButton = document.createElement("button");
        weekButton.classList.add("menubtn");
        weekButton.textContent = "Week Tasks"

        const montButton = document.createElement("button");
        montButton.classList.add("menubtn");
        montButton.textContent = "Month Tasks"

        const compButton = document.createElement("button");
        compButton.classList.add("menubtn");
        compButton.textContent = "Completed Tasks"

        // CORRIGIDO: Criação correta do botão nComButton
        const nComButton = document.createElement("button");
        nComButton.classList.add("menubtn");
        nComButton.textContent = "Non-Completed Tasks"

        //contianer to keep the task pat in side bar
        const taskContainer = document.createElement("div");
        taskContainer.classList.add("task-container");

        //main container
        sideContainer.appendChild(sideTitle);
        sideContainer.appendChild(sideMenu);
        sideContainer.appendChild(taskContainer);

        //menu container
        sideMenu.appendChild(allButton);
        sideMenu.appendChild(weekButton);
        sideMenu.appendChild(montButton);
        sideMenu.appendChild(compButton);
        sideMenu.appendChild(nComButton);
    } else {
        console.error("Element with ID 'sideBar-menu' not found in the DOM");
    }
};

const projectButton = () => {
    const pageButtonContainer = document.getElementById("project-bar");

    if (!pageButtonContainer) {
        console.error("Element with ID 'project-bar' not found in the DOM");
        return null;
    }
    pageButtonContainer.innerHTML = "";

    const pageButtonDiv = document.createElement("div");
    pageButtonDiv.classList.add("pageBtn-div");

    const pagebutton = document.createElement("button");
    pagebutton.classList.add("page-button");
    pagebutton.textContent = "New Project";

    pageButtonDiv.appendChild(pagebutton);
    pageButtonContainer.appendChild(pageButtonDiv);

    return pagebutton;
};

const modalProject = () => {
    console.log("DEBUG: modalProject function called."); 
    const modalContainer = document.getElementById("project-modal-overlay");
    if (!modalContainer) {
        console.error("Element with ID 'project-modal-overlay' not found in the DOM");
        return;
    }
    const newProjectForm = document.getElementById("new-project-form");
    if (!newProjectForm){
        console.error("form with id 'new-project-form' not found");
        return;
    }
    let isSubmittingProject = false; 

    const submitProjectHandler = (event) => {
        event.preventDefault();
        if (isSubmittingProject) { 
            console.log("DEBUG: Project form already submitting. Ignoring second trigger.");
            return; 
        }
        isSubmittingProject = true; 

        const projectNameInput = document.getElementById("project-name");
        if (!projectNameInput) {
            console.error("Input 'project-name' not found in the DOM.");
            isSubmittingProject = false;
            return;
        }

        const projectName = projectNameInput.value.trim();

        console.log("DEBUG - projectName (after trim) to validate the project:", projectName);

        if (projectName === "") { 
            alert("Project Name cannot be empty. Please enter a name.");
            isSubmittingProject = false;
            return;
        }

        const startDateInput = document.getElementById("start-date"); 
        const finalDateInput = document.getElementById("final-date"); 

        const startDate = startDateInput ? startDateInput.value : ''; 
        const finalDate = finalDateInput ? finalDateInput.value : ''; 

        const originalProjectName = newProjectForm.dataset.editingProjectName;

        if(originalProjectName){
            console.log(`debug updating project ${originalProjectName} to new name ${projectName}`);
            updateProject(originalProjectName, projectName,startDate,finalDate);
        } else {
            console.log (`debug creating new project ${projectName}`);
            addProject(projectName, startDate,finalDate);
        }

        hideProjectModal();
        newProjectForm.reset();
        delete newProjectForm.dataset.editingProjectName;
        projectPage(allProjects);

        console.log(`Project "${projectName}" created`);
        console.log("start date", startDate);
        console.log("final date", finalDate);

        isSubmittingProject = false; 
    };
    if (newProjectForm._submitHandlerProject) { 
        newProjectForm.removeEventListener('submit', newProjectForm._submitHandlerProject);
        console.log("DEBUG: Removed old project form submit listener.");
    }
    newProjectForm.addEventListener('submit', submitProjectHandler);
    newProjectForm._submitHandlerProject = submitProjectHandler; 

    const cancelProjectModalBtn = document.getElementById("cancelProjectbtn");
    if(!cancelProjectModalBtn){
        console.error("Element with id 'cancelProjectbtn' not found"); 
        return;
    }
    const cancelProjectHandler = () => {
        hideProjectModal();
        newProjectForm.reset();
        console.log("cancel project button pressed"); 
    };
    if (cancelProjectModalBtn._cancelHandlerProject) {
        cancelProjectModalBtn.removeEventListener('click', cancelProjectModalBtn._cancelHandlerProject);
        console.log("DEBUG: Removed old project cancel button listener.");
    }
    cancelProjectModalBtn.addEventListener('click', cancelProjectHandler);
    cancelProjectModalBtn._cancelHandlerProject = cancelProjectHandler;
};
const showProjectModal = () =>{
    const appearModalProject = document.getElementById("project-modal-overlay");
    if(appearModalProject){
        const submitButton = document.getElementById("createProjectbtn");
        if(submitButton){
            submitButton.textContent = "Create Project";
        }else{
            console.warm("warn createprojectbtn not found to text change in create parte");
        }


        const newProjectForm = document.getElementById("new-project-form");
        if(newProjectForm && newProjectForm.dataset.editingProjectName){
            delete newProjectForm.dataset.editingProjectName;
        }
        appearModalProject.classList.remove("hidden"); 
    }else {
        console.error("Modal overlay not found to show");
    }
};
const hideProjectModal = () =>{
    const hiddenModalProject = document.getElementById("project-modal-overlay");
    if(hiddenModalProject){
        hiddenModalProject.classList.add("hidden");
    } else{
        console.error("modal overlay not found to hide");
    }
};
const showProjectModalForEdit = (projectName) => {
    console.log(`preparing to edit project ${projectName}`);
    const projectToEdit = getProjectbyName(projectName);
    if(!projectToEdit){
        console.error(`project with name ${projectName} not found for editing`)
        alert(`error: project ${projectName} not found`);
        return;
    }

    const projectNameInput = document.getElementById("project-name");
    const startDateInput = document.getElementById("start-date");
    const finalDateInput = document.getElementById("final-date");
    if(projectNameInput){
        projectNameInput.value = projectToEdit.name;
    }
    if(startDateInput){
        startDateInput.value = projectToEdit.startDate || "";
        if(projectToEdit.startDate){
            console.log("debug startdaatenput filled with", projectToEdit.startDate);
        } else {
            console.log("debug projecttoedit.startdate is empty or undefined");
        }
    } else {
        console.warn("warn startdateinput element not found in dom");
    }
    if (finalDateInput) {
        console.log("DEBUG: projectToEdit.finalDate value:", projectToEdit.finalDate);
        
        finalDateInput.value = projectToEdit.finalDate || ''; 
        if (projectToEdit.finalDate) {
            console.log("DEBUG: finalDateInput filled with:", projectToEdit.finalDate);
        } else {
            console.log("DEBUG: projectToEdit.finalDate is empty or undefined. finalDateInput cleared.");
        }
    } else {
        console.warn("WARN: finalDateInput element not found in DOM.");
    }
    showProjectModal();

    const newProjectForm = document.getElementById("new-project-form");
    if(newProjectForm){
        newProjectForm.dataset.editingProjectName = projectName;
    }
    const submitButton = document.getElementById("createProjectbtn");
    if(submitButton){
        submitButton.textContent = "Edit Project";
    }else{
        console.warn("warn createprojectbrn not found fo text change in edit mode");
    }
};
const projectPage = (projects) => {
    const pageContainer = document.getElementById("project-page");
    if (pageContainer) {
        pageContainer.innerHTML = ""; 

        if (projects.length > 0) {
            const projectsListContainer = document.createElement("div");
            projectsListContainer.classList.add("projects-list"); 

            projects.forEach(project => {
                const projectElement = document.createElement("div");
                projectElement.classList.add("project-card"); 
                projectElement.dataset.projectName = project.name;

                const projectNameHeading = document.createElement("h2");
                projectNameHeading.textContent = `Project: ${project.name}`;
                projectElement.appendChild(projectNameHeading);

                if(project.startDate){
                    const startDateParagraph = document.createElement("p");
                    startDateParagraph.classList.add("project-date");
                    startDateParagraph.textContent = `Start Date: ${project.startDate}`;
                    projectElement.appendChild(startDateParagraph);
                }
                if(project.finalDate){
                    const finalDateParagraph = document.createElement("p");
                    finalDateParagraph.classList.add("project-date");
                    finalDateParagraph.textContent = `Findal Date: ${project.finalDate}`;
                    projectElement.appendChild(finalDateParagraph);
                }

                if (project.todos && project.todos.length > 0) {
                    const todosList = document.createElement("ul");
                    todosList.classList.add("project-todos-list");

                    project.todos.forEach(todo => {
                        const todoItem = document.createElement("li");
                        todoItem.textContent = `${todo.title} (Due: ${todo.dueDate})`;
                        todoItem.classList.add("todo-item");

                        const completeCheckBox = document.createElement("input");
                        completeCheckBox.type = "checkbox";
                        completeCheckBox.classList.add("complete-todo-checkbox");
                        completeCheckBox.checked = todo.isComplete;
                        completeCheckBox.dataset.projectName = project.name;
                        completeCheckBox.dataset.todoTitle = todo.title;

                        todoItem.appendChild(completeCheckBox);

                        const todoTextSpan = document.createElement("span");
                        todoTextSpan.textContent = `${todo.title} (Due: ${todo.dueDate})`;
                        todoItem.appendChild(todoTextSpan);

                        if (todo.isComplete) {
                            todoItem.classList.add('completed');
                        }

                        const editTaskButton = document.createElement("button");
                        editTaskButton.classList.add("edit-task-btn");
                        editTaskButton.textContent = "Edit Task";
                        editTaskButton.dataset.projectName = project.name;
                        editTaskButton.dataset.todoTitle = todo.title;

                        todoItem.appendChild(editTaskButton);
                        todosList.appendChild(todoItem);
                    });
                    projectElement.appendChild(todosList);
                } else {
                    const noTodosMessage = document.createElement("p");
                    noTodosMessage.textContent = "Project without tasks";
                    noTodosMessage.classList.add("no-todos-message");
                    projectElement.appendChild(noTodosMessage);
                }
                const addTaskButton = document.createElement("button");
                addTaskButton.classList.add("add-task-btn");
                addTaskButton.textContent = "+ Add Task";
                addTaskButton.dataset.projectName = project.name;

                const editProjectButton = document.createElement("button");
                editProjectButton.classList.add("edit-project-btn");
                editProjectButton.textContent = "Edit Project";
                editProjectButton.dataset.projectName = project.name;


                projectElement.appendChild(editProjectButton);    
                projectElement.appendChild(addTaskButton);
                projectsListContainer.appendChild(projectElement);
            });
            pageContainer.appendChild(projectsListContainer);
        } else {
            const noProjectsMessage = document.createElement("p");
            noProjectsMessage.textContent = "Nothing to show. Create a new Project!";
            pageContainer.appendChild(noProjectsMessage);
        }
    } else {
        console.error("Element with ID 'project-page' not found in the DOM.");
    }
};
const setupListeners = () => {
    const mainContentArea = document.getElementById("main-content-area");
    if(!mainContentArea){
        console.error("main content area not found for dynamic listeners"); 
        return;
    }
    if (mainContentArea._dynamicClickListener) {
        mainContentArea.removeEventListener('click', mainContentArea._dynamicClickListener);
        console.log("DEBUG: Removed old main content area click listener.");
    }

    const dynamicClickListener = (event) => {
        if(!event.target || !event.target.classList){
            console.log("debug clicked on an element without classlist property");
            return;
        }
        if(event.target.classList.contains("complete-todo-checkbox")) {
            const projectName = event.target.dataset.projectName;
            const todoTitle = event.target.dataset.todoTitle;
            const isChecked = event.target.checked;

            console.log(`checkbox clicked to the task ${todoTitle} inside project ${projectName} new statuts ${isChecked ? "Completed" : "Not Completed"}`);

            toggleTodoCompletion(projectName, todoTitle, isChecked);
            projectPage(allProjects);
        }
        if(event.target.classList.contains("add-task-btn")) {
            const projectName = event.target.dataset.projectName;
            console.log(`Button Add task pressed for the project ${projectName}`);
            showTaskModal(projectName);
        }
        if(event.target.classList.contains("edit-project-btn")) {
            const projectName = event.target.dataset.projectName;
            console.log(`button edit project pressed for the project ${projectName}`);
            showProjectModalForEdit(projectName);
        }
        if(event.target.classList.contains("edit-task-btn")){
            const projectName = event.target.dataset.projectName;
            const todoTitle = event.target.dataset.todoTitle;
            showTaskModalForEdit(projectName, todoTitle);
        }
    };
    mainContentArea.addEventListener('click', dynamicClickListener);
    mainContentArea._dynamicClickListener = dynamicClickListener; 
};
const modalTask = () => {
    console.log("DEBUG: modalTask function called."); 
    const modalContainer = document.getElementById("task-modal-overlay");
    if(!modalContainer){
        console.error("element with id task-modal-overlay not found in the DOM"); 
        return;
    }
    const newTaskForm = document.getElementById("new-task-form");
    if(!newTaskForm){
        console.error("form with id new-task-form not found");
        return;
    }
    let isSubmittingTask = false; 
    const submitTaskHandler = (event) => {
        event.preventDefault();

        if (isSubmittingTask) {
            console.log("DEBUG: Task form already submitting. Ignoring second trigger.");
            return;
        }
        isSubmittingTask = true;

        const taskModalForm = document.getElementById("new-task-form");
        if (!taskModalForm) {
            console.error("Form with id 'task-modal-form' not found.");
            isSubmittingTask = false;
            return;
        }
        const taskTitleInput = document.getElementById("task-title");
        const taskDescriptionInput = document.getElementById("task-description");
        const taskDueDateInput = document.getElementById("task-due-date");
        const taskPriorityInput = document.getElementById("task-priority");

        if (!taskTitleInput) {
            console.error("Input 'task-title' not found in the DOM.");
            isSubmittingTask = false;
            return;
        }

        const title = taskTitleInput.value.trim();
        const description = taskDescriptionInput ? taskDescriptionInput.value.trim() : '';
        const dueDate = taskDueDateInput ? taskDueDateInput.value : '';
        const priority = taskPriorityInput ? taskPriorityInput.value : '';

        const projectNameForTask = taskModalForm.dataset.projectName; 
        const originalProjectNameForEdit = taskModalForm.dataset.editingProjectName; 
        const originalTodoTitle = taskModalForm.dataset.editingTodoTitle; 

        console.log("DEBUG - title (after trim) in validate task:", title);

        if (title === "") {
            alert("Task Title cannot be empty. Please enter a title.");
            isSubmittingTask = false;
            return;
        }
        if (originalTodoTitle && originalProjectNameForEdit) { 
            console.log(`DEBUG: Updating task "${originalTodoTitle}" in project "${originalProjectNameForEdit}" to new title "${title}".`);
            updateTodo(originalProjectNameForEdit, originalTodoTitle, title, description, dueDate, priority);
        } else {
            console.log(`DEBUG: Creating new task "${title}" for project "${projectNameForTask}".`);
            if (projectNameForTask === "") { 
                console.error("No project name found for task creation.");
                alert("Error: Project not identified for new task.");
                isSubmittingTask = false;
                return;
            }
            addTodoToProject(projectNameForTask, title, description, dueDate, priority);
        }

        hideTaskModal();
        taskModalForm.reset();

        delete taskModalForm.dataset.editingProjectName;
        delete taskModalForm.dataset.editingTodoTitle;
        delete taskModalForm.dataset.projectName; 

        projectPage(allProjects); 
        console.log(`Task "${title}" process completed.`);

        isSubmittingTask = false;
    };
    
    if (newTaskForm._submitHandlerTask) { 
        newTaskForm.removeEventListener('submit', newTaskForm._submitHandlerTask);
        console.log("DEBUG: Removed old task form submit listener.");
    }
    newTaskForm.addEventListener('submit', submitTaskHandler); 
    newTaskForm._submitHandlerTask = submitTaskHandler; 


    const cancelTaskBtn = document.getElementById("cancelTaskBtn");
    if(!cancelTaskBtn){
        console.error("element with id cancelTaskBtn not found"); 
        return;
    }
    const cancelTaskHandler = () => {
        hideTaskModal();
        newTaskForm.reset();
        console.log("cancel task button pressed"); 
    };
    if (cancelTaskBtn._cancelHandlerTask) {
        cancelTaskBtn.removeEventListener('click', cancelTaskBtn._cancelHandlerTask);
        console.log("DEBUG: Removed old task cancel button listener.");
    }
    cancelTaskBtn.addEventListener('click', cancelTaskHandler);
    cancelTaskBtn._cancelHandlerTask = cancelTaskHandler;
};

const showTaskModal = (projectName) => {
    const taskModalOverlay = document.getElementById("task-modal-overlay");
    if (taskModalOverlay) {
        const taskModalForm = document.getElementById("new-task-form");
        const taskModalTitle = document.getElementById("task-modal-title");
        const submitTaskButton = document.getElementById("createTaskBtn");

        if (taskModalTitle) taskModalTitle.textContent = "Create New Task";
        if (submitTaskButton) submitTaskButton.textContent = "Create Task";
        if (taskModalForm) {
            taskModalForm.reset(); 
        
            delete taskModalForm.dataset.editingProjectName;                                       
            delete taskModalForm.dataset.editingTodoTitle;
        }

        if (taskModalForm) {
            taskModalForm.dataset.projectName = projectName;
        }
        taskModalOverlay.classList.remove("hidden");
    } else {
        console.error("Task modal overlay not found to show.");
    }
};
const hideTaskModal = () =>{
    const hiddenModalTask = document.getElementById("task-modal-overlay");
    if(hiddenModalTask){
        hiddenModalTask.classList.add("hidden");
        const taskProjectNameInput = document.getElementById("task-project-name");
        if(taskProjectNameInput){
            taskProjectNameInput.value = "";
        }
    }else {
        console.error("task modal overlay not found to hide"); 
    }
};
const showTaskModalForEdit = (projectName, todoTitle) => {
    const todoToEdit = getTodoByProjectAndTitle(projectName, todoTitle);

    if(!todoToEdit){
        console.error(`error task ${todoTitle} not found in project ${projectName}`);
        alert(`error task ${todoTitle} not found`);
        return;
    }
    const taskModalForm = document.getElementById("new-task-form");
    const taskTitleInput = document.getElementById("task-title");
    const taskDescriptionInput = document.getElementById("task-description");
    const taskDueDateInput = document.getElementById("task-due-date");
    const taskPriorityInput = document.getElementById("task-priority");

    if(taskTitleInput) taskTitleInput.value = todoToEdit.title;
    if(taskDescriptionInput) taskDescriptionInput.value = todoToEdit.description;
    if (taskDueDateInput) taskDueDateInput.value = todoToEdit.dueDate;
    if(taskPriorityInput) taskPriorityInput.value = todoToEdit.priority;

    if(taskModalForm){
        taskModalForm.dataset.editingProjectName = projectName;
        taskModalForm.dataset.editingTodoTitle = todoTitle;
        console.log("debug edit task modal form dataset.editinproject name set to ", taskModalForm.dataset.editingProjectName);
        console.log("debug edit task modal form dataset.editingtodotitle set to  ", taskModalForm.dataset.editingTodoTitle);
    } else {
        console.warn("warn newtask form element not found in dom for setting data");
    }

    const taskModalTitle = document.getElementById("task-modal-title");
    if(taskModalTitle) taskModalTitle.textContent = "Edit Task";

    const submitTaskButton = document.getElementById("createTaskBtn");
    if(submitTaskButton) submitTaskButton.textContent = "Edit Task";

    const taskModalOverlay = document.getElementById("task-modal-overlay");
    if(taskModalOverlay) {
        taskModalOverlay.classList.remove("hidden");
    } else{
        console.error("tak modal overlay not found to show for edit");
    }

    
};
export {sideBar, projectPage, projectButton, hideProjectModal, showProjectModal, modalProject, setupListeners, modalTask, showTaskModal, hideTaskModal, showTaskModalForEdit};