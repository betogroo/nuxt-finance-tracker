<script setup lang="ts">
  const { getRoutes } = useRouter()
  const navBarRoutes = getRoutes()
    .filter((route) => route.meta && route.meta.showInNavBar)
    .sort((a, b) => a.meta.order! - b.meta.order!)
</script>

<template>
  <nav class="flex justify-end items-center space-x-2">
    <template
      class="m-0 p-0"
      v-for="(route, i) in navBarRoutes"
    >
      <UTooltip
        class="text-2xl size-6"
        :text="route.meta.title"
      >
        <ULink
          :to="route.path"
          active-class="text-secondary"
          inactive-class="text-gray-400 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
        >
          <UIcon :name="route.meta.icon!"
        /></ULink>
      </UTooltip>
    </template>
  </nav>
</template>
