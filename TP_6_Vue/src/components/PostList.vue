<template>
    <div class="post-list">
        <SinglePost
            v-for="post in filteredPosts"
            :key="post.id"
            :post="post"
            @post-deleted="fetchPosts"
        />
    </div>
</template>

<script>
import getPosts from "../composables/getPosts";
import SinglePost from "./SinglePost.vue";

export default {
    components: { SinglePost },
    props: {
        tag: String,
    },
    data() {
        return {
            posts: [],
        };
    },
    computed: {
        filteredPosts() {
            if (!this.tag) return this.posts;
            return this.posts.filter((post) => post.tags.includes(this.tag));
        },
    },
    methods: {
        async fetchPosts() {
            this.posts = await getPosts();
        },
    },
    mounted() {
        this.fetchPosts();
    },
};
</script>

<style scoped>
.post-list {
    flex: 2;
    padding-right: 2rem;
}

.post-list > * {
    margin-left: 20px;
}

@media (max-width: 768px) {
    .post-list {
        padding-right: 0;
    }
}
</style>
