<template>
  <aside class="w-full shrink-0 border-r border-gray-200 bg-[#F6F8F7] md:min-h-screen md:w-64">
    <div class="border-b border-gray-200 p-6">
      <div class="flex items-center gap-3">
        <div
          class="flex h-11 w-11 items-center justify-center rounded-xl bg-[#063D34] text-2xl text-white"
        >
          🎓
        </div>

        <div>
          <h1 class="text-xl font-bold text-gray-900">FundEd</h1>
          <p class="text-[10px] font-semibold tracking-widest text-gray-500 uppercase">
            Scholarship Tracker
          </p>
        </div>
      </div>
    </div>

    <nav class="space-y-2 p-4">
      <p class="px-4 pb-2 text-xs font-semibold tracking-widest text-gray-400 uppercase">
        Workspace
      </p>

      <RouterLink
        to="/"
        class="flex items-center gap-3 rounded-lg px-4 py-3 text-gray-700 transition hover:bg-green-100"
        active-class="bg-green-100 font-semibold text-green-900"
      >
        <span>▦</span>
        Dashboard
      </RouterLink>

      <RouterLink
        to="/applications"
        class="flex items-center gap-3 rounded-lg px-4 py-3 text-gray-700 transition hover:bg-green-100"
        active-class="bg-green-100 font-semibold text-green-900"
      >
        <span>▤</span>
        My Applications
      </RouterLink>

      <RouterLink
        to="/scholarships"
        class="flex items-center gap-3 rounded-lg px-4 py-3 text-gray-700 transition hover:bg-green-100"
        active-class="bg-green-100 font-semibold text-green-900"
      >
        <span>＋</span>
        Explore Scholarships
      </RouterLink>
    </nav>

    <div class="hidden border-t border-gray-200 p-5 md:block">
      <div class="rounded-xl bg-[#062D29] p-4 text-white">
        <p class="text-sm font-semibold">Stay ahead</p>
        <p class="mt-2 text-xs text-gray-300">
          Keep track of deadlines and scholarship opportunities.
        </p>
      </div>
    </div>
  </aside>
</template>
