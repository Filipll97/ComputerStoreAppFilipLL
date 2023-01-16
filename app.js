//const postContainerElement = document.getElementById("Products-laptop");

// API Section //
// async makes the function expexct to wait for a HTTP request
// fetch is a browser API, if dont specify the type of the requset the defult is GET
// await keyword makes it so fatch waits utill it complited 
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

// change html script tag to includ type="modual"
//const posts = await fetchPosts();
//const userOnePosts = posts.filter(post => post.userId === 1);
//console.log(posts)
//let computers = [];
//console.log("sssss")
/**
const userOnePosts = [];

for (let index = 0; index < posts.length; index++) {
    const post = posts[index];

    if (post.userId == 1) {
        userOnePosts.push(post);
    }
}
*/

/* Add API items to the webbsite wiht DOM */
//for (const post of userOnePosts) {
  //  const newPostElement = document.createElement("p");
   // newPostElement.innerText = post.title;
    //postContainerElement.append(newPostElement);

//}