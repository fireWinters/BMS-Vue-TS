<template>
  <section class="h-full">
    <section>
      <Tabs />
    </section>
    <section class="content">
      <section class="content-view m-5 relative">
        <router-view v-slot="{ Component }">
          <keep-alive>
            <transition>
              <component :is="Component"></component>
            </transition>
          </keep-alive>
        </router-view>
      </section>
    </section>
  </section>
</template>

<script lang="ts" setup>
import Tabs from './Tabs.vue'
</script>

<style scoped>
.content {
  background-color: #f2f4f7;
  height: calc(100vh - 106px);
  overflow-y: scroll;
}
.v-enter-active,
.v-leave-active {
  transition: opacity 1s;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
.v-leave-to {
  position: absolute;
  left: 0;
  right: 0;
}
</style>
