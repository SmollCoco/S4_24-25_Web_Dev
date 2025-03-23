<template>
    <nav>
        <router-link to="/">Home</router-link>
        <router-link to="/addPost">New Post</router-link>
    </nav>
</template>

<style scoped>
nav {
    background-color: var(--primary-dark);
    padding: 1rem 0;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

nav a {
    color: var(--primary-light);
    margin: 0 1.5rem;
    font-weight: 500;
    padding-bottom: 4px;
}

nav a.router-link-exact-active {
    border-bottom: 2px solid var(--primary-light);
}

@media (max-width: 768px) {
    nav {
        text-align: center;
    }

    nav a {
        margin: 0 0.5rem;
        display: inline-block;
        padding: 0.5rem;
    }
}
</style>
