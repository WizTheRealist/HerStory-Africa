<template>
  <section class="section latest">
    <div class="section__header">
      <h2 class="section__title">Latest Additions</h2>
      <p class="section__subtitle">Recently added to the archive</p>
    </div>

    <div v-if="women?.length" class="latest__women">
      <WomanCard
        v-for="woman in women"
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

    <div v-if="articles?.length" class="latest__articles">
      <h3 class="latest__articles-heading">
        <LucideBookOpen :size="18" />
        Articles &amp; Explainers
      </h3>
      <div class="latest__articles-list">
        <ArticleCard
          v-for="article in articles"
          :key="article.slug"
          :title="article.title"
          :description="article.description"
          :date="article.date"
          :slug="article.slug"
        />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const { data: women } = await useAsyncData('latest-women', () =>
  queryCollection('women')
    .order('born', 'DESC')
    .limit(3)
    .all(),
)

const { data: articles } = await useAsyncData('latest-articles', () =>
  queryCollection('articles')
    .all(),
)
</script>

<style scoped>
.latest__women {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.25rem;
}

@media (min-width: 480px) {
  .latest__women {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 768px) {
  .latest__women {
    grid-template-columns: repeat(3, 1fr);
    gap: 1.5rem;
  }
}

.latest__articles {
  margin-top: 2.5rem;
}

.latest__articles-heading {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.125rem;
  font-weight: 700;
  color: var(--text-primary);
  margin: 0 0 1rem;
}

.latest__articles-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}
</style>
