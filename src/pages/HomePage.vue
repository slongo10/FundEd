<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <main class="mx-auto max-w-5xl p-6">
    <section class="py-10 text-center">
      <h2 class="mb-4 text-3xl font-bold">Welcome to FundEd</h2>

      <p class="mb-6 text-gray-700">
        Discover scholarships, explore grants, and keep track of your applications.
      </p>

      <RouterLink
        to="/scholarships"
        class="inline-block rounded-lg bg-green-700 px-6 py-3 text-white hover:bg-green-800"
      >
        Explore Scholarships
      </RouterLink>
    </section>
  </main>
</template>
