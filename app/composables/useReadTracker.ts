import type { Ref } from "vue";
import { useAppStore } from "~/store/app";

/**
 * Marks content as read when a sentinel element scrolls into view.
 * Place a <div ref="readSentinel" /> near the bottom of the content area.
 */
export default function useReadTracker(
  type: "article" | "woman",
  slug: string,
  sentinel: Ref<HTMLElement | null>,
) {
  const store = useAppStore();

  function observeElement(el: HTMLElement) {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          store.markAsRead(type, slug);
          observer.disconnect();
        }
      },
      { threshold: 0.1 },
    );

    observer.observe(el);
    onBeforeUnmount(() => observer.disconnect());
  }

  onMounted(() => {
    if (store.isRead(type, slug)) return;

    if (sentinel.value) {
      observeElement(sentinel.value);
      return;
    }

    const unwatch = watch(sentinel, (el) => {
      if (!el) return;
      observeElement(el);
      unwatch();
    });
  });
}
