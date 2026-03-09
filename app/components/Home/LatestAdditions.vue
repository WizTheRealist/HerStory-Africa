<template>
  <section class="section latest">
    <div class="section__header">
      <h2 class="section__title">Latest Additions</h2>
      <p class="section__subtitle">Profiles from the archive</p>
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
  </section>
</template>

<script setup lang="ts">
const { data: women } = await useAsyncData("latest-women", () =>
  queryCollection("women").order("born", "DESC").limit(3).all(),
);
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
</style>
