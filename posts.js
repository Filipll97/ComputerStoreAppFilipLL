// This code fetch data from a API and converts response object to a javascript object witch is then exported  
async function fetchPosts() {
    try {
        const postsResponse = await fetch("https://hickory-quilled-actress.glitch.me/computers");
        const posts = await postsResponse.json();
        return posts;
    } catch (error) {
        console.log(error)
    }
}

export default fetchPosts;