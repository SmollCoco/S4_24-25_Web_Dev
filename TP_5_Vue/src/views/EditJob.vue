<template>
    <div class="edit-job">
        <h1>Modifier l'offre de travail</h1>
        <div v-if="loading" class="loading">Chargement en cours...</div>
        <form v-else-if="job" @submit.prevent="handleSubmit">
            <div class="form-group">
                <label>Titre *</label>
                <input
                    v-model="form.titre"
                    type="text"
                    required
                    placeholder="Entrez le titre du poste"
                />
            </div>
            <div class="form-group">
                <label>Description *</label>
                <textarea
                    v-model="form.description"
                    required
                    placeholder="Décrivez les responsabilités et exigences"
                    rows="5"
                ></textarea>
            </div>
            <div class="form-row">
                <div class="form-group">
                    <label>Salaire (MAD/an) *</label>
                    <input
                        v-model.number="form.salaire"
                        type="number"
                        min="0"
                        required
                        placeholder="Ex: 50000"
                    />
                </div>
                <div class="form-group">
                    <label>Années d'expérience requises</label>
                    <input
                        v-model.number="form.experience"
                        type="number"
                        min="0"
                        placeholder="Ex: 3"
                    />
                </div>
            </div>
            <div class="form-group">
                <label>Date de création</label>
                <input
                    :value="form.dateCreation"
                    type="date"
                    readonly
                    class="readonly"
                />
            </div>
            <div class="form-actions">
                <button type="submit" class="btn-save">
                    Enregistrer les modifications
                </button>
                <router-link
                    :to="{ name: 'job-detail', params: { id: job.id } }"
                    class="btn-cancel"
                >
                    Annuler
                </router-link>
            </div>
        </form>
        <div v-else class="error">
            Offre non trouvée.
            <router-link to="/">Retour à l'accueil</router-link>
        </div>
    </div>
</template>

<script>
export default {
    props: ["id"],
    data() {
        return {
            loading: true,
            job: null,
            form: {
                titre: "",
                description: "",
                salaire: 0,
                experience: 0,
                dateCreation: "",
            },
        };
    },
    async mounted() {
        try {
            const response = await fetch(
                `http://localhost:3000/jobs_list/${this.id}`
            );

            if (!response.ok) throw new Error("Offre non trouvée");

            const job = await response.json();

            // Parse salary value
            const salaire = parseInt(job.salaire.replace(/[^0-9]/g, ""));

            this.form = {
                titre: job.titre,
                description: job.description,
                salaire: salaire || 0,
                experience: job.experience || 0,
                dateCreation:
                    job["date de création"] ||
                    new Date().toISOString().split("T")[0],
            };

            this.job = job;
        } catch (error) {
            console.error("Erreur:", error);
            alert(error.message);
            this.$router.push("/");
        } finally {
            this.loading = false;
        }
    },
    methods: {
        async handleSubmit() {
            try {
                const confirmation = confirm(
                    "Êtes-vous sûr de vouloir modifier cette offre ?"
                );
                if (!confirmation) return;
                const updatedJob = {
                    ...this.job,
                    ...this.form,
                    salaire: `${this.form.salaire.toLocaleString(
                        "fr-FR"
                    )} MAD/an`,
                    "date de création": this.form.dateCreation,
                };
                const response = await fetch(
                    `http://localhost:3000/jobs_list/${this.id}`,
                    {
                        method: "PUT",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(updatedJob),
                    }
                );
                if (!response.ok) throw new Error("Échec de la mise à jour");
                alert("Modifications enregistrées avec succès !");
                this.$router.push({
                    name: "job-detail",
                    params: { id: this.id },
                });
            } catch (error) {
                console.error("Erreur:", error);
                alert(`Erreur lors de la mise à jour: ${error.message}`);
            }
        },
    },
};
</script>

<style scoped>
.edit-job {
    max-width: 800px;
    margin: 0 auto;
    padding: 2rem;
}

.form-group {
    margin-bottom: 1.5rem;
}

.form-group label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 500;
    color: #333;
}

input[type="text"],
input[type="number"],
textarea {
    width: 100%;
    padding: 0.8rem;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 1rem;
}

.readonly {
    background-color: #f5f5f5;
    cursor: not-allowed;
}

.form-row {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem;
    margin-bottom: 1.5rem;
}

.form-actions {
    margin-top: 2rem;
    display: flex;
    gap: 1rem;
    justify-content: flex-end;
}

.btn-save {
    background-color: #42b983;
    color: white;
    padding: 0.8rem 1.5rem;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s;
}

.btn-save:hover {
    background-color: #359c74;
}

.btn-cancel {
    background-color: #f0f0f0;
    color: #333;
    padding: 0.8rem 1.5rem;
    border-radius: 4px;
    text-decoration: none;
    transition: background-color 0.3s;
}

.btn-cancel:hover {
    background-color: #ddd;
}

.loading {
    text-align: center;
    padding: 2rem;
    color: #666;
}

.error {
    color: #dc3545;
    padding: 2rem;
    text-align: center;
}
</style>
