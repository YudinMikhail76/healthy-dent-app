export const useAccordionControls = (initialValue = '') => {
    const activeAccordion = ref(initialValue)

    const selectActiveAccordion = (selected) => {
        if (activeAccordion.value === selected) {
            activeAccordion.value = ''
        } else {
            activeAccordion.value = selected
        }
    }

    return [activeAccordion, selectActiveAccordion]
}