<template>
    <nav>
        <router-link :to="{ name: 'home' }">Accueil</router-link> |
        <router-link :to="{ name: 'add-job' }">Ajouter un emploi</router-link>
    </nav>
    <router-view></router-view>
</template>

<style>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
}

nav {
    margin-bottom: 30px;
    text-align: center;
    padding: 20px 0;
    border-bottom: 1px solid #eee;
}

nav a {
    color: #2c3e50;
    text-decoration: none;
    margin: 0 15px;
    font-size: 1.1rem;
    transition: color 0.3s ease;
}

nav a:hover {
    color: #42b983;
}

nav a.router-link-exact-active {
    color: #42b983;
    font-weight: bold;
    border-bottom: 2px solid #42b983;
    padding-bottom: 3px;
}
</style>
