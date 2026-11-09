<script setup>
import { computed, ref, onMounted, watch } from 'vue'
import { useRoute, RouterLink } from 'vue-router'

const route = useRoute()
const message = ref('')
const isTracked = ref(false)

const scholarships = [
  {
    id: 1,
    name: 'Academic Excellence Scholarship',
    amount: 5000,
    deadline: 'December 15, 2026',
    eligibility: 'Students with strong academic performance.',
    category: 'Academic Achievement',
    description:
      'This scholarship recognizes students who demonstrate dedication to their education and consistently strong academic performance.',
  },
  {
    id: 2,
    name: 'Future Leaders Grant',
    amount: 2500,
    deadline: 'January 20, 2027',
    eligibility: 'Students demonstrating leadership skills.',
    category: 'Leadership',
    description:
      'This grant supports students who demonstrate leadership potential and a commitment to making a positive difference in their communities.',
  },
  {
    id: 3,
    name: 'STEM Student Scholarship',
    amount: 3000,
    deadline: 'February 10, 2027',
    eligibility: 'Students pursuing science, technology, engineering, or mathematics.',
    category: 'STEM',
    description:
      'This scholarship helps students pursuing education in science, technology, engineering, and mathematics.',
  },
]

const scholarship = computed(() => scholarships.find((item) => item.id === Number(route.params.id)))

const formattedAmount = computed(() =>
  scholarship.value
    ? new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 0,
      }).format(scholarship.value.amount)
    : '',
)

function getSavedApplications() {
  const saved = JSON.parse(window.localStorage.getItem('funded-applications') || '[]')

  if (!Array.isArray(saved)) {
    throw new Error('Invalid saved applications')
  }

  return saved
}

function checkTrackingStatus() {
  message.value = ''
  isTracked.value = false

  if (!scholarship.value) return

  try {
    const tracked = getSavedApplications()

    isTracked.value = tracked.some((item) => Number(item.id) === scholarship.value.id)
  } catch {
    message.value = 'Unable to load your saved applications.'
  }
}

onMounted(checkTrackingStatus)

watch(
  () => route.params.id,
  () => checkTrackingStatus(),
)

function trackApplication() {
  if (!scholarship.value) return

  let tracked

  try {
    tracked = getSavedApplications()
  } catch {
    message.value = 'Unable to load your saved applications.'
    return
  }

  const alreadyTracked = tracked.some((item) => Number(item.id) === scholarship.value.id)

  if (alreadyTracked) {
    isTracked.value = true
    message.value = 'You are already tracking this scholarship.'
    return
  }

  tracked.push({
    ...scholarship.value,
    status: 'Interested',
  })

  try {
    window.localStorage.setItem('funded-applications', JSON.stringify(tracked))

    isTracked.value = true
    message.value = 'Scholarship added to your tracked applications!'
  } catch {
    message.value = 'Unable to save your application.'
  }
}
</script>

