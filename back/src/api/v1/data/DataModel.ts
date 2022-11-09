export interface DataModel {
  chart_one: MultipleChart,
  chart_two: Data,
  chart_three: Data,
  chart_four: Data
}

interface Data {
  labels: string[],
  data: number[]
}

interface MultipleChart {
  data1: Data,
  data2: Data,
  data3: Data
}