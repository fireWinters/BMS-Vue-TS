import { apiStaffGroupAll, apiUserCurrent } from '@/api'
import { defineStore } from 'pinia'
import { reactive, ref } from 'vue'

export const useStaffGroupStore = defineStore('staffGroup', () => {
  const groups = reactive<
    {
      id: number
      name: string
    }[]
  >([])
  let geting = false

  const upStaffGroup = async () => {
    geting = true
    const list = await apiStaffGroupAll()
    if (groups.length === 0) {
      groups.push(...list)
    } else {
      const onlyList = new Set([...groups, ...list])
      groups.splice(0, groups.length)
      groups.push(...onlyList)
    }
    geting = false
  }

  if (groups.length === 0 && !geting) {
    upStaffGroup()
  }

  return { groups, upStaffGroup }
})
