<script setup>
import NavMenu from '@/components/NavMenu.vue'
</script>

<template>
  <div class="min-h-screen bg-gray-100">
    <header class="bg-green-800 p-6 text-white">
      <h1 class="text-3xl font-bold">FundEd</h1>
      <p>Find scholarships and grants for your education.</p>
    </header>

    <NavMenu />

    <RouterView />
  </div>
</template>
