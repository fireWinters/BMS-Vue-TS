import type { apiStaffGroup } from '@/api'
import { ElButton, ElPopconfirm } from 'element-plus'
import { InfoFilled } from '@element-plus/icons-vue'

type CodeGroupTableColumn<D> = (
  tap: (action: 'edit' | 'remove' | 'auth', data: D) => unknown
) => Array<TableColumn<D>>
export const codeGroupTableColumn: CodeGroupTableColumn<
  ReturnPageResultData<typeof apiStaffGroup>
> = (tap) => [
  {
    prop: 'id',
    label: 'ID',
    width: 50
  },
  {
    prop: 'name',
    label: ''
  },

  {
    prop: 'created_at',
    label: '创建时间'
  },
  {
    prop: 'updated_at',
    label: '更新时间'
  },
  {
    prop: '_',
    label: '操作',
    fixed: 'right',
    render(row) {
      return (
        <section>
          <ElPopconfirm
            icon={InfoFilled}
            title={`删除分组`}
            confirm-button-text="确认"
            cancel-button-text="取消"
            onConfirm={() => tap('remove', row)}
            v-slots={{
              reference() {
                return (
                  <ElButton link type="danger" size="small">
                    删除
                  </ElButton>
                )
              }
            }}
          ></ElPopconfirm>
          <ElButton link type="success" size="small" onClick={() => tap('auth', row)}>
            权限
          </ElButton>
          <ElButton link type="warning" size="small" onClick={() => tap('edit', row)}>
            编辑
          </ElButton>
        </section>
      )
    }
  }
]
