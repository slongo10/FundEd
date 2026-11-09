<script setup>
import { ref, computed, onMounted } from 'vue'
import { RouterLink } from 'vue-router'

const applications = ref([])

function saveApplications() {
  window.localStorage.setItem('funded-applications', JSON.stringify(applications.value))
}

function loadApplications() {
  try {
    const saved = JSON.parse(window.localStorage.getItem('funded-applications') || '[]')

    applications.value = Array.isArray(saved) ? saved : []
  } catch {
    applications.value = []
  }
}

onMounted(loadApplications)

function removeApplication(id) {
  applications.value = applications.value.filter((application) => application.id !== id)

  saveApplications()
}

function updateStatus(application, event) {
  application.status = event.target.value
  saveApplications()
}

const totalApplications = computed(() => applications.value.length)

const submittedApplications = computed(
  () =>
    applications.value.filter((application) =>
      ['Submitted', 'Awarded'].includes(application.status),
    ).length,
)

const totalPotential = computed(() =>
  applications.value.reduce((total, application) => total + Number(application.amount || 0), 0),
)

function currency(value) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(value)
}
</script>

<template>
  <main class="min-h-screen bg-[#F6F8F7] p-6 md:p-10">
    <div class="mx-auto max-w-6xl">
      <!-- Page heading -->
      <div class="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 class="text-3xl font-bold text-gray-900">My Applications</h1>

          <p class="mt-2 text-gray-500">Organize your scholarships and track your progress.</p>
        </div>

        <RouterLink
          to="/scholarships"
          class="rounded-lg bg-[#063D34] px-5 py-3 font-semibold text-white hover:bg-green-800"
        >
          + Add Scholarship
        </RouterLink>
      </div>

      <!-- Statistics -->
      <div class="mb-8 grid gap-5 md:grid-cols-3">
        <div class="rounded-xl bg-white p-6 shadow-sm">
          <p class="text-sm text-gray-500">Total Applications</p>

          <p class="mt-3 text-3xl font-bold">
            {{ totalApplications }}
          </p>
        </div>

        <div class="rounded-xl bg-white p-6 shadow-sm">
          <p class="text-sm text-gray-500">Submitted / Awarded</p>

          <p class="mt-3 text-3xl font-bold">
            {{ submittedApplications }}
          </p>
        </div>

        <div class="rounded-xl bg-white p-6 shadow-sm">
          <p class="text-sm text-gray-500">Potential Funding</p>

          <p class="mt-3 text-3xl font-bold">
            {{ currency(totalPotential) }}
          </p>
        </div>
      </div>

      <!-- Empty state -->
      <div
        v-if="applications.length === 0"
        class="rounded-xl bg-white p-12 text-center shadow-sm"
      >
        <div class="mb-4 text-4xl">🎓</div>

        <h2 class="text-xl font-bold">No applications yet</h2>

        <p class="mt-3 text-gray-500">
          Start tracking scholarships and grants you're interested in.
        </p>

        <RouterLink
          to="/scholarships"
          class="mt-6 inline-block rounded-lg bg-green-700 px-5 py-3 text-white hover:bg-green-800"
        >
          Explore Scholarships
        </RouterLink>
      </div>

      <!-- Application cards -->
      <div
        v-else
        class="space-y-4"
      >
        <div
          v-for="application in applications"
          :key="application.id"
          class="rounded-xl border border-gray-100 bg-white p-6 shadow-sm"
        >
          <div class="flex flex-wrap items-start justify-between gap-4">
            <div>
              <h2 class="text-xl font-bold text-gray-900">
                {{ application.name }}
              </h2>

              <p class="mt-2 text-sm text-gray-500">Deadline: {{ application.deadline }}</p>
            </div>

            <div class="text-right">
              <p class="text-xl font-bold text-green-800">
                {{ currency(application.amount) }}
              </p>

              <p class="text-xs text-gray-400">Potential award</p>
            </div>
          </div>

          <!-- Application actions -->
          <div class="mt-6 flex flex-wrap items-center gap-4 border-t pt-5">
            <label
              :for="`status-${application.id}`"
              class="text-sm font-medium text-gray-600"
            >
              Status
            </label>

            <select
              :id="`status-${application.id}`"
              :value="application.status || 'Interested'"
              class="rounded-lg border border-gray-200 bg-green-50 px-3 py-2 text-sm text-green-900"
              @change="updateStatus(application, $event)"
            >
              <option value="Interested">Interested</option>
              <option value="In Progress">In Progress</option>
              <option value="Submitted">Submitted</option>
              <option value="Awarded">Awarded</option>
              <option value="Rejected">Rejected</option>
            </select>

            <div class="flex-1"></div>

            <RouterLink
              :to="`/scholarships/${application.id}`"
              class="text-sm font-semibold text-green-700 hover:underline"
            >
              View Details
            </RouterLink>

            <button
              type="button"
              class="rounded-lg border border-red-200 px-4 py-2 text-sm font-semibold text-red-600 hover:bg-red-50"
              @click="removeApplication(application.id)"
            >
              Remove
            </button>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
" @change="updateStatus(application, $event)" @click="removeApplication(application.id)
