<script setup lang="ts">
import { RouterView, RouterLink } from "vue-router";
</script>

<template>
  <nav>
    <h1>Supa Smoothies</h1>
    <RouterLink to="/">Home</RouterLink>
    <RouterLink to="/create">Create a New Smoothie</RouterLink>
  </nav>
  <main>
    <RouterView />
  </main>
</template>

<style scoped></style>
