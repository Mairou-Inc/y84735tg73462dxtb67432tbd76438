import { defineStore } from 'pinia'

export const store = defineStore('store', {
  state: () => ({
    me: {
      // id: localStorage.user_id,
      // avatar_s: localStorage.avatar_s,
      // avatar_b: localStorage.avatar_b,
      // name: localStorage.name,
      // balance: localStorage.balance,
    },

    notification: {
      message: '',
      type: 'success',
      isShow: false,
    },

    rules: {
      fee: 1,
      minDeposit: 0.1,
      minPrice: 0.01,
      maxPrice: 1000000000000,
      maxTagsCount: 5,
      mobailMin: 600,
      maxLengthName: 32,
      maxLengthDescription: 256,
    },

    opt: {
      isLock: false,
      isMobile: false,
      isCopied: false,

      itemsMode: localStorage.itemsMode || 'updated_desc',
    },
  }),

  actions: {
    checkScreenSize() {
      this.opt.isMobile = window.innerWidth < 700
    },

    initResizeListener() {
      this.checkScreenSize()
      window.addEventListener('resize', this.checkScreenSize)
    },
  },
})
