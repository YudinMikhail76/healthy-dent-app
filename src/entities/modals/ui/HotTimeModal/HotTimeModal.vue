<template>
    <AppModal
        :background="modalBg"
        size="fit-screen"
        class="hot-time-modal"
        @on-close="onClose"
    >
        <template #option>
            [ {{ activePromotion }} ]
        </template>
        <template #title>
            {{ $t('hotTimeModal.title') }} {{ discount }}
        </template>
        <template #body>
            <HotTimeBody />
        </template>
        <template #dots>
            <AppDots :total="3" :selected-step="selectedStepNumber" />
        </template>
    </AppModal>
</template>

<script setup>
import AppModal from '~/shared/ui/Modals/AppModal.vue'
import HotTimeBody from './ui/HotTimeBody.vue'
import AppDots from '~/shared/ui/Info/AppDots.vue'
import { steps } from './constants/index.js'
import { storeToRefs } from 'pinia'
import { MODALS_KEYS } from '~/entities/active-modals/constants/index.js'
import { useModalsStore } from '~/entities/modals/store/modals-store.js'
import { useHotTimeModalStore } from './store/store.js'
import { useActiveModalsStore } from '~/entities/active-modals/store/active-modals.js'
import { isNonEmptyObject } from '~/shared/utils/helpers'

const modalsStore = useModalsStore()
const hotTimeModalStore = useHotTimeModalStore()
const activeModalsStore = useActiveModalsStore()
const {
    step,
    generalPromo,
    promotion
} = storeToRefs(hotTimeModalStore)

const hasPromotion = computed(() => promotion.value
    && isNonEmptyObject(promotion.value) 
    && Object.keys(promotion.value)?.length
)
const modalBg = computed(() => step.value === steps.FORM ? '#fff' : '#E9E8EE')
const activePromotion = computed(() => {
    return hasPromotion.value && `${ promotion.value?.amount } ${ promotion.value?.description }`
        || generalPromo.value
        || ''
})
const discount = computed(() => promotion.value?.amount ? `(${ promotion.value?.amount })` : '')
const selectedStepNumber = computed(() => ({
    [steps.SERVICES]: 1,
    [steps.DATE_TIME_PICKER]: 2,
    [steps.FORM]: 3
}[step.value]))

const onClose = () => {
    modalsStore.TOGGLE_HOT_TIME_MODAL()
    activeModalsStore.REMOVE_ACTIVE_KEYS([MODALS_KEYS.HOT_TIME])
    hotTimeModalStore.$reset()
}
</script>

<style scoped lang="scss">
.hot-time-modal {
    :deep(.modal__inner--fit-screen) {
        @media (min-width: $desktop-breakpoint) {
            padding-bottom: 87px;

            .modal__wrapper {
                height: 100%;
            }
        }

    }
}
</style>