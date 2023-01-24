// Get and Set functions for the data that is retrieved by the API 
let currentComputers = [];

const getComputers = () => {
    return [...currentComputers];
}

const setComputers = (Computers) => {
    currentComputers = computers;
};

const computerView = {
    getComputers,
    setComputers
};

export default computerView
