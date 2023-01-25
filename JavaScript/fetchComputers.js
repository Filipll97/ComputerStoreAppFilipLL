// This code fetch data from a API and converts response object to a javascript object witch is then exported  
async function fetchComputers() {
    try {
        const response = await fetch("https://hickory-quilled-actress.glitch.me/computers");
        const computers = await response.json();
        return computers;
    } catch (error) {
        console.log(error)
    }
}

export default fetchComputers;