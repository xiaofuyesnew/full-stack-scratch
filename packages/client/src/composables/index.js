export function useExample() {
  const count = ref(0)
  const doubleCount = computed(() => count.value * 2)
  const increment = () => count.value++
  return { count, doubleCount, increment }
}
