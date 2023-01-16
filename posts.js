async function fetchPosts() {
    try {
        const postsResponse = await fetch("https://hickory-quilled-actress.glitch.me/computers");
        const posts = await postsResponse.json(); // need convertion form json to javaScript object
        return posts;
    } catch (error) {
        console.log(error)
    }
}

export default fetchPosts;



// const postsTest = await fetch("https://hickory-quilled-actress.glitch.me/") 
// const postsImg = await postsImg.json();