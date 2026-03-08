<template>
  <nav v-if="totalPages > 1" class="pagination" aria-label="Pagination">
    <button
      class="pagination__btn"
      :disabled="modelValue <= 1"
      aria-label="Previous page"
      @click="$emit('update:modelValue', modelValue - 1)"
    >
      <LucideChevronLeft :size="18" />
    </button>

    <template v-for="page in visiblePages" :key="page">
      <span v-if="page === '...'" class="pagination__ellipsis">…</span>
      <button
        v-else
        class="pagination__page"
        :class="{ 'pagination__page--active': page === modelValue }"
        :aria-label="`Page ${page}`"
        :aria-current="page === modelValue ? 'page' : undefined"
        @click="$emit('update:modelValue', page as number)"
      >
        {{ page }}
      </button>
    </template>

    <button
      class="pagination__btn"
      :disabled="modelValue >= totalPages"
      aria-label="Next page"
      @click="$emit('update:modelValue', modelValue + 1)"
    >
      <LucideChevronRight :size="18" />
    </button>
  </nav>
</template>

<script setup lang="ts">
const props = defineProps<{
  modelValue: number
  totalPages: number
}>()

defineEmits<{
  'update:modelValue': [page: number]
}>()

const visiblePages = computed(() => {
  const total = props.totalPages
  const current = props.modelValue
  const pages: (number | string)[] = []

  if (total <= 7) {
    for (let i = 1; i <= total; i++) pages.push(i)
    return pages
  }

  pages.push(1)

  if (current > 3) pages.push('...')

  const start = Math.max(2, current - 1)
  const end = Math.min(total - 1, current + 1)
  for (let i = start; i <= end; i++) pages.push(i)

  if (current < total - 2) pages.push('...')

  pages.push(total)
  return pages
})
</script>

<style scoped>
.pagination {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.375rem;
  margin-top: 2.5rem;
}

.pagination__btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 0.625rem;
  border: 1.5px solid var(--border-default);
  background: var(--surface-elevated);
  color: var(--text-secondary);
  font-family: var(--font-body);
  transition: all 0.15s ease;
}

.pagination__btn:hover:not(:disabled) {
  border-color: var(--ring-default);
  color: var(--color-primary);
}

.pagination__btn:disabled {
  opacity: 0.35;
  cursor: not-allowed;
}

.pagination__page {
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 2.5rem;
  height: 2.5rem;
  padding: 0 0.5rem;
  border-radius: 0.625rem;
  border: 1.5px solid transparent;
  background: transparent;
  font-size: 0.875rem;
  font-weight: 600;
  font-family: var(--font-body);
  color: var(--text-secondary);
  transition: all 0.15s ease;
}

.pagination__page:hover {
  background: var(--surface-muted);
  color: var(--text-primary);
}

.pagination__page--active {
  background: var(--color-primary);
  color: var(--text-on-primary);
  border-color: var(--color-primary);
}

.pagination__page--active:hover {
  background: var(--color-primary-600);
}

.pagination__ellipsis {
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 2rem;
  font-size: 0.875rem;
  color: var(--text-muted);
  user-select: none;
}
</style>
