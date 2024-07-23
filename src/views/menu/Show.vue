<template>
  <section>
    <section>
      <el-button
        type="primary"
        :icon="Plus"
        plain
        @click="append({ id: 0, label: '根节点', name: 'top' })"
        >新增</el-button
      >
    </section>
    <el-divider></el-divider>
    <el-tree
      class="p-4"
      :data="treeData"
      node-key="id"
      default-expand-all
      :props="{ class: 'py-1' }"
    >
      <template #default="{ node, data }">
        <section class="flex justify-between w-full">
          <span>{{ node.label }}</span>
          <section>
            <el-button type="primary" link @click.stop="append(data)">添加</el-button>
            <el-button type="warning" link @click.stop="edit(data)">编辑</el-button>
            <el-popconfirm title="是否删除节点" @confirm="remove(data.id)">
              <template #reference>
                <el-button type="danger" link @click.stop>删除</el-button>
              </template>
            </el-popconfirm>
          </section>
        </section>
      </template>
    </el-tree>

    <!-- 添加节点 -->
    <PopupAppend title="添加节点" :width="500">
      <Append :close="closeAppend" :top="appendTop" @success="upTree" />
    </PopupAppend>

    <!-- 编辑节点 -->
    <PopupEdit title="编辑节点" :width="500">
      <Edit :close="closeEdit" :current="editData" />
    </PopupEdit>
  </section>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import nprogress from 'nprogress'
import { Plus } from '@element-plus/icons-vue'
import { usePopup } from '@/components/Popup'
import { apiTreeAll, apiTreeRemove } from '@/api'
import { menuDataToTree, success, tailError } from '@/helper/common'
import Append from './component/Append.vue'
import Edit from './component/Edit.vue'

/** 更新tree树 */
const treeData = ref<TreeItem[]>([])
const upTree = () => {
  nprogress.start()
  apiTreeAll()
    .then(menuDataToTree)
    .then((tree) => (treeData.value = tree))
    .catch(tailError)
    .finally(nprogress.done)
}

/** 删除分组 */
const remove = (id: number) =>
  apiTreeRemove(id)
    .then((res) => success(res, upTree))
    .catch(tailError)

/** 添加节点 */
const appendTop = ref({})
const [PopupAppend, openAppend, closeAppend] = usePopup()
const append = (tree: TreeItem) => {
  appendTop.value = tree
  openAppend()
}

/** 编辑节点 */
const editData = ref({})
const [PopupEdit, openEdit, closeEdit] = usePopup()
const edit = (tree: TreeItem) => {
  editData.value = tree
  openEdit()
}

upTree()
</script>
