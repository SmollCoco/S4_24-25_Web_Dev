<template>
    <div class="job-detail">
        <div v-if="job">
            <h1>{{ job.titre }}</h1>
            <div class="meta">
                <p>Salaire: {{ job.salaire }}</p>
                <p>Expérience requise: {{ job.experience }} ans</p>
                <p>Date de création: {{ job.date }}</p>
            </div>
            <p class="description">{{ job.description }}</p>

            <div class="actions">
                <router-link
                    :to="{ name: 'edit-job', params: { id: job.id } }"
                    class="btn edit"
                >
                    Modifier
                </router-link>
                <button @click="confirmDelete" class="btn delete">
                    Supprimer
                </button>
            </div>
        </div>
        <p v-else>Chargement...</p>
    </div>
</template>

<script>
export default {
    props: ["id"],
    data() {
        return {
            job: null,
        };
    },
    async mounted() {
        await this.fetchJob();
    },
    methods: {
        async fetchJob() {
            try {
                const response = await fetch(
                    `http://localhost:3000/jobs_list/${this.id}`
                );
                this.job = await response.json();
            } catch (error) {
                console.error("Erreur de chargement:", error);
            }
        },
        async confirmDelete() {
            if (confirm("Êtes-vous sûr de vouloir supprimer cette offre ?")) {
                await this.deleteJob();
            }
        },
        async deleteJob() {
            try {
                await fetch(`http://localhost:3000/jobs_list/${this.id}`, {
                    method: "DELETE",
                });
                this.$router.push("/");
            } catch (error) {
                console.error("Erreur de suppression:", error);
            }
        },
    },
};
</script>

<style scoped>
.job-detail {
    max-width: 600px;
    margin: 0 auto;
}

.meta {
    background: #f5f5f5;
    padding: 1rem;
    border-radius: 8px;
    margin: 1.5rem 0;
}

.description {
    line-height: 1.6;
    color: #444;
}

.actions {
    margin-top: 2rem;
    display: flex;
    gap: 1rem;
}

.btn {
    padding: 0.8rem 1.5rem;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    text-decoration: none;
}

.edit {
    background: #42b983;
    color: white;
}

.delete {
    background: #dc3545;
    color: white;
}
</style>
