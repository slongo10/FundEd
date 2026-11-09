<script setup>
import NavMenu from './components/NavMenu.vue'
</script>

<template>
  <div class="min-h-screen bg-[#F6F8F7] md:flex">
    <!-- Left sidebar -->
    <NavMenu />

    <!-- Main page content -->
    <div class="min-w-0 flex-1">
      <RouterView />
    </div>
  </div>
</template>
