<template>
  <div class="filter-by" :class="{ 'filter-by--inline': inline }">
    <div v-if="label" class="filter-by__header">
      <LucideSlidersHorizontal :size="16" class="filter-by__icon" />
      <span class="filter-by__label">{{ label }}</span>
    </div>
    <div class="filter-by__pills">
      <button
        class="filter-pill"
        :class="{ 'filter-pill--active': !modelValue }"
        @click="$emit('update:modelValue', '')"
      >
        All
      </button>
      <button
        v-for="option in options"
        :key="option"
        class="filter-pill"
        :class="{ 'filter-pill--active': modelValue === option }"
        @click="$emit('update:modelValue', modelValue === option ? '' : option)"
      >
        {{ option }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
  label?: string
  options: string[]
  modelValue: string
  inline?: boolean
}>(), {
  label: '',
  inline: false,
})

defineEmits<{
  'update:modelValue': [value: string]
}>()
</script>

<style scoped>
.filter-by--inline {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.filter-by--inline .filter-by__header {
  margin-bottom: 0;
}

.filter-by__header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
}

.filter-by__icon {
  color: var(--text-muted);
}

.filter-by__label {
  font-size: 0.8125rem;
  font-weight: 600;
  color: var(--text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.filter-by__pills {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.filter-pill {
  padding: 0.4375rem 1rem;
  font-size: 0.875rem;
  font-weight: 500;
  font-family: var(--font-body);
  border-radius: 9999px;
  border: 1.5px solid var(--border-default);
  background: var(--surface-elevated);
  color: var(--text-secondary);
  transition: all 0.2s ease;
  white-space: nowrap;
}

.filter-pill:hover {
  border-color: var(--ring-default);
  color: var(--text-primary);
}

.filter-pill--active {
  background: var(--color-primary);
  border-color: var(--color-primary);
  color: var(--text-on-primary);
}

.filter-pill--active:hover {
  background: var(--color-primary-600);
  border-color: var(--color-primary-600);
  color: var(--text-on-primary);
}
</style>
