export interface Option {
  value: string
  label: string
}

export const accountTypes: Option[] = [
  { value: 'LDAP', label: 'LDAP' },
  { value: 'Локальная', label: 'Локальная' },
]

export interface Account {
  id: number
  label: { text: string }[]
  type: Option
  login: string
  password: string | null
}
