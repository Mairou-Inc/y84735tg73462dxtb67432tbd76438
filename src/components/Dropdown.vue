<script setup lang="ts">
const props = defineProps<{
  options: Option[]
  modelValue: Option
}>()

const emit = defineEmits(['update:modelValue'])

const selected = ref<Option>(props.modelValue)
const isOpen = ref(false)
const dropdownRef = ref<HTMLElement | null>(null)
const activeIndex = ref(
  props.options.findIndex((opt) => opt.value === selected.value?.value) || 0
)

const toggleDropdown = () => {
  isOpen.value = !isOpen.value
}

const selectOption = (option: Option, index: number) => {
  selected.value = option
  activeIndex.value = index
  isOpen.value = false
  emit('update:modelValue', option)
}

const handleKeydown = (event: KeyboardEvent) => {
  if (!isOpen.value) return
  if (event.key === 'ArrowDown') {
    activeIndex.value = (activeIndex.value + 1) % props.options.length
  } else if (event.key === 'ArrowUp') {
    activeIndex.value =
      (activeIndex.value - 1 + props.options.length) % props.options.length
  } else if (event.key === 'Enter') {
    selectOption(props.options[activeIndex.value], activeIndex.value)
  }
}

const handleClickOutside = (event: MouseEvent) => {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target as Node)) {
    isOpen.value = false
  }
}

watch(
  () => props.modelValue,
  (newVal) => {
    selected.value = newVal
    activeIndex.value = props.options.findIndex((opt) => opt.value === newVal.value)
  }
)

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
  document.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
  document.removeEventListener('keydown', handleKeydown)
})
</script>

<template>
  <div ref="dropdownRef" class="dropdown">
    <div class="dropdown-selected" @click="toggleDropdown">
      {{ selected.label }}
      <span class="arrow" :class="{ open: isOpen }">▼</span>
    </div>
    <ul v-if="isOpen" class="dropdown-list">
      <li
        v-for="(option, index) in options"
        :key="option.value"
        class="dropdown-item"
        :class="{ active: index === activeIndex }"
        @click="selectOption(option, index)"
      >
        {{ option.label }}
      </li>
    </ul>
  </div>
</template>
