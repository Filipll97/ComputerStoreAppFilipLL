let currentPost = [];

const getPosts = () => {
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
