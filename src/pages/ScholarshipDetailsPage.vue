<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const scholarships = [
  {
    id: 1,
    name: 'Academic Excellence Scholarship',
    amount: 5000,
    deadline: 'December 15, 2026',
    eligibility: 'Students with strong academic performance.',
  },
  {
    id: 2,
    name: 'Future Leaders Grant',
    amount: 2500,
    deadline: 'January 20, 2027',
    eligibility: 'Students demonstrating leadership skills.',
  },
  {
    id: 3,
    name: 'STEM Student Scholarship',
    amount: 3000,
    deadline: 'February 10, 2027',
    eligibility: 'Students pursuing science, technology, engineering, or mathematics.',
  },
]

const scholarship = computed(() => scholarships.find((item) => item.id === Number(route.params.id)))

function trackApplication() {
  if (!scholarship.value) return

  const tracked = JSON.parse(window.localStorage.getItem('funded-applications') || '[]')

  const alreadyTracked = tracked.some((item) => item.id === scholarship.value.id)

  if (alreadyTracked) {
    window.alert('You are already tracking this scholarship!')
    return
  }

  tracked.push({
    ...scholarship.value,
    status: 'Interested',
  })

  window.localStorage.setItem('funded-applications', JSON.stringify(tracked))

  window.alert('Scholarship added to your tracked applications!')
}
</script>

<template>
  <main class="mx-auto max-w-4xl p-6">
    <RouterLink
      to="/scholarships"
      class="text-green-700 hover:underline"
    >
      ← Back to Scholarships
    </RouterLink>

    <div
      v-if="scholarship"
      class="mt-6 rounded-lg bg-white p-6 shadow"
    >
      <h2 class="mb-4 text-2xl font-bold">
        {{ scholarship.name }}
      </h2>

      <p class="mb-2">Amount: ${{ scholarship.amount }}</p>

      <p class="mb-2">Deadline: {{ scholarship.deadline }}</p>

      <p class="mb-4">Eligibility: {{ scholarship.eligibility }}</p>

      <button
        class="rounded-lg bg-green-700 px-5 py-2 text-white"
        @click="trackApplication"
      >
        Track Application
      </button>
    </div>

    <p
      v-else
      class="mt-6"
    >
      Scholarship not found.
    </p>
  </main>
</template>
