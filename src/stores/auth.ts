import { apiUserCurrent } from '@/api'
import { defineStore } from 'pinia'
import { reactive } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  const user = reactive<UserData>({
    id: 0,
    avatar: 0,
    avatar_path: null,
    email: '',
    group_id: 0,
    group_text: '',
    name: '',
    updated_at: null,
    created_at: null
  })

  const upUser = async () => {
    const udata = await apiUserCurrent()
    Object.assign(user, udata)
  }

  const setUserData = (update: UserData) => {
    Object.assign(user, update)
  }

  return { user, setUserData, upUser }
})
