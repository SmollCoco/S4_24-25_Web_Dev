export default function getPost(id) {
    return fetch(`http://localhost:3000/posts/${id}`)
        .then((res) => res.json())
        .catch((error) => console.error("Error fetching post:", error));
}
