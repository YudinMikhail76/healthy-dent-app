<template>
    <div class="review-form">
        <div class="review-form__heading">
            <div class="review-form__prev">
                <AppButtonTypeIcon position="center" @on-click="onPrevious">
                    <ArrowPrevIcon />
                </AppButtonTypeIcon>
            </div>
            <div class="review-form__persons">
                <ReviewFormPerson
                    :name="currentUser.full_name"
                    :img="currentUser.user_picture"
                    type="author"
                />
                <BlockSeparator />
                <div class="review-form__doctors">
                    <ReviewFormPerson
                        v-for="doctor in selectDoctors"
                        :key="doctor.nid"
                        :name="doctor.title"
                        :img-doctor="doctor.picture"
                        type="doctor"
                    />
                </div>
            </div>
        </div>
        <div class="review-form__inner">
            <div class="review-form__inputs">
                <AppRating
                    :mark="newReview.rating"
                    size="medium"
                    variant="primary"
                    @on-change="onChangeRating"
                />
                <AppTextarea
                    id="review-comment"
                    :value="fields.text"
                    :label-text="$t('reviewModal.yourExperience')"
                    is-required-field
                    :is-error="v$.text.$invalid && v$.text.$dirty"
                    :is-success="!v$.text.$error && v$.text.$dirty"
                    @on-input="handleInput($event)"
                    @on-change="validate('text')"
                />
            </div>
            <div class="review-form__button">
                <div class="review-form__button-wrapper">
                    <AppButton full-width @on-click="handleSubmitClick">
                        {{ $t('reviewModal.send') }}
                    </AppButton>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import AppButtonTypeIcon from '~/shared/ui/Buttons/AppButtonTypeIcon.vue'
import AppButton from '~/shared/ui/Buttons/AppButton.vue'
import AppRating from '~/shared/ui/Info/AppRating.vue'
import AppTextarea from '~/shared/ui/Form/AppTextarea.vue'
import BlockSeparator from '~/shared/ui/Separators/BlockSeparator.vue'
import ReviewFormPerson from './ReviewFormPerson.vue'

import { reviewModal } from '~/entities/modals/ui/ReviewModal/api'
import { useReviewModalStore } from '~/entities/modals/ui/ReviewModal/store/review-modal-store'
import { returnReviewFormRules } from '~/entities/modals/ui/ReviewModal/utils/rules.js'
import { useRootStore } from '~/entities/root/store/root-store'
import { useToastStore } from '~/shared/ui/Toast/store/toast-store'
import { useSuccessModalStore } from '~/entities/modals/ui/SuccessModal/store/success-modal-store'
import { useModalsStore } from '~/entities/modals/store/modals-store'
import { useActiveModalsStore } from '~/entities/active-modals/store/active-modals'
import { TOAST_VARIANTS } from '~/shared/ui/Toast/constants'
import { STEPS } from '~/entities/modals/ui/ReviewModal/utils/variables'
import { MODALS_KEYS } from '~/entities/active-modals/constants'

import useVuelidate from '@vuelidate/core'
import ArrowPrevIcon from '~/shared/assets/icons/arrow-prev.svg'

const emit = defineEmits(['on-close'])

const toast = useToastStore()
const rootStore = useRootStore()
const reviewModalStore = useReviewModalStore()
const successModalStore = useSuccessModalStore()
const modalsStore = useModalsStore()
const activeModalsStore = useActiveModalsStore()

const {
    currentUser,
    selectDoctors,
    newReview
} = toRefs(reviewModalStore)

const { t, locale } = useI18n()
const fields = ref({
    text: ''
})

const rules = computed(() => returnReviewFormRules())
const v$ = useVuelidate(rules, fields)
const handleInput = (value) => fields.value.text = value
const validate = (key) => v$.value[key].$touch()
const resetForm = () => {
    fields.value.text = ''
    v$.value.$reset()
}

const successForm = computed(() => ({
    title: `${ t('reviewModal.thankYou') } ${ currentUser.value.name }!`,
    subtitle: t('reviewModal.thankYouSubtitle'),
    description: t('reviewModal.thankYouText')
}))

const onPrevious = () => {
    reviewModalStore.SET_STEP(STEPS.SELECT_DOCTORS)
}

const onChangeRating = (value) => {
    reviewModalStore.SET_RATING(value)
}

const handleSubmitSuccess = () => {
    emit('on-close')
    resetForm()
    successModalStore.SET_SUCCESS_MODAL_DATA(successForm.value)
    modalsStore.TOGGLE_SUCCESS_MODAL()
    activeModalsStore.ADD_ACTIVE_KEYS([MODALS_KEYS.SUCCESS])
    refreshNuxtData('reviews-page')
    rootStore.TOGGLE_LOADING_STATUS()
}

const handleSubmitError = (error) => {
    emit('on-close')
    console.warn('Error sendCtaEmbeddedFormData: ', error)
    toast.add({
        title: t('global.toast.error.title'),
        description: t('global.toast.error.description'),
        variant: TOAST_VARIANTS.ERROR,
        id: Math.random()
    })
}

const handleSubmitClick = async () => {
    v$.value.$touch()

    if (v$.value.$error) return

    const body = {
        ...newReview.value,
        ...fields.value
    }

    try {
        rootStore.TOGGLE_LOADING_STATUS()
        await reviewModal.addReview(body, locale.value)
        handleSubmitSuccess()
    } catch (error) {
        handleSubmitError(error)
    }
}
</script>

<style lang="scss" scoped>
.review-form {
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 40px;
    height: 100%;

    @media (min-width: $desktop-breakpoint) {
        flex-direction: row;
        justify-content: space-between;
    }

    @media (min-width: $lg-desktop-breakpoint) {
        gap: 96px;
    }

    &__heading {
        display: flex;
        gap: 20px;

        @media (min-width: $tablet-breakpoint) {
            gap: 30px;
        }

        @media (min-width: $desktop-breakpoint) {
            flex-direction: column-reverse;
            justify-content: space-between;
            gap: 64px;
            width: 25%;
            min-height: 328px;
        }

        @media (min-width: $lg-desktop-breakpoint) {
            width: 384px;
            min-height: 418px;
        }
    }

    &__persons {
        display: flex;
        flex-direction: column;
        gap: 10px;

        @media (min-width: $tablet-breakpoint) {
            gap: 15px;
        }

        @media (min-width: $desktop-breakpoint) {
            gap: 20px;
        }

        @media (min-width: $lg-desktop-breakpoint) {
            gap: 24px;
        }
    }

    &__doctors {
        display: flex;
        flex-direction: column;
        gap: 10px;

        @media (min-width: $tablet-breakpoint) {
            gap: 15px;
        }

        @media (min-width: $desktop-breakpoint) {
            gap: 20px;
        }

        @media (min-width: $lg-desktop-breakpoint) {
            gap: 24px;
        }
    }

    &__inner {
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        @media (min-width: $desktop-breakpoint) {
            width: 69%;
        }

        @media (min-width: $lg-desktop-breakpoint) {
            width: 1152px;
        }
    }

    &__inputs {
        display: flex;
        flex-direction: column;
        gap: 20px;

        @media (min-width: $desktop-breakpoint) {
            gap: 40px;
        }

        @media (min-width: $lg-desktop-breakpoint) {
            gap: 48px;
        }
    }

    &__button {
        position: absolute;
        bottom: 0;
        display: flex;
        justify-content: end;
        width: 100%;

        @media (min-width: $desktop-breakpoint) {
            position: relative;
        }
    }

    &__button-wrapper {
        width: 50%;
    }
}
</style>