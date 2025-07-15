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

                const projectNameHeading = document.createElement("h2");
                projectNameHeading.textContent = `Project: ${project.name}`;
                projectElement.appendChild(projectNameHeading);

                if (project.todos && project.todos.length > 0) {
                    const todosList = document.createElement("ul");
                    todosList.classList.add("project-todos-list");

                    project.todos.forEach(todo => {
                        const todoItem = document.createElement("li");
                        todoItem.textContent = `${todo.title} (Due: ${todo.dueDate})`;
                        todoItem.classList.add("todo-item");

                        if (todo.isComplete) {
                            todoItem.classList.add('completed');
                        }
                        todosList.appendChild(todoItem);
                    });
                    projectElement.appendChild(todosList);
                } else {
                    const noTodosMessage = document.createElement("p");
                    noTodosMessage.textContent = "Project without tasks";
                    noTodosMessage.classList.add("no-todos-message");
                    projectElement.appendChild(noTodosMessage);
                }
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
export {sideBar, projectPage, projectButton};