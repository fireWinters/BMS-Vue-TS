/**
 * 折柱混合
 * https://echarts.apache.org/examples/zh/editor.html?c=mix-line-bar
 */

type Serie = {
  name: string
  list: Array<{
    value: string | number
    from: string | number
  }>
}
export class OptionCategoryValue {
  constructor(protected line: Serie[], protected bar: Serie[]) {}

  toJSON() {
    const { tooltip, toolbox, legend, xAxis, yAxis, series } = this
    return { tooltip, toolbox, legend, xAxis, yAxis, series }
  }

  private get xAxisData() {
    const { line, bar } = this
    const list = Array.prototype.concat.apply(
      [],
      [...line.map((e) => e.list), ...bar.map((e) => e.list)]
    )

    const withFrom = (item: { from: unknown }) => item.from
    const data = [...new Set(list.map(withFrom))]
    return data
  }

  get tooltip() {
    return {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        crossStyle: {
          color: '#999'
        }
      }
    }
  }

  get toolbox() {
    return {
      feature: {
        dataView: { show: true, readOnly: false },
        magicType: { show: true, type: ['line', 'bar'] },
        restore: { show: true },
        saveAsImage: { show: true }
      }
    }
  }

  get legend() {
    const { line, bar } = this
    const withName = (item: { name: unknown }) => item.name
    const data = [...line.map(withName), ...bar.map(withName)]
    return { data }
  }

  get xAxis() {
    const data = this.xAxisData

    return [
      {
        data,
        type: 'category',
        axisPointer: { type: 'shadow' }
      }
    ]
  }

  get yAxis() {
    const { bar } = this
    const list = bar.map((e) => ({ name: e.name, type: 'value' }))
    return list
  }

  get series() {
    const { bar, line } = this
    const toSeries = (s: Serie, type: 'bar' | 'line') => ({
      name: s.name,
      data: s.list,
      type
    })
    const series = [...bar.map((b) => toSeries(b, 'bar')), ...line.map((l) => toSeries(l, 'line'))]

    return series
  }
}
