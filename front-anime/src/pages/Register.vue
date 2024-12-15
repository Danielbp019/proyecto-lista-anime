<!-- src/pages/Register.vue -->
<template>
    <v-container>
        <v-card>
            <v-card-title>Registro</v-card-title>
            <v-card-text>
                <v-form @submit.prevent="submitRegister">
                    <v-text-field v-model="name" label="Nombre" :rules="nameRules" required></v-text-field>
                    <v-text-field v-model="email" label="Email" :rules="emailRules" required></v-text-field>
                    <v-text-field v-model="password" label="Contraseña" :rules="passwordRules" type="password"
                        required></v-text-field>
                    <v-text-field v-model="password_confirmation" label="Confirmar contraseña"
                        :rules="confirmationRules" type="password" required></v-text-field>
                    <v-btn type="submit" color="primary">Registrarse</v-btn>
                </v-form>
            </v-card-text>
        </v-card>
    </v-container>
</template>

<script>
import apiClient from '@/plugins/axios';

export default {
    data() {
        return {
            name: '',
            email: '',
            password: '',
            password_confirmation: '',
            nameRules: [(v) => !!v || 'El nombre es requerido'],
            emailRules: [
                (v) => !!v || 'El email es requerido',
                (v) => /.+@.+\..+/.test(v) || 'El email debe tener un formato válido',
            ],
            passwordRules: [
                (v) => !!v || 'La contraseña es requerida',
                (v) =>
                    v.length >= 12 ||
                    'La contraseña debe tener al menos 12 caracteres',
                (v) =>
                    /^(?=(.*[a-z]){2})(?=(.*[A-Z]){2})(?=(.*\d){2}).{12,}$/.test(v) ||
                    'La contraseña debe contener al menos 2 minúsculas, 2 mayúsculas y 2 números',
            ],
            confirmationRules: [
                (v) => !!v || 'La confirmación de contraseña es requerida',
                (v) =>
                    v === this.password || 'Las contraseñas no coinciden',
            ],
        };
    },
    methods: {
        async submitRegister() {
            try {
                const response = await apiClient.post('/register', {
                    name: this.name,
                    email: this.email,
                    password: this.password,
                    password_confirmation: this.password_confirmation,
                });
                console.log('Registro exitoso:', response.data);
                this.$router.push('/login'); // Redirigir al login
            } catch (error) {
                console.error('Error en el registro:', error.response?.data);
            }
        },
    },
};
</script>