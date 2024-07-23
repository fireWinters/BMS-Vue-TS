import { ElButton, ElForm, ElFormItem } from 'element-plus'
import { Search, RefreshRight } from '@element-plus/icons-vue'
import { reactive } from 'vue'

type Option = {
  codeColumns: () => readonly [Array<FormColumn<any>>, Record<string, unknown>]
  showSubmitBtn?: boolean
  showResetBtn?: boolean
}
export const useSearchInLine = (option: Option) => {
  const { codeColumns, showSubmitBtn, showResetBtn } = option
  const [columns, formData] = codeColumns()
  const data = reactive({})

  const SearchInLine = () => {
    return (
      <ElForm inline={true} class="-mb-5">
        {columns.map((column) => (
          <ElFormItem key={column.name}>{column.render(formData)}</ElFormItem>
        ))}
        {(!showResetBtn || !showSubmitBtn) && (
          <ElFormItem>
            {showSubmitBtn && (
              <ElButton type="primary" onClick={() => Object.assign(data, formData)} icon={Search}>
                查询
              </ElButton>
            )}

            {showResetBtn && (
              <ElButton native-type="reset" icon={RefreshRight}>
                重置
              </ElButton>
            )}
          </ElFormItem>
        )}
      </ElForm>
    )
  }

  return [SearchInLine, showSubmitBtn ? data : formData]
}
