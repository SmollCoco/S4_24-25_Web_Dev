<template>
    <div class="filter-nav">
        <input
            type="text"
            placeholder="Recherche par titre..."
            v-model="filter.titre"
            @input="updateFilter"
        />
        <input
            type="number"
            placeholder="Expérience minimum (ans)"
            v-model.number="filter.experience"
            @input="updateFilter"
            min="0"
        />
    </div>
</template>

<script>
export default {
    data() {
        return {
            filter: {
                titre: "",
                experience: null,
            },
        };
    },
    methods: {
        updateFilter() {
            this.$emit("filter", this.filter);
        },
    },
};
</script>

<style scoped>
.filter-nav {
    margin-bottom: 2rem;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
}

input {
    padding: 0.8rem;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 1rem;
}
</style>
