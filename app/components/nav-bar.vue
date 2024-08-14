<script setup lang="ts">
  const { getRoutes } = useRouter()
  const navBarRoutes = getRoutes()
    .filter((route) => route.meta && route.meta.showInNavBar)
    .sort((a, b) => a.meta.order! - b.meta.order!)
</script>

<template>
  <nav class="flex justify-end mx-2 space-x-2">
    <template v-for="(route, i) in navBarRoutes">
      <NuxtLink :to="route.path"> {{ route.meta.title }}</NuxtLink>
      <div v-if="i < navBarRoutes.length - i">|</div>
    </template>
  </nav>
</template>
