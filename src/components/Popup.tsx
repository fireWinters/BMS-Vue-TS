import { ElDialog } from 'element-plus'
import { ref, type Ref, type Slots } from 'vue'

type PopuProp = {
  title?: string
  width?: string | number
  visible: Ref<boolean>
  onClose: () => void
}
const _Popup = (props: PopuProp, { slots }: { slots: { default: () => JSX.Element } }) => {
  const title = props.title || '温馨提醒'
  const content = slots.default()
  const visible = props.visible

  return (
    <ElDialog
      class={'rounded-md'}
      width={props.width}
      title={title}
      modelValue={visible.value}
      beforeClose={props.onClose}
    >
      {content}
    </ElDialog>
  )
}

export const usePopup = () => {
  let visible = ref(false)
  const onClose = () => {
    visible.value = false
  }
  const onOpen = () => {
    visible.value = true
  }

  const Popup: (prop: { title?: string; width?: string | number }, slots: Slots) => JSX.Element = (
    props,
    slots
  ) => _Popup({ ...props, visible, onClose }, slots as any)

  return [Popup, onOpen, onClose] as const
}
