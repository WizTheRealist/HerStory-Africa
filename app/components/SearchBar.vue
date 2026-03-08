<template>
  <div class="search-bar" :class="{ 'search-bar--focused': isFocused }">
    <LucideSearch class="search-bar__icon" :size="20" />
    <input
      ref="inputRef"
      :value="modelValue"
      type="text"
      :placeholder="placeholder"
      class="search-bar__input"
      @input="
        $emit('update:modelValue', ($event.target as HTMLInputElement).value)
      "
      @focus="isFocused = true"
      @blur="isFocused = false"
      @keydown.enter="$emit('submit')"
    />
    <button
      v-show="modelValue"
      class="search-bar__clear"
      aria-label="Clear search"
      @click="$emit('update:modelValue', '')"
    >
      <LucideX :size="16" />
    </button>
  </div>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    modelValue: string;
    placeholder?: string;
  }>(),
  {
    placeholder: "Search women, causes, countries…",
  },
);

defineEmits<{
  "update:modelValue": [value: string];
  submit: [];
}>();

const isFocused = ref(false);
const inputRef = ref<HTMLInputElement>();

defineExpose({ focus: () => inputRef.value?.focus() });
</script>

<style scoped>
.search-bar {
  position: relative;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  width: 100%;
  max-width: 36rem;
  padding: 0.875rem 1.25rem;
  background: var(--surface-elevated);
  border: 1.5px solid var(--border-default);
  border-radius: 9999px;
  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease;
}

.search-bar--focused {
  border-color: var(--ring-default);
  box-shadow: 0 0 0 3px rgba(181, 69, 27, 0.12);
}

.search-bar__icon {
  flex-shrink: 0;
  color: var(--text-muted);
  transition: color 0.2s ease;
}

.search-bar--focused .search-bar__icon {
  color: var(--ring-default);
}

.search-bar__input {
  flex: 1;
  min-width: 0;
  font-size: 1rem;
  color: var(--text-primary);
  background: transparent;
}

.search-bar__input::placeholder {
  color: var(--text-muted);
}

.search-bar__clear {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 9999px;
  color: var(--text-muted);
  background: var(--surface-muted);
  transition:
    background 0.15s ease,
    color 0.15s ease;
}

.search-bar__clear:hover {
  background: var(--surface-subtle);
  color: var(--text-primary);
}
</style>
