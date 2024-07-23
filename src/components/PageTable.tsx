import { tailError } from '@/helper/common'
import nprogress from 'nprogress'
import { ElPagination, ElTable, ElTableColumn } from 'element-plus'
import { useSlots, ref, watchEffect } from 'vue'

type Option = {
  request: PageResquestLike<any>
  columns: Array<TableColumn<any>>
  hidePagination?: boolean
  pageSizes?: number[]
  formData?: Record<string, unknown>
}
export const usePageTable = (option: Option) => {
  const { request, columns, hidePagination } = option
  const formData = option.formData ?? {}
  const page = ref(1)
  const pageSize = ref(10)
  const pageSizes = option.pageSizes ?? [10, 20, 50, 100]
  const total = ref(0)
  const tableData = ref<Array<any>>([])

  const codePageParams = () => ({
    page: page.value,
    pageSize: pageSize.value,
    ...formData
  })
  const handleLoadData = () => {
    nprogress.start()
    request(codePageParams())
      .then((res) => {
        const { data, to } = res
        tableData.value = data
        total.value = to
      })
      .catch(tailError)
      .finally(nprogress.done)
  }

  watchEffect(handleLoadData)

  const PageTable = () => {
    const slots = useSlots()

    return (
      <section>
        {/* <!-- 顶部搜索表单 --> */}
        <section>{slots.search && slots.search()}</section>

        {/* <!-- 按钮组插槽 --> */}
        <section class="my-5">{slots.action && slots.action()}</section>

        {/* 表格 */}
        <section class="my-5">
          <ElTable class="w-full" border data={tableData.value}>
            {columns.map((column: any) => {
              return (
                <ElTableColumn
                  {...column}
                  v-slots={
                    column.render
                      ? {
                          default: (scope: any) => column.render && column.render(scope.row)
                        }
                      : null
                  }
                ></ElTableColumn>
              )
            })}
          </ElTable>
        </section>

        {/* 分页 */}
        {!hidePagination && (
          <section class="my-5">
            <ElPagination
              background
              pageSizes={pageSizes}
              v-model:pageSize={pageSize.value}
              v-model:currentPage={page.value}
              layout="sizes, prev, pager, next, jumper, total"
              total={total.value}
            ></ElPagination>
          </section>
        )}
      </section>
    )
  }

  return [
    PageTable,
    (reset = false) => {
      if (reset === false) {
        handleLoadData()
      } else {
        page.value = 1
        pageSize.value = pageSizes[0]
        handleLoadData()
      }
    }
  ] as const
}
