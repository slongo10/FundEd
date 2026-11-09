<template>
  <nav class="flex justify-center gap-6 bg-green-800 p-4 text-white">
    <RouterLink
      to="/"
      class="hover:underline"
      active-class="underline"
    >
      Home
    </RouterLink>

    <RouterLink
      to="/scholarships"
      class="hover:underline"
      active-class="underline"
    >
      Scholarships
    </RouterLink>

    <RouterLink
      to="/applications"
      class="hover:underline"
      active-class="underline"
    >
      My Applications
    </RouterLink>
  </nav>
</template>
