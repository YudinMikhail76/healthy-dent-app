import { scrollController } from '../utils/scrollController'

export const useDisabledScroll = (shouldDisable) => {
    watch(() => shouldDisable, (disable) => {
        if (disable.value) {
            scrollController.disable()
        } else {
            scrollController.enable()
        }
    }, { deep: true })
}