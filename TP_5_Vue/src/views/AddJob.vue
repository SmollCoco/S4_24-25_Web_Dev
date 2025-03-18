<template>
    <div class="form-container">
        <h1>{{ isEditing ? "Modifier" : "Ajouter" }} une offre</h1>
        <form @submit.prevent="handleSubmit">
            <div class="form-group">
                <label>Titre *</label>
                <input v-model="form.titre" type="text" required />
            </div>
            <div class="form-group">
                <label>Description *</label>
                <textarea v-model="form.description" required></textarea>
            </div>
            <div class="form-row">
                <div class="form-group">
                    <label>Salaire (MAD/an) *</label>
                    <input
                        v-model.number="form.salaire"
                        type="number"
                        required
                    />
                </div>
                <div class="form-group">
                    <label>Expérience requise (ans)</label>
                    <input
                        v-model.number="form.experience"
                        type="number"
                        min="0"
                    />
                </div>
            </div>
            <button type="submit" class="submit-btn">
                {{ isEditing ? "Mettre à jour" : "Créer" }}
            </button>
        </form>
    </div>
</template>

<script>
export default {
    props: ["id"],
    data() {
        return {
            form: {
                titre: "",
                description: "",
                salaire: null,
                experience: 0,
                date: new Date().toISOString().split("T")[0],
            },
        };
    },
    computed: {
        isEditing() {
            return !!this.id;
        },
    },
    async mounted() {
        if (this.id) {
            await this.fetchJob();
        }
    },
    methods: {
        async fetchJob() {
            try {
                const response = await fetch(
                    `http://localhost:3000/jobs_list/${this.id}`
                );
                const data = await response.json();
                this.form = {
                    ...data,
                    salaire: parseInt(data.salaire),
                };
            } catch (error) {
                console.error("Erreur de chargement:", error);
            }
        },
        async handleSubmit() {
            try {
                const payload = {
                    ...this.form,
                    salaire: `${this.form.salaire} MAD/an`,
                };

                const url = this.id
                    ? `http://localhost:3000/jobs_list/${this.id}`
                    : "http://localhost:3000/jobs_list";

                const method = this.id ? "PUT" : "POST";

                await fetch(url, {
                    method,
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(payload),
                });

                this.$router.push("/");
            } catch (error) {
                console.error("Erreur:", error);
            }
        },
    },
};
</script>

<style scoped>
.form-container {
    max-width: 600px;
    margin: 0 auto;
}

.form-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1.5rem;
}

.form-group {
    margin-bottom: 1.5rem;
}

.form-group label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 500;
}

.form-group input,
.form-group textarea {
    width: 100%;
    padding: 0.8rem;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 1rem;
}

textarea {
    height: 120px;
    resize: vertical;
}

.submit-btn {
    background: #42b983;
    color: white;
    padding: 1rem 2rem;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 1rem;
}
</style>
