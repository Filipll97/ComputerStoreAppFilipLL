let currentPost = [];

const getPosts = () => {
    console.log(...currentPost, "Ask about how you destructure the promise without the ... operator!")
    return [...currentPost];
}

const setPost = (posts) => {
    currentPost = posts;
};

const postsView = {
    getPosts,
    setPost
};

export default postsView
