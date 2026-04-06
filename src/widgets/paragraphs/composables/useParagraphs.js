export const useParagraphs = (paragraphs = []) => {
    const topParagraphs = computed(() => paragraphs?.filter((p) => p.position === 'top'))
    const bottomParagraphs = computed(() => paragraphs?.filter((p) => p.position !== 'top'))
    const isEmpty = computed(() => paragraphs?.length === 0)

    return {
        topParagraphs,
        bottomParagraphs,

        isEmpty
    }
}