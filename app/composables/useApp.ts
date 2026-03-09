import { useAppStore } from "~/store/app";

export default () => {
  const store = useAppStore();
  const { readArticles, readWomen, favoriteWomen, favoriteArticles } =
    storeToRefs(store);

  return {
    readArticles,
    readWomen,
    favoriteWomen,
    favoriteArticles,
    toggleFavorite: store.toggleFavorite,
    markAsRead: store.markAsRead,
    isFavorite: store.isFavorite,
    isRead: store.isRead,
  };
};
