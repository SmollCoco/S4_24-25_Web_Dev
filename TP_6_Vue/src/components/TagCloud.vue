<template>
    <div class="tag-cloud">
        <h3>Tags</h3>
        <div v-for="tag in uniqueTags" :key="tag">
            <router-link :to="`/tags/${tag}`">{{ tag }}</router-link>
        </div>
    </div>
</template>

<script>
export default {
    props: ["posts"],
    computed: {
        uniqueTags() {
            return [...new Set(this.posts.flatMap((post) => post.tags))].sort();
        },
    },
};
</script>

<style scoped>
.tag-cloud {
    background: white;
    padding: 1.5rem;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(114, 47, 55, 0.1);
    height: fit-content;
}

.tag-cloud h3 {
    color: var(--primary-dark);
    margin-top: 0;
}

.tag-cloud a {
    display: inline-block;
    padding: 0.5rem 1rem;
    margin: 0.25rem;
    background-color: var(--primary-light);
    color: var(--primary-dark);
    border-radius: 20px;
    transition: all 0.2s ease;
}

.tag-cloud a:hover {
    background-color: var(--primary-dark);
    color: white;
    transform: scale(1.05);
}

@media (max-width: 768px) {
    .tag-cloud {
        margin-top: 2rem;
    }
}
</style>
