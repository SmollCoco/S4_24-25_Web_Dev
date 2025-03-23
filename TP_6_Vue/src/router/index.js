import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import CreatePostView from "../views/CreatePostView.vue";
import PostDetailView from "../views/PostDetailView.vue";
import EditPostView from "../views/EditPostView.vue";

const routes = [
    { path: "/", component: HomeView },
    { path: "/addPost", component: CreatePostView },
    { path: "/post/:id", component: PostDetailView, props: true },
    { path: "/tags/:tag", component: HomeView, props: true },
    { path: "/editPost/:id", component: EditPostView, props: true },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
