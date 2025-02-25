export function paginator(path: string, query: Record<string, string | number> = {}) {
  const items = ref<any[]>([])
  const isLoading = ref(false)
  const isFull = ref(false)
  const cursor = ref<string | null>(null)

  const offset = 500

  const buildQueryParams = (
    params: Record<string, string | number>,
    cursor: string | null
  ) => {
    const query = new URLSearchParams(params as any)
    if (cursor) {
      query.set('cursor', cursor)
    }
    return query.toString()
  }

  const fetchData = async () => {
    if (isLoading.value || isFull.value) return
    isLoading.value = true

    try {
      const queryString = buildQueryParams(query, cursor.value)
      const response = await fetch(`${path}?${queryString}`)
      const data = await response.json()

      if (data.data.length > 0) {
        items.value.push(...data.data)
        cursor.value = data.cursor
      } else {
        isFull.value = true
      }
    } catch (error) {
      console.error('Ошибка загрузки:', error)
    } finally {
      isLoading.value = false
    }
  }

  const onScroll = () => {
    const scrollY = window.scrollY
    const windowHeight = window.innerHeight
    const documentHeight = document.documentElement.scrollHeight

    if (scrollY + windowHeight >= documentHeight - offset) {
      fetchData()
    }
  }

  const reset = (newQuery: Record<string, string | number> = {}) => {
    items.value = []
    cursor.value = null
    isFull.value = false

    query = newQuery
    fetchData()
  }

  onMounted(() => {
    fetchData()
    window.addEventListener('scroll', onScroll)
  })

  onUnmounted(() => {
    window.removeEventListener('scroll', onScroll)
  })

  return { items, isLoading, isFull, reset }
}
