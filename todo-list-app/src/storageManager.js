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
export {saveData};