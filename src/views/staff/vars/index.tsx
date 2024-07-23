import type { apiStaffList } from '@/api'
import { ElAvatar, ElButton, ElPopconfirm } from 'element-plus'
import { InfoFilled } from '@element-plus/icons-vue'

type CodeIndexTableColumn<D> = (
  tap: (action: 'edit' | 'rePass', data: D) => unknown
) => Array<TableColumn<D>>
export const codeIndexTableColumn: CodeIndexTableColumn<
  ReturnPageResultData<typeof apiStaffList>
> = (tap) => [
  {
    prop: 'id',
    label: 'ID',
    width: 50
  },
  {
    prop: 'avatar_path',
    label: '头像',
    render(data) {
      if (data.avatar_path === null) {
        return '/'
      }
      return <ElAvatar shape="square" size={50} src={data.avatar_path} alt={data.name} />
    }
  },
  {
    prop: 'name',
    label: '登录名'
  },
  {
    prop: 'email',
    label: '邮箱'
  },
  {
    prop: 'group_text',
    label: '分组'
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
            title={`重置 "${row.name}" 为初始密码`}
            icon-color="#626AEF"
            confirm-button-text="确认"
            cancel-button-text="取消"
            onConfirm={() => tap('rePass', row)}
            v-slots={{
              reference() {
                return (
                  <ElButton link type="success" size="small">
                    重置密码
                  </ElButton>
                )
              }
            }}
          ></ElPopconfirm>
          <ElButton link type="warning" size="small" onClick={() => tap('edit', row)}>
            编辑
          </ElButton>
        </section>
      )
    }
  }
]
