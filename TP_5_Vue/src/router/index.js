import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const routes = [
    {
        path: "/",
        name: "home",
        component: HomeView,
    },
    {
        path: "/add",
        name: "add-job",
        component: () => import("../views/AddJob.vue"),
    },
    {
        path: "/jobs/:id",
        name: "job-detail",
        component: () => import("../views/JobDetail.vue"),
        props: true,
    },
    {
        path: "/jobs/:id/edit",
        name: "edit-job",
        component: () => import("../views/EditJob.vue"),
        props: true,
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
