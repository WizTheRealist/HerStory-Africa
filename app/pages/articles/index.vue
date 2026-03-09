<template>
  <div class="articles-listing">
    <header class="articles-listing__header">
      <h1 class="articles-listing__title">Articles & Explainers</h1>
      <p class="articles-listing__subtitle">
        {{ totalCount }} articles. Context, analysis, and the bigger picture.
      </p>
    </header>

    <div class="articles-listing__toolbar">
      <SearchBar
        v-model="searchQuery"
        placeholder="Search articles…"
        class="articles-listing__search"
        @submit="currentPage = 1"
      />
      <FilterBy
        v-model="activeCategory"
        label="Category"
        :options="[...ARTICLE_CATEGORIES]"
      />
    </div>

    <div v-if="paginatedArticles.length" class="articles-listing__list">
      <ArticleCard
        v-for="article in paginatedArticles"
        :key="article.slug"
        :title="article.title"
        :description="article.description"
        :date="article.date"
        :slug="article.slug"
        :category="article.category"
      />
    </div>

    <div v-else class="articles-listing__empty">
      <LucideSearchX :size="40" />
      <p>No articles match your current filters.</p>
      <button class="articles-listing__clear-btn" @click="clearFilters">
        Clear all filters
      </button>
    </div>

    <Pagination v-model="currentPage" :total-pages="totalPages" />
  </div>
</template>

<script setup lang="ts">
import { ARTICLE_CATEGORIES } from '~/utils/constants/content'

const route = useRoute()
const router = useRouter()

const PER_PAGE = 10
const searchQuery = ref((route.query.q as string) ?? '')
const activeCategory = ref((route.query.category as string) ?? '')
const currentPage = ref(Number(route.query.page) || 1)

const { data: allArticles } = await useAsyncData('all-articles', () =>
  queryCollection('articles').order('date', 'DESC').all(),
)

const filteredArticles = computed(() => {
  if (!allArticles.value) return []

  return allArticles.value.filter((a) => {
    const q = searchQuery.value.toLowerCase().trim()
    if (q && !a.title.toLowerCase().includes(q) && !a.description.toLowerCase().includes(q)) {
      return false
    }
    if (activeCategory.value && a.category !== activeCategory.value) return false
    return true
  })
})

const totalCount = computed(() => allArticles.value?.length ?? 0)
const totalPages = computed(() => Math.ceil(filteredArticles.value.length / PER_PAGE))

const paginatedArticles = computed(() => {
  const start = (currentPage.value - 1) * PER_PAGE
  return filteredArticles.value.slice(start, start + PER_PAGE)
})

watch([searchQuery, activeCategory], () => {
  currentPage.value = 1
  const query: Record<string, string> = {}
  if (searchQuery.value) query.q = searchQuery.value
  if (activeCategory.value) query.category = activeCategory.value
  router.replace({ query })
})

watch(currentPage, (page) => {
  const query: Record<string, string> = {}
  if (searchQuery.value) query.q = searchQuery.value
  if (activeCategory.value) query.category = activeCategory.value
  if (page > 1) query.page = String(page)
  router.replace({ query })
})

function clearFilters() {
  searchQuery.value = ''
  activeCategory.value = ''
}

useSeoMeta({
  title: 'Articles & Explainers',
  description: 'Context, analysis, and the bigger picture behind the stories of African women who shaped history.',
})
</script>

<style scoped>
.articles-listing {
  max-width: 48rem;
  margin: 0 auto;
  padding: 2rem 1.5rem 3.5rem;
}

@media (min-width: 768px) {
  .articles-listing {
    padding: 2.5rem 2rem 4rem;
  }
}

.articles-listing__header {
  margin-bottom: 2rem;
}

.articles-listing__title {
  font-size: clamp(1.5rem, 3.5vw, 2.25rem);
  font-weight: 800;
  color: var(--text-primary);
  margin: 0;
}

.articles-listing__subtitle {
  font-size: 1rem;
  color: var(--text-muted);
  margin: 0.375rem 0 0;
}

.articles-listing__toolbar {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  margin-bottom: 2rem;
}

.articles-listing__search {
  max-width: 100%;
}

.articles-listing__list {
  display: flex;
  flex-direction: column;
  gap: 0.875rem;
}

.articles-listing__empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
  padding: 4rem 1rem;
  text-align: center;
  color: var(--text-muted);
}

.articles-listing__empty p {
  margin: 0;
  font-size: 1rem;
}

.articles-listing__clear-btn {
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

.articles-listing__clear-btn:hover {
  border-color: var(--ring-default);
  color: var(--color-primary);
}
</style>
