export default function getPosts() {
    return fetch("http://localhost:3000/posts")
        .then((res) => res.json())
        .catch((error) => console.error("Error fetching posts:", error));
}
