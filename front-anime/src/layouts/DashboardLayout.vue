<template>
    <v-responsive class="border rounded">
        <v-app :theme="theme">
            <v-navigation-drawer>
                <v-list>
                    <v-list-item title="Navigation drawer"></v-list-item>
                </v-list>
            </v-navigation-drawer>

            <v-app-bar class="px-3" title="App bar">
                <v-btn :prepend-icon="theme === 'light' ? 'mdi-weather-sunny' : 'mdi-weather-night'" text="Cambiar tema"
                    slim @click="onClick"></v-btn>
            </v-app-bar>

            <v-main style="min-height: auto;">
                <router-view />
            </v-main>

        </v-app>
    </v-responsive>
</template>


<script setup>
import { ref } from 'vue'

const theme = ref('light')

function onClick() {
    theme.value = theme.value === 'light' ? 'dark' : 'light'
}
</script>