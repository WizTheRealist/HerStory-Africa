export const useAppStore = defineStore(
  "app",
  () => {
    const readArticles = ref<string[]>([]);
    const readWomen = ref<string[]>([]);
    const favoriteWomen = ref<string[]>([]);
    const favoriteArticles = ref<string[]>([]);

    function getList(
      kind: "favorite" | "read",
      type: "article" | "woman",
    ): Ref<string[]> {
      if (kind === "favorite")
        return type === "article" ? favoriteArticles : favoriteWomen;
      return type === "article" ? readArticles : readWomen;
    }

    function toggleFavorite(type: "article" | "woman", slug: string) {
      const list = getList("favorite", type);
      const idx = list.value.indexOf(slug);
      if (idx === -1) list.value.push(slug);
      else list.value.splice(idx, 1);
    }

    function markAsRead(type: "article" | "woman", slug: string) {
      const list = getList("read", type);
      if (!list.value.includes(slug)) list.value.push(slug);
    }

    function isFavorite(type: "article" | "woman", slug: string) {
      return getList("favorite", type).value.includes(slug);
    }

    function isRead(type: "article" | "woman", slug: string) {
      return getList("read", type).value.includes(slug);
    }

    return {
      readWomen,
      readArticles,
      favoriteWomen,
      favoriteArticles,
      toggleFavorite,
      markAsRead,
      isFavorite,
      isRead,
    };
  },
  {
    persist: {
      storage: import.meta.client ? localStorage : undefined,
    },
  },
);
