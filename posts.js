async function fetchPosts() {
    try {   
        const postsResponse = await fetch("https://jsonplaceholder.typicode.com/posts");
        const posts = await postsResponse.json();
        return posts
    }
    catch (error) {
        console.log(error);
    }
}


export default fetchPosts();