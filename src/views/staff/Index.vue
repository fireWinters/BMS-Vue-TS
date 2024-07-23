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

    <!-- 新增员工 -->
    <PushPopup title="员工新增" :width="500">
      <PushStaff :close="PushClose" @success="reLoadTableData" />
    </PushPopup>

    <!-- 编辑员工 -->
    <EditPopup title="员工编辑" :width="500">
      <EditStaff :fromData="editData" :close="EditClose" @success="reLoadTableData" />
    </EditPopup>
  </section>
</template>

<script setup lang="ts">
import EditStaff from './component/EditStaff.vue'
import PushStaff from './component/PushStaff.vue'
import { Plus, Refresh } from '@element-plus/icons-vue'
import { apiStaffList, apiStaffRePass } from '@/api'
import { usePageTable } from '@/components/PageTable'
import { usePopup } from '@/components/Popup'
import { codeIndexTableColumn } from './vars'
import { ref } from 'vue'
import { success, tailError } from '@/helper/common'

/** 重置用户密码 */
const rePass = (staffId: number) => apiStaffRePass(staffId).then(success).catch(tailError)

/** 编辑员工弹窗 */
const editData = ref({})
const [EditPopup, EditOpen, EditClose] = usePopup()

/** 新增员工弹窗 */
const [PushPopup, PushOpen, PushClose] = usePopup()

/** 员工数据列表 */
const [PageTable, reLoadTableData] = usePageTable({
  request: apiStaffList,
  columns: codeIndexTableColumn((action, data) => {
    if (action === 'edit') {
      editData.value = data
      EditOpen()
    }

    if (action === 'rePass') {
      rePass(data.id)
    }
  })
})
</script>
