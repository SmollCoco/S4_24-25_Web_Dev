<template>
    <div class="create-post">
        <h2>Create New Post</h2>
        <form @submit.prevent="handleSubmit">
            <div class="form-group">
                <label>Title:</label>
                <input v-model="title" required />
            </div>
            <div class="form-group">
                <label>Body:</label>
                <textarea v-model="body" required></textarea>
            </div>
            <div class="form-group">
                <label>Tags (comma-separated):</label>
                <input v-model="tagsInput" />
            </div>
            <button type="submit">Submit</button>
        </form>
    </div>
</template>

<script>
export default {
    data() {
        return {
            title: "",
            body: "",
            tagsInput: "",
        };
    },
    methods: {
        async handleSubmit() {
            const newPost = {
                title: this.title,
                body: this.body,
                tags: this.tagsInput.split(",").map((tag) => tag.trim()),
            };

            await fetch("http://localhost:3000/posts", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newPost),
            });

            this.$router.push("/");
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
