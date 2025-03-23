<template>
    <div class="post-detail">
        <div v-if="post">
            <h2>{{ post.title }}</h2>
            <div class="tags">
                <span v-for="tag in post.tags" :key="tag" class="tag">{{
                    tag
                }}</span>
            </div>
            <p>{{ post.body }}</p>
            <div class="actions">
                <button @click="deletePost" class="pointer_on_hover">
                    Delete
                </button>
                <router-link :to="`/editPost/${post.id}`"
                    ><button class="pointer_on_hover">Edit</button></router-link
                >
            </div>
        </div>
        <TagCloud :posts="[post]" />
    </div>
</template>

<script>
import getPost from "../composables/getPost";

export default {
    props: ["id"],
    data() {
        return {
            post: null,
        };
    },
    async created() {
        this.post = await getPost(this.id);
    },
    methods: {
        async deletePost() {
            if (!confirm("Are you sure you want to delete this post?")) {
                return;
            }
            await fetch(`http://localhost:3000/posts/${this.id}`, {
                method: "DELETE",
            });
            this.$router.push("/");
        },
    },
};
</script>

<style scoped>
.post-detail {
    background: white;
    padding: 2rem;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(114, 47, 55, 0.1);
    margin: 2rem auto;
    max-width: 800px;
}

.post-detail h2 {
    color: var(--primary-dark);
    margin-bottom: 1.5rem;
}

.post-detail p {
    line-height: 1.6;
    font-size: 1.1rem;
}

.actions {
    margin-top: 2rem;
    display: flex;
    gap: 1rem;
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
</style>
