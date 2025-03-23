import { defineStore } from "pinia";
import { ref } from "vue";

export const usePostStore = defineStore("posts", () => {
    const posts = ref([
        {
            id: 1,
            title: "Premier article",
            body: "Contenu de l'article...",
            tags: ["vue", "js"],
        },
    ]);

    const addPost = (post) => {
        posts.value.push({ ...post, id: Date.now() });
    };

    const updatePost = (updatedPost) => {
        const index = posts.value.findIndex((p) => p.id === updatedPost.id);
        if (index !== -1) posts.value[index] = updatedPost;
    };

    const deletePost = (postId) => {
        posts.value = posts.value.filter((p) => p.id !== postId);
    };

    return { posts, addPost, updatePost, deletePost };
});
