<template>
    <AppModal
        :background="backgroundColor"
        :size="modalSize"
        @on-close="onClose"
    >
        <template #dots>
            <AppDots :total="3" :selected-step="selectedStepNumber" />
        </template>
        <template #option>
            {{ `[ ${ titles.subtitle } ]` }}
        </template>
        <template #title>
            <span class="label">{{ titles.title }}</span>
            <AppSelect
                v-if="step === STEPS.SELECT_DOCTORS"
                :items="services"
                :default-value="selectDefault"
                class="select"
                @on-select="onSelectService"
            >
                <template #heading-icon>
                    <AngleDownIcon />
                </template>
            </AppSelect>
        </template>
        <template #body>
            <ReviewModalBody @on-close="onClose" />
        </template>
    </AppModal>
</template>

<script setup>
import AppModal from '~/shared/ui/Modals/AppModal.vue'
import AppSelect from '~/shared/ui/Form/AppSelect.vue'
import AppDots from '~/shared/ui/Info/AppDots.vue'
import ReviewModalBody from './ui/ReviewModalBody.vue'

import { reviewModal } from '~/entities/modals/ui/ReviewModal/api'
import { useRootStore } from '~/entities/root/store/root-store'
import { useModalsStore } from '~/entities/modals/store/modals-store'
import { useReviewModalStore } from '~/entities/modals/ui/ReviewModal/store/review-modal-store'
import { useActiveModalsStore } from '~/entities/active-modals/store/active-modals'
import { MODALS_KEYS } from '~/entities/active-modals/constants'
import { STEPS } from './utils/variables'

import AngleDownIcon from '@/shared/assets/icons/angle-down.svg'

const rootStore = useRootStore()
const modalsStore = useModalsStore()
const activeModalsStore = useActiveModalsStore()
const reviewModalStore = useReviewModalStore()
const {
    step,
    dataForNewReview,
    currentUser,
    selectService
} = toRefs(reviewModalStore)

const { t, locale } = useI18n()

const stepsTitle = computed(() => ({
    [STEPS.SELECT_AUTH]: {
        title: t('reviewModal.introduceYourself'),
        subtitle: t('reviewModal.beforeReview')
    },
    [STEPS.SELECT_DOCTORS]: {
        title: t('reviewModal.about'),
        subtitle: t('reviewModal.addReview')
    },
    [STEPS.REVIEW_FORM]: {
        title: t('reviewModal.describe'),
        subtitle: `${ t('reviewModal.reviewAboutService') } ${ selectService.value?.label ? `«${ selectService.value.label }»` : '' }`
    }
}))
const selectedStepNumber = computed(() => ({
    [STEPS.SELECT_AUTH]: 1,
    [STEPS.SELECT_DOCTORS]: 2,
    [STEPS.REVIEW_FORM]: 3
}[step.value]))

const titles = computed(() => stepsTitle.value[step.value])
const backgroundColor = computed(() => step.value === STEPS.SELECT_DOCTORS ? '#E9E8EE' : '#FFF')
const services = computed(() => dataForNewReview.value.services_tids?.map((item) => ({ label: item.name, value: item.tid })))
const modalSize = computed(() => step.value === STEPS.SELECT_AUTH ? 'middle' : 'large')
const selectDefault = computed(() => selectService.value?.label || t('reviewModal.selectDefault'))

await useAsyncData('review-modal', async () => {
    rootStore.TOGGLE_LOADING_STATUS()

    if (!currentUser.value?.uid) {
        const user = await reviewModal.getGlobalVariables(locale.value)
        reviewModalStore.SET_CURRENT_USER(user.current_user)
        reviewModalStore.SET_FULL_NAME(user.current_user.full_name)
    }

    const response = await reviewModal.getDataForNewReview(locale.value)

    reviewModalStore.SET_DATA_FOR_NEW_REVIEW(response)

    rootStore.TOGGLE_LOADING_STATUS()
})

const onClose = () => {
    modalsStore.TOGGLE_REVIEW_MODAL()
    reviewModalStore.RESET_REVIEW_MODAL()
    activeModalsStore.REMOVE_ACTIVE_KEYS([MODALS_KEYS.REVIEW])
}

const onSelectService = (payload) => {
    reviewModalStore.SET_SERVICE(payload)
}

onMounted(() => {
    if (currentUser.value?.uid) {
        reviewModalStore.SET_STEP(STEPS.SELECT_DOCTORS)
        reviewModalStore.SET_FULL_NAME(currentUser.value.full_name)
    }
})
</script>

<style lang="scss" scoped>
.label {
    font-size: 24px;
    font-weight: 700;
    line-height: 120%;
    vertical-align: middle;

    @media (min-width: $tablet-breakpoint) {
        font-size: 28px;
    }

    @media (min-width: $desktop-breakpoint) {
        font-size: 32px;
    }

    @media (min-width: $lg-desktop-breakpoint) {
        font-size: 48px;
    }
}

.select {
    margin-left: 7px;

    @media (min-width: $tablet-breakpoint) {
        margin-left: 10px;
    }

    @media (min-width: $desktop-breakpoint) {
        margin-left: 12px;
    }

    @media (min-width: $lg-desktop-breakpoint) {
        margin-left: 15px;
    }
}
</style>
