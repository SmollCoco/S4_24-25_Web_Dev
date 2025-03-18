<template>
    <div class="home">
        <div class="header">
            <h1>Offres d'emploi</h1>
        </div>
        <FilterNav @filter="handleFilter" />
        <div class="job-list">
            <div v-for="job in filteredJobs" :key="job.id" class="job-card">
                <router-link
                    :to="{ name: 'job-detail', params: { id: job.id } }"
                >
                    <h3>{{ job.titre }}</h3>
                    <p>{{ job.description }}</p>
                    <div class="meta">
                        <span>Salaire: {{ job.salaire }}</span>
                        <span>Expérience: {{ job.experience }} ans</span>
                    </div>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script>
import FilterNav from "@/views/FilterNav.vue";

export default {
    components: { FilterNav },
    data() {
        return {
            jobs: [],
            filter: {},
        };
    },
    computed: {
        filteredJobs() {
            return this.jobs.filter((job) => {
                return Object.entries(this.filter).every(([key, value]) => {
                    if (!value) return true;
                    if (key === "experience") return job[key] >= value;
                    return job[key].toLowerCase().includes(value.toLowerCase());
                });
            });
        },
    },
    async mounted() {
        await this.fetchJobs();
    },
    methods: {
        async fetchJobs() {
            try {
                const response = await fetch("http://localhost:3000/jobs_list");
                this.jobs = await response.json();
            } catch (error) {
                console.error("Erreur de chargement:", error);
            }
        },
        handleFilter(filter) {
            this.filter = filter;
        },
    },
};
</script>

<style scoped>
.job-list {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 2rem;
}

.job-card {
    padding: 1.5rem;
    border: 1px solid #eee;
    border-radius: 8px;
    transition: transform 0.2s;
    background: white;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
}

.add-btn {
    background: #42b983;
    color: white;
    padding: 0.8rem 1.5rem;
    border-radius: 4px;
    text-decoration: none;
}

.job-list {
    display: grid;
    gap: 1.5rem;
}

.job-card {
    padding: 1.5rem;
    border: 1px solid #eee;
    border-radius: 8px;
    transition: transform 0.2s;
}

.job-card:hover {
    transform: translateY(-2px);
}

.meta {
    display: flex;
    gap: 1rem;
    margin-top: 1rem;
    color: #666;
}
</style>
