<template>
    <div class="home">
        <div class="layout">
            <PostList :tag="$route.params.tag" />
            <TagCloud :posts="posts" class="tagcloud" />
        </div>
    </div>
</template>

<script>
import PostList from "../components/PostList.vue";
import TagCloud from "../components/TagCloud.vue";
import getPosts from "../composables/getPosts";

export default {
    components: { PostList, TagCloud },
    data() {
        return {
            posts: [],
        };
    },
    async mounted() {
        this.posts = await getPosts();
    },
};
</script>

<style scoped>
.layout {
    display: grid;
    grid-template-columns: 3fr 1fr;
    gap: 2rem;
    padding: 2rem 0;
}

.tagcloud {
    margin-right: 20px;
}

@media (max-width: 768px) {
    .layout {
        grid-template-columns: 1fr;
    }
}
</style>
