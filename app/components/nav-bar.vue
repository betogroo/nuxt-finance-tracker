<script setup lang="ts">
  const { getRoutes } = useRouter()
  const navBarRoutes = getRoutes()
    .filter((route) => route.meta && route.meta.showInNavBar)
    .sort((a, b) => a.meta.order! - b.meta.order!)
    .map(({ path, meta }) => ({
      label: meta.title,
      to: path,
      icon: meta.icon,
    }))
</script>

<template>
  <nav class="flex justify-end items-center space-x-2">
    <template
      v-for="{ label, to, icon } in navBarRoutes"
      :key="to"
    >
      <UTooltip
        class="text-2xl size-6"
        :text="label"
      >
        <ULink
          active-class="text-secondary"
          inactive-class="text-gray-400 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
          :to="to"
        >
          <UIcon :name="icon!"
        /></ULink>
      </UTooltip>
    </template>
  </nav>
</template>
