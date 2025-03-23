<template>
    <div class="edit-post">
        <h2>Edit Post</h2>
        <form @submit.prevent="handleSubmit" v-if="post">
            <div class="form-group">
                <label>Title:</label>
                <input v-model="post.title" required />
            </div>
            <div class="form-group">
                <label>Body:</label>
                <textarea v-model="post.body" required></textarea>
            </div>
            <div class="form-group">
                <label>Tags (comma-separated):</label>
                <input v-model="tagsInput" />
            </div>
            <button type="submit" class="pointer_on_hover">Update</button>
        </form>
        <div v-else>Loading...</div>
    </div>
</template>

<script>
import getPost from "../composables/getPost";

export default {
    props: ["id"],
    data() {
        return {
            post: null,
            tagsInput: "",
        };
    },
    async created() {
        this.post = await getPost(this.id);
        this.tagsInput = this.post.tags.join(", ");
    },
    methods: {
        async handleSubmit() {
            const updatedPost = {
                ...this.post,
                tags: this.tagsInput.split(",").map((tag) => tag.trim()),
            };

            await fetch(`http://localhost:3000/posts/${this.id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(updatedPost),
            });

            this.$router.push(`/post/${this.id}`);
        },
    },
};
</script>

<style scoped>
.create-post {
    background: white;
    padding: 2rem;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(114, 47, 55, 0.1);
    max-width: 600px;
    margin: 2rem auto;
}

h2 {
    color: var(--primary-dark);
    margin-top: 0;
}

.form-group {
    margin-bottom: 1.5rem;
}

.form-group label {
    display: block;
    margin-bottom: 0.5rem;
    color: var(--primary-dark);
    font-weight: 500;
}

button[type="submit"] {
    background-color: var(--primary-dark);
    padding: 0.75rem 1.5rem;
    font-size: 1.1rem;
    width: 100%;
}
</style>

<style scoped>
.edit-post {
    background: white;
    padding: 2rem;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(114, 47, 55, 0.1);
    max-width: 600px;
    margin: 2rem auto;
}
</style>
