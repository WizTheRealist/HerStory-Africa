<template>
  <section class="section regions">
    <div class="section__header">
      <h2 class="section__title">Browse by Region</h2>
    </div>

    <div class="regions__grid">
      <NuxtLink
        v-for="region in regionData"
        :key="region.name"
        :to="{ path: '/women', query: { region: region.name } }"
        class="region-card"
        :style="{ '--accent': region.accent }"
      >
        <div class="region-card__icon">
          <LucideMapPin :size="24" />
        </div>
        <h3 class="region-card__name">{{ region.name }}</h3>
        <p class="region-card__count">
          {{ region.count }} {{ region.count === 1 ? 'woman' : 'women' }}
        </p>
        <LucideArrowRight :size="16" class="region-card__arrow" />
      </NuxtLink>
    </div>
  </section>
</template>

<script setup lang="ts">
const regionMeta = [
  { name: 'West Africa', accent: 'var(--color-primary)' },
  { name: 'East Africa', accent: 'var(--color-forest)' },
  { name: 'Southern Africa', accent: 'var(--color-secondary)' },
] as const

const { data: counts } = await useAsyncData('region-counts', async () => {
  const results = await Promise.all(
    regionMeta.map(r =>
      queryCollection('women').where('region', '=', r.name).count(),
    ),
  )
  return results
})

const regionData = computed(() =>
  regionMeta.map((r, i) => ({
    ...r,
    count: counts.value?.[i] ?? 0,
  })),
)
</script>

<style scoped>
.regions__grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
}

@media (min-width: 640px) {
  .regions__grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

.region-card {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.5rem;
  padding: 1.5rem;
  border-radius: 1rem;
  background: var(--surface-elevated);
  border: 1.5px solid var(--border-light);
  text-decoration: none;
  color: inherit;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
  position: relative;
}

.region-card:hover {
  border-color: var(--accent);
  box-shadow: var(--shadow-soft);
}

.region-card__icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.75rem;
  height: 2.75rem;
  border-radius: 0.75rem;
  background: var(--surface-subtle);
  color: var(--accent);
}

.region-card:hover .region-card__icon {
  background: color-mix(in srgb, var(--accent) 10%, transparent);
}

.region-card__name {
  font-size: 1.125rem;
  font-weight: 700;
  color: var(--text-primary);
  margin: 0.25rem 0 0;
}

.region-card__count {
  font-size: 0.875rem;
  color: var(--text-muted);
  margin: 0;
}

.region-card__arrow {
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
  color: var(--text-muted);
  transition: transform 0.2s ease, color 0.2s ease;
}

.region-card:hover .region-card__arrow {
  transform: translateX(3px);
  color: var(--accent);
}
</style>
