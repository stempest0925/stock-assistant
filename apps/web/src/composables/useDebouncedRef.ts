import { ref, watch } from "vue";

export default function useDebouncedRef<T>(initialValue: T, delay = 300) {
  const state = ref(initialValue);
  const debounced = ref(initialValue);

  let timer: number | undefined;

  watch(state, (val) => {
    clearTimeout(timer);
    timer = window.setTimeout(() => {
      debounced.value = val;
    }, delay);
  });

  return { state, debounced };
}
