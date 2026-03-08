<template>
  <div class="articles-listing">
    <header class="articles-listing__header">
      <h1 class="articles-listing__title">Articles &amp; Explainers</h1>
      <p class="articles-listing__subtitle">
        Context, analysis, and the bigger picture behind the stories.
      </p>
    </header>

    <div v-if="paginatedArticles.length" class="articles-listing__list">
      <ArticleCard
        v-for="article in paginatedArticles"
        :key="article.slug"
        :title="article.title"
        :description="article.description"
        :date="article.date"
        :slug="article.slug"
      />
    </div>

    <div v-else class="articles-listing__empty">
      <LucideBookOpen :size="40" />
      <p>No articles yet. Check back soon.</p>
    </div>

    <Pagination v-model="currentPage" :total-pages="totalPages" />
  </div>
</template>

<script setup lang="ts">
const PER_PAGE = 10;
const currentPage = ref(1);

const { data: allArticles } = await useAsyncData("all-articles", () =>
  queryCollection("articles").order("date", "DESC").all(),
);

const totalPages = computed(() =>
  Math.ceil((allArticles.value?.length ?? 0) / PER_PAGE),
);

const paginatedArticles = computed(() => {
  if (!allArticles.value) return [];
  const start = (currentPage.value - 1) * PER_PAGE;
  return allArticles.value.slice(start, start + PER_PAGE);
});

useSeoMeta({
  title: "Articles & Explainers",
  description:
    "Context, analysis, and the bigger picture behind the stories of African women who shaped history.",
});
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
</style>
