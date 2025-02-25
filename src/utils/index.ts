export const STATIC_URL = import.meta.env.VITE_STATIC_URL

export const getFileUrl = (name: string) => {
  const STATIC_URL = import.meta.env.VITE_STATIC_URL
  return `${STATIC_URL}${name}`
}

export const scrollUp = (): void => {
  console.log('UP')
  window.scrollTo(0, 0)
}

export const scrollDown = (): void => {
  console.log('DOWN')
  window.scrollTo(0, document.body.scrollHeight)
}

export const smStr = (data: string): string => data.slice(0, 6)
export const mdStr = (data: string): string => data.slice(0, 10)

export const shortNum = (n: number, withZero: boolean = false) => {
  if (n === 0 || n === undefined) return withZero ? '0' : null
  if (n < 1e3 && n % 1 === 0) return n.toString()
  if (n < 1e3 && n % 1 !== 0) return n.toFixed(2)
  if (n >= 1e3 && n < 1e6) return +(n / 1e3).toFixed(1) + 'K'
  if (n >= 1e6 && n < 1e9) return +(n / 1e6).toFixed(1) + 'M'
  if (n >= 1e9 && n < 1e12) return +(n / 1e9).toFixed(1) + 'B'
  if (n >= 1e12) return +(n / 1e12).toFixed(1) + 'T'
}

export const sepNum = (number: number): string => {
  try {
    if (number == 0) {
      return '0'
    }
    const parts = number.toFixed(2).split('.')
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',')

    return parts[0]
  } catch {
    return number.toString()
  }
}

export const shortDate = (datetime: string): string => {
  const date = new Date(datetime)

  const day = String(date.getDate()).padStart(2, '0')
  const month = String(date.getMonth() + 1).padStart(2, '0') // месяцы начинаются с 0, поэтому добавляем 1
  const year = date.getFullYear()

  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')
  const seconds = String(date.getSeconds()).padStart(2, '0')

  return `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`
}

export const formatDateAgo = (datetime: string): string => {
  const date = new Date(datetime)
  const now = new Date()

  let diff = Math.abs(now.getTime() - date.getTime())

  const units = [
    { label: 'y', ms: 365 * 24 * 60 * 60 * 1000 },
    { label: 'd', ms: 24 * 60 * 60 * 1000 },
    { label: 'h', ms: 60 * 60 * 1000 },
    { label: 'm', ms: 60 * 1000 },
    { label: 's', ms: 1000 },
  ]

  for (const unit of units) {
    const value = Math.floor(diff / unit.ms)
    if (value > 0) {
      return `${value}${unit.label}`
    }
  }

  return '0s'
}

export const inputFiat = (number: string): string => {
  if (number[0] == '0') {
    number = number.slice(1)
  }

  return number
    .replace(/ /g, '') // Remove spaces
    .replace(/[^0-9]/g, '') // Remove all non-numeric characters
}
