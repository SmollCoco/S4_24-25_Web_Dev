<template>
    <div class="post">
        <h3>{{ post.title }}</h3>
        <div class="tags">
            <span v-for="tag in post.tags" :key="tag" class="tag">{{
                tag
            }}</span>
        </div>
        <p>{{ snippet }}</p>
        <div class="actions">
            <router-link :to="`/post/${post.id}`"
                ><button class="pointer_on_hover">
                    Read more
                </button></router-link
            >
            <button @click="deletePost" class="pointer_on_hover">Delete</button>
            <router-link :to="`/editPost/${post.id}`"
                ><button class="pointer_on_hover">Edit</button></router-link
            >
        </div>
    </div>
</template>

<script>
export default {
    props: ["post"],
    computed: {
        snippet() {
            return this.post.body.substring(0, 50) + " ...";
        },
    },
    methods: {
        async deletePost() {
            if (!confirm("Are you sure you want to delete this post?")) {
                return;
            }
            await fetch(`http://localhost:3000/posts/${this.post.id}`, {
                method: "DELETE",
            });
            this.$emit("post-deleted");
        },
    },
};
</script>

<style scoped>
.post {
    background: white;
    border-radius: 8px;
    padding: 1.5rem;
    margin-bottom: 1.5rem;
    box-shadow: 0 2px 8px rgba(114, 47, 55, 0.1);
    transition: transform 0.2s ease;
}

.post:hover {
    transform: translateY(-2px);
}

h3 {
    color: var(--primary-dark);
    margin-top: 0;
}

.tags {
    margin: 1rem 0;
}

.tag {
    background-color: var(--primary-dark);
    color: white;
    padding: 0.25rem 0.75rem;
    border-radius: 20px;
    font-size: 0.8em;
    margin-right: 0.5rem;
    display: inline-block;
}

.actions {
    display: flex;
    gap: 1rem;
    margin-top: 1rem;
}

.actions a {
    background-color: var(--primary-light);
    color: var(--primary-dark);
    padding: 0.5rem 1rem;
    border-radius: 4px;
}

.actions a:hover {
    background-color: var(--accent);
    color: white;
}
</style>
