<template>
  <article class="common-layout">
    <el-container class="w-[100vw] h-[100vh]">
      <el-header class="!px-0"><Header /></el-header>

      <el-container>
        <el-aside width="auto">
          <Nav />
        </el-aside>
        <el-container>
          <!-- 内容 -->
          <Content class="w-full"> </Content>
        </el-container>
      </el-container>
    </el-container>
  </article>
</template>

<script lang="ts" setup>
import Nav from './nav/Index.vue'
import Header from './header/Index.vue'
import Content from './content/Index.vue'
</script>