<template>
  <main class="min-h-screen bg-[#F6F8F7] p-6 md:p-10">
    <div class="mx-auto max-w-6xl">
      <!-- Back navigation -->
      <RouterLink
        to="/scholarships"
        class="inline-flex items-center gap-2 font-medium text-[#063D34] hover:underline"
      >
        ← Back to Scholarships
      </RouterLink>

      <div
        v-if="scholarship"
        class="mt-8"
      >
        <!-- Scholarship header -->
        <div class="mb-8">
          <span
            class="inline-block rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-green-800"
          >
            {{ scholarship.category }}
          </span>

          <h1 class="mt-4 text-3xl font-bold text-gray-900 md:text-4xl">
            {{ scholarship.name }}
          </h1>

          <p class="mt-3 text-gray-500">
            Review scholarship details and track your application progress.
          </p>
        </div>

        <div class="grid gap-6 lg:grid-cols-3">
          <!-- Main content -->
          <div class="space-y-6 lg:col-span-2">
            <!-- Overview -->
            <section class="rounded-xl bg-white p-7 shadow-sm">
              <h2 class="text-xl font-bold text-gray-900">Scholarship Overview</h2>

              <p class="mt-4 leading-7 text-gray-600">
                {{ scholarship.description }}
              </p>
            </section>

            <!-- Eligibility -->
            <section class="rounded-xl bg-white p-7 shadow-sm">
              <h2 class="text-xl font-bold text-gray-900">Eligibility Requirements</h2>

              <div class="mt-5 rounded-lg border border-green-100 bg-green-50 p-5">
                <p class="leading-7 text-gray-700">
                  {{ scholarship.eligibility }}
                </p>
              </div>
            </section>

            <!-- Application information -->
            <section class="rounded-xl bg-white p-7 shadow-sm">
              <h2 class="text-xl font-bold text-gray-900">Application Information</h2>

              <div class="mt-5 space-y-5">
                <div class="flex flex-wrap justify-between gap-2 border-b pb-4">
                  <span class="text-gray-500">Scholarship</span>

                  <span class="font-semibold text-gray-900">
                    {{ scholarship.name }}
                  </span>
                </div>

                <div class="flex justify-between gap-4 border-b pb-4">
                  <span class="text-gray-500">Award Amount</span>

                  <span class="font-semibold text-green-800">
                    {{ formattedAmount }}
                  </span>
                </div>

                <div class="flex justify-between gap-4">
                  <span class="text-gray-500">Application Deadline</span>

                  <span class="font-semibold text-gray-900">
                    {{ scholarship.deadline }}
                  </span>
                </div>
              </div>
            </section>
          </div>

          <!-- Right sidebar -->
          <aside class="space-y-6">
            <!-- Award card -->
            <div class="rounded-xl bg-white p-7 shadow-sm">
              <p class="text-sm font-medium text-gray-500">Scholarship Award</p>

              <p class="mt-3 text-4xl font-bold text-[#063D34]">
                {{ formattedAmount }}
              </p>

              <div class="mt-6 border-t pt-5">
                <p class="text-sm text-gray-500">Application Deadline</p>

                <p class="mt-2 font-semibold text-gray-900">
                  {{ scholarship.deadline }}
                </p>
              </div>

              <!-- Tracking button -->
              <button
                type="button"
                :disabled="isTracked"
                class="mt-7 w-full rounded-lg px-5 py-3 font-semibold transition"
                :class="
                  isTracked
                    ? 'cursor-not-allowed bg-green-100 text-green-800'
                    : 'bg-[#063D34] text-white hover:bg-green-800'
                "
                @click="trackApplication"
              >
                {{ isTracked ? '✓ Already Tracking' : '+ Track Application' }}
              </button>

              <!-- Feedback -->
              <p
                v-if="message"
                role="status"
                class="mt-4 text-sm font-medium"
                :class="message.startsWith('Unable') ? 'text-red-600' : 'text-green-800'"
              >
                {{ message }}
              </p>

              <!-- Applications link -->
              <RouterLink
                to="/applications"
                class="mt-5 block text-center text-sm font-semibold text-green-800 hover:underline"
              >
                View My Applications
              </RouterLink>
            </div>

            <!-- Organization card -->
            <div class="rounded-xl bg-[#063D34] p-7 text-white">
              <h3 class="text-lg font-bold">Stay Organized</h3>

              <p class="mt-3 text-sm leading-6 text-green-100">
                Keep track of your scholarship applications, monitor deadlines, and update your
                progress all in one place.
              </p>
            </div>
          </aside>
        </div>
      </div>

      <!-- Scholarship not found -->
      <div
        v-else
        class="mt-8 rounded-xl bg-white p-10 text-center shadow-sm"
      >
        <h1 class="text-2xl font-bold text-gray-900">Scholarship Not Found</h1>

        <p class="mt-3 text-gray-500">The scholarship you are looking for is unavailable.</p>

        <RouterLink
          to="/scholarships"
          class="mt-6 inline-block rounded-lg bg-[#063D34] px-5 py-3 text-white"
        >
          Browse Scholarships
        </RouterLink>
      </div>
    </div>
  </main>
</template>
