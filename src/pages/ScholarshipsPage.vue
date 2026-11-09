<script setup>
import { ref } from 'vue'

const scholarships = ref([
  {
    id: 1,
    name: 'Academic Excellence Scholarship',
    amount: 5000,
    deadline: 'December 15, 2026',
    type: 'Scholarship',
  },
  {
    id: 2,
    name: 'Future Leaders Grant',
    amount: 2500,
    deadline: 'January 20, 2027',
    type: 'Grant',
  },
  {
    id: 3,
    name: 'STEM Student Scholarship',
    amount: 3000,
    deadline: 'February 10, 2027',
    type: 'Scholarship',
  },
])
</script>

<template>
  <main class="mx-auto max-w-5xl p-6">
    <h2 class="mb-6 text-2xl font-bold">Available Scholarships and Grants</h2>

    <div class="grid gap-4 md:grid-cols-2">
      <div
        v-for="scholarship in scholarships"
        :key="scholarship.id"
        class="rounded-lg bg-white p-5 shadow"
      >
        <h3 class="text-xl font-semibold">
          {{ scholarship.name }}
        </h3>

        <p class="mt-2">Amount: ${{ scholarship.amount }}</p>

        <p>Deadline: {{ scholarship.deadline }}</p>
        <p>Type: {{ scholarship.type }}</p>

        <RouterLink
          :to="`/scholarships/${scholarship.id}`"
          class="mt-4 inline-block rounded-lg bg-green-700 px-4 py-2 text-white"
        >
          View Details
        </RouterLink>
      </div>
    </div>
  </main>
</template>
