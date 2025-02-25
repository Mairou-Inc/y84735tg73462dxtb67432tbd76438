import { defineStore } from 'pinia'

export const useAccountsStore = defineStore('accounts', {
  state: () => ({
    accounts: [] as Account[],
  }),
  actions: {
    addAccount() {
      this.accounts.push({
        id: Date.now(),
        label: [],
        type: { value: 'LDAP', label: 'LDAP' },
        login: '',
        password: null,
      })
    },
    removeAccount(id: number) {
      this.accounts = this.accounts.filter((acc) => acc.id !== id)
    },
    updateAccount(id: number, data: Partial<Account>) {
      const account = this.accounts.find((acc) => acc.id === id)
      if (account) Object.assign(account, data)
    },
  },
  persist: true,
})
