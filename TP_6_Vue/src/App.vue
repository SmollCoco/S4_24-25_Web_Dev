<script setup>
import NavBar from "@/components/NavBar.vue";
</script>

<template>
    <NavBar />
    <router-view />
</template>

<style>
/* Global Styles */
* {
    margin: 0;
    padding: 0;
}

:root {
    --primary-light: #efdfbb;
    --primary-dark: #722f37;
    --accent: #a26769;
    --text-dark: #2c3e50;
}

#app {
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: var(--text-dark);
    min-height: 100vh;
    background: var(--primary-light);
}

.container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
}

.pointer_on_hover:hover {
    cursor: pointer;
}

/* Global Components */
button {
    background-color: var(--primary-dark);
    color: white;
    border: none;
    padding: 8px 16px;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

button:hover {
    background-color: var(--accent);
}

a {
    color: var(--primary-dark);
    text-decoration: none;
    transition: color 0.3s ease;
}

a:hover {
    color: var(--accent);
}

input,
textarea {
    border: 1px solid var(--primary-dark);
    border-radius: 4px;
    padding: 8px;
    margin: 5px 0;
    width: 100%;
    box-sizing: border-box;
}

input:focus,
textarea:focus {
    outline: 2px solid var(--accent);
    border-color: transparent;
}
</style>
