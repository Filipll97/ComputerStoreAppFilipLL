// Get and Set functions for the data that is retrieved by the API 
let currentComputers = [];

const getComputers = () => {
    return [...currentComputers];
}

const setComputers = (computers) => {
    currentComputers = computers;
};

const computersView = {
    getComputers,
    setComputers
};

export default computersView
