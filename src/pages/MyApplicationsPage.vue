<script setup>
import { ref, onMounted } from 'vue'

const applications = ref([])

onMounted(() => {
  applications.value = JSON.parse(window.localStorage.getItem('funded-applications') || '[]')
})

function removeApplication(id) {
  applications.value = applications.value.filter((application) => application.id !== id)

  window.localStorage.setItem('funded-applications', JSON.stringify(applications.value))
}
</script>

<template>
  <main class="mx-auto max-w-5xl p-6">
    <h1 class="mb-4 text-2xl font-bold">My Applications</h1>

    <p class="mb-6 text-gray-700">Keep track of scholarships and grants you're interested in.</p>

    <div
      v-if="applications.length === 0"
      class="rounded-lg bg-white p-6 shadow"
    >
      <p>You haven't tracked any scholarships yet.</p>

      <RouterLink
        to="/scholarships"
        class="mt-4 inline-block text-green-700 hover:underline"
      >
        Explore Scholarships
      </RouterLink>
    </div>

    <div
      v-else
      class="grid gap-4 md:grid-cols-2"
    >
      <div
        v-for="application in applications"
        :key="application.id"
        class="rounded-lg bg-white p-6 shadow"
      >
        <h2 class="mb-3 text-xl font-bold">
          {{ application.name }}
        </h2>

        <p class="mb-2">Amount: ${{ application.amount }}</p>

        <p class="mb-2">Deadline: {{ application.deadline }}</p>

        <p class="mb-4">Status: {{ application.status }}</p>

        <RouterLink
          :to="`/scholarships/${application.id}`"
          class="mr-4 text-green-700 hover:underline"
        >
          View Details
        </RouterLink>

        <button
          class="rounded-lg bg-red-600 px-4 py-2 text-white"
          @click="removeApplication(application.id)"
        >
          Remove
        </button>
      </div>
    </div>
  </main>
</template>
