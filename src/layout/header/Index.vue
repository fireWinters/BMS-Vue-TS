<template>
  <section class="header h-full flex items-center justify-between">
    <section>
      <Logo />
    </section>
    <section class="flex">
      <TopNav />
      <section class="ml-4 mr-2">
        <Avatar />
      </section>
    </section>
  </section>
</template>

<script setup lang="ts">
import Logo from './Logo.vue'
import TopNav from './TopNav.vue'
import Avatar from './Avatar.vue'
</script>

<style scoped>
.header {
  box-shadow: 0 0 10px var(--el-border-color);
}
</style>
