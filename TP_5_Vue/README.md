# Application de Gestion d'Offres d'Emploi

## Description

Ce projet consiste à développer une application de gestion d'offres d'emploi. L'application permet de gérer dynamiquement des données avec Vue.js, d'afficher des offres d'emploi, d'effectuer des recherches, et de filtrer et trier les éléments.

## Fonctionnalités

- **Affichage dynamique** des offres d'emploi avec Vue.js.
- **Barre de recherche** pour filtrer les offres en temps réel.
- **Filtrage interactif** par ans d'expérience.

## Installation

1. Clonez ce repository :
   ```bash
   git clone https://github.com/SmollCoco/S4_24-25_Web_Dev.git
   ```
   
2. Démarrez le serveur de mock (JSON Server) pour les données :
   ```bash
   npx json-server --watch ./src/assets/offres-emploi.json --port 3000
   ```

3. Installez les dépendances :
   ```bash
   npm install
   ```

4. Lancez l'application :
   ```bash
   npm run serve
   ```
