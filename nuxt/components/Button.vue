<template>
  <component
    :class="[
      'border font-semibold px-3 py-2 rounded-lg shadow-xs text-sm',
      'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600',
      {
        'cursor-pointer': !disabled,

        'bg-slate-800 text-white hover:bg-slate-700': variant === 'primary',

        'border-gray-200 hover:border-gray-300': variant === 'secondary',

        'border-transparent hover:border-gray-300': variant === 'ghost',
      },
    ]"
    :disabled
    :is="to ? NuxtLink : 'button'"
    :to>
    <slot />
  </component>
</template>

<script setup lang="ts">
import { NuxtLink } from '#components'

withDefaults(
  defineProps<{
    disabled?: boolean
    to?: string
    variant?: 'ghost' | 'secondary' | 'primary'
  }>(),
  {
    disabled: false,
    to: undefined,
    variant: 'primary',
  }
)
</script>

