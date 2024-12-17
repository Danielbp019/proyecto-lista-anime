<!-- src/pages/Dashboard.vue -->
<template>
    <v-container>
        <v-card>
            <v-card-title>Bienvenido, {{ userName }}</v-card-title>
            <v-card-text>
                <p>Este es tu escritorio personalizado.</p>
                <v-btn color="primary" @click="logout">Cerrar Sesión</v-btn>
            </v-card-text>
        </v-card>
    </v-container>
</template>

<script>
import DashboardLayout from '@/layouts/DashboardLayout.vue';
import { removeAuthToken } from '@/services/authService';
import router from '@/router';

export default {
    data() {
        return {
            userName: '', // Inicializa el nombre del usuario
        };
    },
    created() {
        this.userName = localStorage.getItem('userName') || 'Usuario'; // Recupera el nombre al cargar
    },
    methods: {
        logout() {
            removeAuthToken(); // Elimina el token de las cookies
            localStorage.removeItem('userName'); // Elimina el nombre del usuario
            router.push({ name: '/' }); // Redirige al inicio
        },
    },
};
</script>

<style scoped>
.dashboard {
    text-align: center;
    margin-top: 20px;
}
</style>