<template>
  <section>
    <el-tree
      ref="treeComponent"
      v-loading="loading"
      :data="treeData"
      node-key="id"
      default-expand-all
      show-checkbox
      :check-strictly="false"
      :props="{ class: 'py-1' }"
      :default-checked-keys="checkedKeys"
    >
    </el-tree>

    <el-divider></el-divider>
    <section class="flex justify-end">
      <el-button :loading="loading" type="primary" @click="change">修改</el-button>
      <el-button @click="props.close">关闭</el-button>
    </section>
  </section>
</template>

<script lang="ts" setup>
import { ref, type Component, watchEffect } from 'vue'
import { apiTreeAll, apiTreeAuthByGorupID, apiTreeAuthPush } from '@/api'
import { menuDataToTree, success, tailError } from '@/helper/common'

const props = defineProps(['groupId', 'close'])
const loading = ref(true)
const treeComponent = ref<Component<any>>()
const checkedKeys = ref<number[]>([])

/** name to id Map */
const treeMap = new Map<string, number>()
const touchTreeMap = (trees: TreeItem[]) => {
  trees.forEach((tree) => {
    if (!treeMap.has(tree.name)) {
      treeMap.set(tree.name, tree.id)
      tree.children && touchTreeMap(tree.children)
    }
  })
}

/** 更新tree树 */
const treeData = ref<TreeItem[]>([])
const upTree = () => {
  apiTreeAll()
    .then(menuDataToTree)
    .then((tree) => {
      treeData.value = tree
      touchTreeMap(tree)
    })
    .catch(tailError)
    .finally(() => {
      loading.value = false
    })
}

/** 发送修改权限 */
const postChange = (options: string[]) => {
  loading.value = true
  apiTreeAuthPush(props.groupId!, { options })
    .then(success)
    .catch(tailError)
    .finally(() => {
      loading.value = false
    })
}

/** 用户选择 */
const change = () => {
  if (treeComponent.value === undefined) {
    return
  }

  const callback = Reflect.get(treeComponent.value, 'getCheckedNodes')
  if (!(callback instanceof Function)) {
    return
  }

  if (loading.value) {
    return
  }

  const nodes: TreeItem[] = Reflect.apply(callback, treeComponent.value, [false, true])
  const names: string[] = nodes.map((n) => n.name)
  postChange(names)
}

upTree()

watchEffect(() => {
  if (props.groupId) {
    apiTreeAuthByGorupID(props.groupId).then((names) => {
      const ids: number[] = names.map((name) => treeMap.get(name)!).filter((i) => i !== undefined)
      checkedKeys.value = ids
    })
  }
})
</script>
