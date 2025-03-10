<template>
    <div class="container mt-5">
        <h1 class="mb-4">Pièces Auto en Ligne</h1>
        <!-- Flex container for sidebar and content -->
        <div class="shop-container">
            <!-- Sidebar Filters -->
            <div class="filters">
                <!-- Search, sort, stock check -->
                <div class="mb-4">
                    <input
                        type="text"
                        class="form-control mb-3"
                        placeholder="Rechercher..."
                        v-model="searchText"
                    />
                    <select class="form-control mb-3" v-model="selectedSort">
                        <option value="asc">Prix croissant</option>
                        <option value="desc">Prix décroissant</option>
                    </select>
                    <div class="form-check mb-3">
                        <input
                            type="checkbox"
                            class="form-check-input"
                            id="stockCheck"
                            v-model="inStockOnly"
                        />
                        <label class="form-check-label" for="stockCheck">
                            En stock seulement
                        </label>
                    </div>
                </div>
                <!-- Category Filters -->
                <div class="category-filters">
                    <h5>Catégories</h5>
                    <div
                        class="form-check"
                        v-for="category in categories"
                        :key="category"
                    >
                        <input
                            class="form-check-input"
                            type="checkbox"
                            :id="category"
                            :value="category"
                            v-model="selectedCategories"
                        />
                        <label class="form-check-label" :for="category">
                            {{ category }}
                        </label>
                    </div>
                </div>
                <!-- Shopping Cart -->
                <div class="mt-5 p-3 bg-light rounded">
                    <h3>Panier ({{ cart.length }})</h3>
                    <ul class="list-group">
                        <li
                            class="list-group-item d-flex justify-content-between align-items-center"
                            v-for="item in cart"
                            :key="item.id"
                        >
                            <div>
                                <strong>{{ item.nom }}</strong> -
                                {{ item.prix }} €
                                <small>({{ item.categorie }})</small>
                            </div>
                            <button
                                class="btn btn-danger btn-sm"
                                @click="removeFromCart(item.id)"
                            >
                                ×
                            </button>
                        </li>
                    </ul>
                    <h4 class="mt-3">Total: {{ cartTotal }} €</h4>
                </div>
            </div>
            <!-- Parts List -->
            <div class="parts-list">
                <div class="row">
                    <div
                        class="col-md-4 mb-4"
                        v-for="part in filteredParts"
                        :key="part.id"
                    >
                        <div class="card h-100">
                            <img
                                :src="getImageUrl(part.image)"
                                class="card-img-top"
                                alt="Part image"
                                style="height: 200px; object-fit: cover"
                            />
                            <div class="card-body">
                                <h5 class="card-title">{{ part.nom }}</h5>
                                <div class="card-text">
                                    <p>
                                        <strong>Catégorie:</strong>
                                        {{ part.categorie }}
                                    </p>
                                    <p>
                                        <strong>Prix:</strong> {{ part.prix }} €
                                    </p>
                                    <p>
                                        <strong>Disponibilité:</strong>
                                        <span
                                            class="badge"
                                            :class="
                                                part.disponible
                                                    ? 'bg-success'
                                                    : 'bg-danger'
                                            "
                                        >
                                            {{
                                                part.disponible
                                                    ? "En stock"
                                                    : "Rupture"
                                            }}
                                        </span>
                                    </p>
                                </div>
                                <button
                                    class="btn btn-primary mt-2"
                                    @click="addToCart(part)"
                                    :disabled="!part.disponible"
                                >
                                    Ajouter au panier
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import partsData from "@/assets/pieces-autos.json";

export default {
    data() {
        return {
            parts: partsData,
            searchText: "",
            selectedCategories: [],
            selectedSort: "asc",
            inStockOnly: false,
            cart: [],
        };
    },
    computed: {
        categories() {
            return [...new Set(this.parts.map((part) => part.categorie))];
        },
        filteredParts() {
            let filtered = this.parts.filter((part) => {
                const matchesSearch = part.nom
                    .toLowerCase()
                    .includes(this.searchText.toLowerCase());
                const matchesCategories =
                    this.selectedCategories.length > 0
                        ? this.selectedCategories.includes(part.categorie)
                        : true;
                const matchesStock = this.inStockOnly ? part.disponible : true;
                return matchesSearch && matchesCategories && matchesStock;
            });
            return filtered.sort((a, b) =>
                this.selectedSort === "asc" ? a.prix - b.prix : b.prix - a.prix
            );
        },
        cartTotal() {
            return this.cart
                .reduce((total, item) => total + item.prix, 0)
                .toFixed(2);
        },
    },
    methods: {
        addToCart(part) {
            if (part.disponible) {
                this.cart.push({ ...part });
            }
        },
        removeFromCart(partId) {
            this.cart = this.cart.filter((item) => item.id !== partId);
        },
        getImageUrl(imageName) {
            try {
                return require(`@/assets/${imageName}`);
            } catch {
                return require("@/assets/placeholder.jpg");
            }
        },
    },
};
</script>

<style scoped>
* {
    font-family: Arial, Helvetica, sans-serif;
    margin: 5px;
    padding: 5px;
}

/* Flex container to separate filters and parts */
.shop-container {
    display: flex;
    gap: 20px;
    align-items: flex-start;
}

/* Sidebar filters */
.filters {
    width: 250px;
    background: #aed6ff75;
    padding: 15px;
    border-radius: 10px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
    height: fit-content;
    max-height: calc(95vh - 100px); /* Adjust as needed */
    position: sticky;
    top: 20px;
}

/* Parts list takes remaining space */
.parts-list {
    flex-grow: 1;
}

/* Enhance card look */
.card {
    transition: transform 0.2s, box-shadow 0.2s;
    background-color: rgba(128, 128, 128, 0.159);
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
}

.card:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
}

/* Badge size */
.badge {
    font-size: 0.9em;
    padding: 0.5em 0.75em;
}

/* Disabled button look */
.btn:disabled {
    opacity: 0.65;
    cursor: not-allowed;
}

/* List group item hover */
.list-group-item {
    transition: background-color 0.2s;
}

.list-group-item:hover {
    background-color: #f1f1f1;
}

/* General adjustments */
img {
    max-width: 100%;
    border-radius: 5px;
}

.category-filters {
    margin-top: 20px;
}

.btn-primary {
    background-color: rgba(128, 128, 128, 0.537);
    border: none;
    border-radius: 5px;
    color: red;
    padding: 10px;
}

/* Make the filter sidebar scrollable */
.filters {
    overflow-y: auto;
}
</style>
