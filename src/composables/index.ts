import { store } from '@/store'

export const API_URL = import.meta.env.VITE_API_URL

export const clipboard = async (text: string): Promise<void> => {
  const s = store()

  if (navigator.clipboard && window.isSecureContext) {
    await navigator.clipboard.writeText(text)
    s.opt.isCopied = true
  } else {
    const textArea = document.createElement('textarea')
    textArea.value = text
    textArea.style.position = 'absolute'
    textArea.style.left = '-999999px'

    document.body.prepend(textArea)
    textArea.select()

    try {
      document.execCommand('copy')
    } catch (error) {
      console.error(error)
    } finally {
      textArea.remove()
    }
    s.opt.isCopied = true
  }
  showNotification('Copied')
}

export const showNotification = async (
  message: string,
  type?: string | null
): Promise<void> => {
  const s = store()
  s.notification.message = message
  s.notification.type = 'success'
  if (type === 'fail') s.notification.type = type
  s.notification.isShow = true
}
