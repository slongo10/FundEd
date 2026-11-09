<script setup>
import { computed, ref } from 'vue'

const searchQuery = ref('')
const selectedType = ref('All')

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

const filteredScholarships = computed(() => {
  return scholarships.value.filter((scholarship) => {
    const matchesSearch = scholarship.name
      .toLowerCase()
      .includes(searchQuery.value.toLowerCase().trim())

    const matchesType = selectedType.value === 'All' || scholarship.type === selectedType.value

    return matchesSearch && matchesType
  })
})

function clearFilters() {
  searchQuery.value = ''
  selectedType.value = 'All'
}

function formatAmount(amount) {
  return Number(amount).toLocaleString('en-US')
}
</script>

<template>
  <main class="min-h-screen bg-[#F6F8F7] p-6 md:p-10">
    <div class="mx-auto max-w-6xl">
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900">Explore Scholarships</h1>

        <p class="mt-2 text-gray-500">
          Discover scholarships and grants to help fund your education.
        </p>
      </div>

      <section class="mb-8 rounded-xl bg-[#062F29] p-7 text-white">
        <p class="text-xs font-semibold tracking-widest text-emerald-300 uppercase">
          Find your opportunity
        </p>

        <h2 class="mt-3 text-2xl font-bold">Your future starts here.</h2>

        <p class="mt-3 text-sm text-gray-200">
          Search available scholarships and grants, review eligibility, and track your applications.
        </p>
      </section>

      <section class="mb-8 rounded-xl bg-white p-6 shadow-sm">
        <h2 class="mb-5 text-lg font-bold text-gray-900">Search and Filter</h2>

        <div class="grid gap-4 md:grid-cols-2">
          <div>
            <label
              for="scholarship-search"
              class="mb-2 block text-sm font-medium text-gray-700"
            >
              Search Scholarships
            </label>

            <input
              id="scholarship-search"
              v-model="searchQuery"
              type="text"
              placeholder="Search by scholarship name..."
              class="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-green-700"
            />
          </div>

          <div>
            <label
              for="scholarship-type"
              class="mb-2 block text-sm font-medium text-gray-700"
            >
              Opportunity Type
            </label>

            <select
              id="scholarship-type"
              v-model="selectedType"
              class="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 outline-none focus:border-green-700"
            >
              <option value="All">All Opportunities</option>
              <option value="Scholarship">Scholarships</option>
              <option value="Grant">Grants</option>
            </select>
          </div>
        </div>

        <div class="mt-5 flex items-center justify-between gap-4">
          <p class="text-sm text-gray-500">
            Showing {{ filteredScholarships.length }} opportunities
          </p>

          <button
            type="button"
            class="rounded-lg border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-100"
            @click="clearFilters"
          >
            Clear Filters
          </button>
        </div>
      </section>

      <section>
        <h2 class="mb-5 text-xl font-bold text-gray-900">Available Scholarships and Grants</h2>

        <div
          v-if="filteredScholarships.length > 0"
          class="grid gap-5 md:grid-cols-2"
        >
          <article
            v-for="scholarship in filteredScholarships"
            :key="scholarship.id"
            class="rounded-xl border border-gray-100 bg-white p-6 shadow-sm"
          >
            <div class="mb-4 flex items-start justify-between gap-3">
              <h3 class="text-lg font-bold text-gray-900">
                {{ scholarship.name }}
              </h3>

              <span
                class="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-800"
              >
                {{ scholarship.type }}
              </span>
            </div>

            <p class="text-2xl font-bold text-green-800">${{ formatAmount(scholarship.amount) }}</p>

            <p class="mt-4 text-sm text-gray-500">Deadline: {{ scholarship.deadline }}</p>

            <RouterLink
              :to="`/scholarships/${scholarship.id}`"
              class="mt-5 inline-block rounded-lg bg-green-700 px-5 py-3 text-sm font-semibold text-white hover:bg-green-800"
            >
              View Details
            </RouterLink>
          </article>
        </div>

        <div
          v-else
          class="rounded-xl bg-white p-10 text-center shadow-sm"
        >
          <h3 class="text-lg font-bold text-gray-900">No scholarships found</h3>

          <p class="mt-2 text-gray-500">Try a different search or filter.</p>

          <button
            type="button"
            class="mt-5 rounded-lg bg-green-700 px-5 py-3 text-white hover:bg-green-800"
            @click="clearFilters"
          >
            Clear Filters
          </button>
        </div>
      </section>
    </div>
  </main>
</template>
