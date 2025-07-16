class Project {
    constructor (name, startDate = "", finalDate = "") {
        this.name = name;
        this.todos = [];
        this.startDate = startDate;
        this.finalDate = finalDate;

    }
};
export {Project};