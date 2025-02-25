<script setup lang="ts">
defineProps<{
  active?: boolean
  disabled?: boolean
  text?: string
  icon?: string
  bg_clr?: string
  bg_clr_active?: string
  icon_clr?: string
  icon_clr_active?: string
  icon_size?: string
}>()
</script>

<template>
  <button
    :disabled="disabled"
    :style="{
      backgroundColor: active
        ? bg_clr_active || 'var(--btn_clr_active)'
        : bg_clr || 'var(--btn_clr)',
    }"
  >
    <Icon
      v-if="icon"
      :icon="icon"
      class="svg"
      :style="{
        color: active ? icon_clr_active || 'black' : icon_clr || 'white',
        fontSize: icon_size || '1.2rem',
      }"
    />
    <span v-if="text" :style="{ color: active ? 'black' : 'white' }">
      {{ text }}
    </span>
  </button>
</template>
