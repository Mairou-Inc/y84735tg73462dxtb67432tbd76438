<script setup lang="ts">
import { computed } from 'vue'
import { useAccountsStore } from '@/account'
import Dropdown from '@/components/Dropdown.vue'

const s = useAccountsStore()

const addAccount = () => s.addAccount()
const removeAccount = (id: number) => s.removeAccount(id)

const parseLabel = (value: string) =>
  value.split(';').map((text) => ({ text: text.trim() }))

const accounts = computed(() =>
  s.accounts.map((acc) => {
    const labelText = acc.label.map((l) => l.text).join('; ')
    const isLocal = acc.type.value === 'Локальная'
    const isValidLogin = acc.login.trim().length > 0
    const isValidPassword = isLocal ? !!acc.password?.trim() : true

    return { ...acc, labelText, isLocal, isValidLogin, isValidPassword }
  })
)
</script>

<template>
  <Cntr>
    <Line v-for="acc in accounts" :key="acc.id" class="account">
      <input
        type="text"
        :value="acc.labelText"
        @blur="
          s.updateAccount(acc.id, {
            label: parseLabel(($event.target as HTMLInputElement).value),
          })
        "
        placeholder="Метка (необяз.)"
        :maxlength="50"
      />

      <input
        type="text"
        v-model="acc.login"
        :class="{ invalid: !acc.isValidLogin }"
        @blur="s.updateAccount(acc.id, { login: acc.login.trim() })"
        placeholder="Логин (Обязательное)"
        :maxlength="100"
      />

      <Dropdown
        :options="accountTypes"
        v-model="acc.type"
        @update:modelValue="
          s.updateAccount(acc.id, {
            type: $event,
            password: $event.value === 'LDAP' ? null : acc.password,
          })
        "
        class="min-w-30"
      />

      <input
        v-if="acc.isLocal"
        type="password"
        v-model="acc.password"
        :class="{ invalid: !acc.isValidPassword }"
        @blur="s.updateAccount(acc.id, { password: acc.password?.trim() })"
        placeholder="Пароль (Обязательное)"
        :maxlength="100"
      />

      <Btn
        @click="removeAccount(acc.id)"
        class="btn max-w-min"
        icon="material-symbols:delete-forever-rounded"
        icon_clr="white"
      />
    </Line>
    <Btn
      @click="addAccount"
      class="btn max-w-min"
      icon="material-symbols:add-2-rounded"
      icon_clr="white"
    />
  </Cntr>
</template>

<style scoped>
.invalid {
  border: 1px solid red;
}
</style>
