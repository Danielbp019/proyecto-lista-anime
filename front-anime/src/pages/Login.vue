<!-- src/pages/Login.vue -->
<template>
    <v-container>
        <v-card>
            <v-card-title>Iniciar Sesión</v-card-title>
            <v-card-text>
                <v-form @submit.prevent="submitLogin">

                    <v-text-field v-model="email" label="Email" :rules="emailRules" required></v-text-field>
                    <v-text-field v-model="password" label="Contraseña" :rules="passwordRules" type="password"
                        required></v-text-field>
                    <v-btn type="submit" color="primary">Iniciar Sesión</v-btn>
                </v-form>
            </v-card-text>
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
                    this.errors = response.data.message || 'Error al iniciar sesión';
                }
            } catch (error) {
                console.error('Error en la autenticación:', error);
                this.errors = 'Error en la solicitud';
            }
        },
    },
};
</script>
