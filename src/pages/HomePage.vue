<script setup>
import { computed, ref, onMounted } from 'vue'
import { RouterLink } from 'vue-router'

const applications = ref([])

onMounted(() => {
  try {
    applications.value = JSON.parse(window.localStorage.getItem('funded-applications') || '[]')
  } catch {
    applications.value = []
  }
})

const totalApplications = computed(() => applications.value.length)

const awardedAmount = computed(() =>
  applications.value
    .filter((app) => app.status === 'Awarded')
    .reduce((total, app) => total + Number(app.amount || 0), 0),
)

const upcoming = computed(() => applications.value.filter((app) => app.deadline).slice(0, 3))

const progress = computed(() => {
  if (!totalApplications.value) return 0

  const completed = applications.value.filter((app) =>
    ['Submitted', 'Awarded'].includes(app.status),
  ).length

  return Math.round((completed / totalApplications.value) * 100)
})

const currency = (value) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(value)
</script>

<template>
  <main class="min-h-screen bg-[#F6F8F7] p-6 md:p-10">
    <div class="mx-auto max-w-6xl">
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900">Welcome to FundEd</h1>
        <p class="mt-1 text-gray-500">Your scholarship journey starts here.</p>
      </div>

      <section class="mb-8 rounded-2xl bg-[#062D29] p-8 text-white">
        <p class="mb-3 text-xs font-semibold tracking-widest text-emerald-300 uppercase">
          Your Scholarship Journey
        </p>

        <h2 class="text-2xl font-bold">Turn opportunities into outcomes.</h2>

        <p class="mt-3 text-sm text-gray-300">
          Keep your applications organized and stay on top of important deadlines.
        </p>

        <RouterLink
          to="/scholarships"
          class="mt-6 inline-block rounded-lg bg-emerald-400 px-5 py-3 font-semibold text-emerald-950 hover:bg-emerald-300"
        >
          + Explore Scholarships
        </RouterLink>
      </section>

      <div class="mb-8 grid gap-5 md:grid-cols-3">
        <div class="rounded-xl bg-white p-6 shadow-sm">
          <p class="text-sm text-gray-500">Total applications</p>
          <p class="mt-3 text-3xl font-bold">{{ totalApplications }}</p>
          <p class="mt-2 text-xs text-gray-400">Currently tracked</p>
        </div>

        <div class="rounded-xl bg-white p-6 shadow-sm">
          <p class="text-sm text-gray-500">Tracked deadlines</p>
          <p class="mt-3 text-3xl font-bold">{{ upcoming.length }}</p>
          <p class="mt-2 text-xs text-gray-400">Applications with deadlines</p>
        </div>

        <div class="rounded-xl bg-white p-6 shadow-sm">
          <p class="text-sm text-gray-500">Scholarship money awarded</p>
          <p class="mt-3 text-3xl font-bold">
            {{ currency(awardedAmount) }}
          </p>
          <p class="mt-2 text-xs text-gray-400">Based on awarded applications</p>
        </div>
      </div>

      <div class="grid gap-6 lg:grid-cols-3">
        <section class="rounded-xl bg-white p-6 shadow-sm lg:col-span-2">
          <div class="mb-6 flex items-center justify-between">
            <h2 class="text-xl font-bold">Upcoming deadlines</h2>
            <RouterLink
              to="/applications"
              class="text-sm font-medium text-green-700 hover:underline"
            >
              View all
            </RouterLink>
          </div>

          <div
            v-if="upcoming.length"
            class="space-y-4"
          >
            <div
              v-for="app in upcoming"
              :key="app.id"
              class="flex items-center justify-between border-b pb-4"
            >
              <div>
                <p class="font-semibold">{{ app.name }}</p>
                <p class="text-sm text-gray-500">{{ app.deadline }}</p>
              </div>
              <p class="font-semibold text-green-800">
                {{ currency(app.amount) }}
              </p>
            </div>
          </div>

          <p
            v-else
            class="py-8 text-center text-gray-500"
          >
            No tracked scholarships yet.
          </p>
        </section>

        <section class="rounded-xl bg-white p-6 shadow-sm">
          <h2 class="mb-6 text-xl font-bold">Application progress</h2>

          <div
            class="mx-auto flex h-40 w-40 items-center justify-center rounded-full"
            :style="{
              background: `conic-gradient(#15803d ${progress}%, #e5e7eb ${progress}% 100%)`,
            }"
          >
            <div class="flex h-32 w-32 flex-col items-center justify-center rounded-full bg-white">
              <span class="text-3xl font-bold">{{ progress }}%</span>
              <span class="text-xs text-gray-500">Completed</span>
            </div>
          </div>

          <p class="mt-6 text-center text-sm text-gray-500">
            {{ totalApplications }} tracked applications
          </p>

          <RouterLink
            to="/applications"
            class="mt-5 block text-center text-sm font-semibold text-green-700 hover:underline"
          >
            Manage Applications
          </RouterLink>
        </section>
      </div>
    </div>
  </main>
</template>
