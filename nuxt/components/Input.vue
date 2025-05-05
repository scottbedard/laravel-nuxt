<template>
  <div>
    <label
      v-if="label"
      class="block mb-2 text-sm/6 font-medium text-gray-900"
      :for="id">
      {{ label }}
    </label>

    <input
      v-model="model"
      class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-primary-600 sm:text-sm/6" 
      :id
      :placeholder
      :type>
  </div>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    id?: string
    label?: string
    placeholder?: string
    type?: string
  }>(),
  {
    id: () => `input-${useId()}`,
    type: 'text',
  }
)

const model = defineModel<string>({ default: '' })
</script>

