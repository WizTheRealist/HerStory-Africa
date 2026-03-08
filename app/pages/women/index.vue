<template>
  <div class="women-listing">
    <header class="women-listing__header">
      <h1 class="women-listing__title">Women of HerStory Africa</h1>
      <p class="women-listing__subtitle">
        {{ totalCount }} women across the archive. Search, filter, and explore.
      </p>
    </header>

    <div class="women-listing__toolbar">
      <SearchBar
        v-model="searchQuery"
        placeholder="Search by name or country…"
        class="women-listing__search"
        @submit="currentPage = 1"
      />

      <div class="women-listing__filters">
        <FilterBy
          v-model="activeRegion"
          label="Region"
          :options="[...REGIONS]"
        />
        <FilterBy
          v-model="activeEra"
          label="Era"
          :options="[...ERAS]"
        />
      </div>
    </div>

    <div v-if="paginatedWomen.length" class="women-listing__grid">
      <WomanCard
        v-for="woman in paginatedWomen"
        :key="woman.slug"
        :name="woman.name"
        :slug="woman.slug"
        :image="woman.image"
        :country="woman.country"
        :born="woman.born"
        :died="woman.died"
        :era="woman.era"
        :summary="woman.summary"
        :causes="woman.causes"
      />
    </div>

    <div v-else class="women-listing__empty">
      <LucideSearchX :size="40" />
      <p>No women match your current filters.</p>
      <button class="women-listing__clear-btn" @click="clearFilters">
        Clear all filters
      </button>
    </div>

    <Pagination
      v-model="currentPage"
      :total-pages="totalPages"
    />
  </div>
</template>

<script setup lang="ts">
import { REGIONS, ERAS } from '~/utils/constants/content'

const route = useRoute()
const router = useRouter()

const PER_PAGE = 9

const searchQuery = ref((route.query.q as string) ?? '')
const activeRegion = ref((route.query.region as string) ?? '')
const activeEra = ref((route.query.era as string) ?? '')
const activeCause = ref((route.query.cause as string) ?? '')
const currentPage = ref(1)

const { data: allWomen } = await useAsyncData('all-women', () =>
  queryCollection('women').order('name', 'ASC').all(),
)

const filteredWomen = computed(() => {
  if (!allWomen.value) return []

  return allWomen.value.filter((w) => {
    const q = searchQuery.value.toLowerCase().trim()
    if (q && !w.name.toLowerCase().includes(q) && !w.country.toLowerCase().includes(q)) {
      return false
    }
    if (activeRegion.value && w.region !== activeRegion.value) return false
    if (activeEra.value && w.era !== activeEra.value) return false
    if (activeCause.value && !w.causes.some(c => c === activeCause.value)) return false
    return true
  })
})

const totalCount = computed(() => allWomen.value?.length ?? 0)
const totalPages = computed(() => Math.ceil(filteredWomen.value.length / PER_PAGE))

const paginatedWomen = computed(() => {
  const start = (currentPage.value - 1) * PER_PAGE
  return filteredWomen.value.slice(start, start + PER_PAGE)
})

watch([searchQuery, activeRegion, activeEra, activeCause], () => {
  currentPage.value = 1
  const query: Record<string, string> = {}
  if (searchQuery.value) query.q = searchQuery.value
  if (activeRegion.value) query.region = activeRegion.value
  if (activeEra.value) query.era = activeEra.value
  if (activeCause.value) query.cause = activeCause.value
  router.replace({ query })
})

function clearFilters() {
  searchQuery.value = ''
  activeRegion.value = ''
  activeEra.value = ''
  activeCause.value = ''
}

useSeoMeta({
  title: 'All Women',
  description: 'Browse the full archive of African women who shaped history — filter by region, era, or cause.',
})
</script>

<style scoped>
.women-listing {
  max-width: 64rem;
  margin: 0 auto;
  padding: 2rem 1.5rem 3.5rem;
}

@media (min-width: 768px) {
  .women-listing {
    padding: 2.5rem 2rem 4rem;
  }
}

.women-listing__header {
  margin-bottom: 2rem;
}

.women-listing__title {
  font-size: clamp(1.5rem, 3.5vw, 2.25rem);
  font-weight: 800;
  color: var(--text-primary);
  margin: 0;
}

.women-listing__subtitle {
  font-size: 1rem;
  color: var(--text-muted);
  margin: 0.375rem 0 0;
}

.women-listing__toolbar {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.women-listing__search {
  max-width: 100%;
}

.women-listing__filters {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

@media (min-width: 640px) {
  .women-listing__filters {
    flex-direction: row;
    gap: 2rem;
  }
}

.women-listing__grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.25rem;
}

@media (min-width: 480px) {
  .women-listing__grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 768px) {
  .women-listing__grid {
    grid-template-columns: repeat(3, 1fr);
    gap: 1.5rem;
  }
}

.women-listing__empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
  padding: 4rem 1rem;
  text-align: center;
  color: var(--text-muted);
}

.women-listing__empty p {
  margin: 0;
  font-size: 1rem;
}

.women-listing__clear-btn {
  padding: 0.5rem 1.25rem;
  font-size: 0.875rem;
  font-weight: 600;
  font-family: var(--font-body);
  border-radius: 9999px;
  border: 1.5px solid var(--border-default);
  background: var(--surface-elevated);
  color: var(--text-secondary);
  transition: all 0.15s ease;
}

.women-listing__clear-btn:hover {
  border-color: var(--ring-default);
  color: var(--color-primary);
}
</style>
