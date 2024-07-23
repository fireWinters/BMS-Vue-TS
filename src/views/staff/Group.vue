<template>
  <section class="container-white">
    <PageTable>
      <template #action>
        <section>
          <el-button type="primary" :icon="Plus" plain @click="PushOpen">新增</el-button>
          <el-button type="success" :icon="Refresh" @click="reLoadTableData(true)" plain>
            刷新
          </el-button>
        </section>
      </template>
    </PageTable>

    <!-- 新增分组 -->
    <PushPopup title="分组新增" :width="500">
      <PushGroup :close="PushClose" @success="reLoadTableData" />
    </PushPopup>

    <!-- 编辑分组 -->
    <EditPopup title="分组编辑" :width="500">
      <EditGroup :fromData="editData" :close="EditClose" @success="reLoadTableData" />
    </EditPopup>

    <!-- 岗位权限 -->
    <AuthPopup title="岗位权限" :width="1000">
      <TreeAuth :groupId="groupId" :close="AuthClose" />
    </AuthPopup>
  </section>
</template>

<script setup lang="ts">
import EditGroup from './component/EditGroup.vue'
import PushGroup from './component/PushGroup.vue'
import { Plus, Refresh } from '@element-plus/icons-vue'
import { apiStaffGroup, apiStaffGroupRemove } from '@/api'
import { usePageTable } from '@/components/PageTable'
import { usePopup } from '@/components/Popup'
import { codeGroupTableColumn } from './vars/group'
import { ref } from 'vue'

import { success, tailError } from '@/helper/common'
import TreeAuth from '@/components/TreeAuth.vue'

/** 删除分组 */
const remove = (id: number) =>
  apiStaffGroupRemove(id)
    .then((res) => success(res, reLoadTableData))
    .catch(tailError)

/** 编辑分组弹窗 */
const editData = ref({})
const [EditPopup, EditOpen, EditClose] = usePopup()

/** 新增分组弹窗 */
const [PushPopup, PushOpen, PushClose] = usePopup()

/** 岗位权限弹窗 */
const groupId = ref(0)
const [AuthPopup, AuthOpen, AuthClose] = usePopup()

/** 分组数据列表 */
const [PageTable, reLoadTableData] = usePageTable({
  request: apiStaffGroup,
  columns: codeGroupTableColumn((action, data) => {
    if (action === 'edit') {
      console.log(data)
      editData.value = data
      EditOpen()
    }

    if (action === 'remove') {
      remove(data.id).then(() => reLoadTableData())
    }

    if (action === 'auth') {
      groupId.value = data.id
      AuthOpen()
    }
  })
})
</script>
