<!-- src/pages/Login.vue -->
<template>
    <v-container>
        <v-card>
            <v-card-title>Iniciar Sesión</v-card-title>
            <v-card-text>
                <v-snackbar v-model="showAlert" :color="alertType" :timeout="2000">
                    {{ alertMessage }}
                </v-snackbar>
                <v-form @submit.prevent="submitLogin">

                    <v-text-field v-model="email" label="Email" :rules="emailRules" required></v-text-field>
                    <v-text-field v-model="password" label="Contraseña" :rules="passwordRules" type="password"
                        required></v-text-field>
                    <v-btn type="submit" color="primary">Iniciar Sesión</v-btn>
                </v-form>
            </v-card-text>
            <v-progress-linear v-if="loading" color="primary" indeterminate></v-progress-linear>
        </v-card>
    </v-container>
</template>

<script>
import apiClient from '@/plugins/axios';
import { setAuthToken } from '@/services/authService';
import router from '@/router';

export default {
    data() {
        return {
            email: '',
            password: '',
            showAlert: false,
            alertMessage: '',
            alertType: 'success',
            loading: false,
            emailRules: [
                (v) => !!v || 'El email es requerido',
                (v) => /.+@.+\..+/.test(v) || 'El email debe tener un formato válido',
            ],
            passwordRules: [
                (v) => !!v || 'La contraseña es requerida',
                (v) =>
                    /^(?=(.*[a-z]){2})(?=(.*[A-Z]){2})(?=(.*\d){2}).{12,}$/.test(v) ||
                    'La contraseña debe contener al menos 2 minúsculas, 2 mayúsculas y 2 números, con un mínimo de 12 caracteres',
            ],
        };
    },
    methods: {
        async submitLogin() {
            this.loading = true;
            try {
                const response = await apiClient.post('/login', {
                    email: this.email,
                    password: this.password,
                });

                if (response.data.token) {
                    setAuthToken(response.data.token); // Guarda el token en cookies
                    localStorage.setItem('userName', response.data.user.name); // Guarda el nombre en localStorage
                    router.push({ name: 'Dashboard' }); // Redirige al dashboard
                } else {
                    this.alertType = 'error';
                    this.alertMessage = response.data.message || 'Error al iniciar sesión';
                    this.showAlert = true;
                }
            } catch (error) {
                console.error('Error en la autenticación:', error);
                this.alertType = 'error';
                this.alertMessage = error.response?.data?.message || 'Error en la solicitud';
                this.showAlert = true;
            } finally {
                this.loading = false;
            }
        },
    },
};
</script>
