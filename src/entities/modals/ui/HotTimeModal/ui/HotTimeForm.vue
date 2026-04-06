<template>
    <form class="hot-time-form" @submit.prevent="handleSubmit">
        <div class="hot-time-form__left">
            <div class="hot-time-form__nav">
                <AppButtonTypeIcon position="center" @click="onReturn">
                    <ArrowPrev class="hot-time-form__nav-icon" />
                </AppButtonTypeIcon>
            </div>
            <div class="hot-time-form__info">
                <HotTimeInfo />
            </div>
        </div>
        <div class="hot-time-form__right">
            <div class="hot-time-form__content">
                <div class="hot-time-form__row">
                    <AppInput
                        id="hot-time-name"
                        :value="formFields.name"
                        :is-error="v$.name.$error"
                        :is-success="!v$.name.$invalid"
                        is-required-field
                        :label-text="$t('form.fieldLabels.name')"
                        @on-input="onInput($event, 'name')"
                        @on-change="validate('name')"
                    />
                </div>
                <div class="hot-time-form__row">
                    <AppInput
                        id="hot-time-name"
                        v-maska
                        :value="formFields.phone"
                        :is-error="v$.phone.$error"
                        :is-success="!v$.phone.$invalid"
                        is-required-field
                        type="tel"
                        data-maska="+38 ### ### ####"
                        placeholder="+38"
                        :label-text="$t('form.fieldLabels.phone')"
                        @on-input="onInput($event, 'phone')"
                        @on-change="validate('phone')"
                    />
                </div>
            </div>
            <div class="hot-time-form__controls">
                <div class="hot-time-form__policy">
                    {{ $t('hotTimeModal.policy') }}
                    <a :href="localePath('/privacy')" class="hot-time-form__policy-link">
                        {{ $t('hotTimeModal.policyLink') }}
                    </a>
                </div>
                <div class="hot-time-form__actions">
                    <AppButton
                        full-width
                        :disabled="v$.$invalid"
                        type="submit"
                        class="hot-time-form__btn"
                    >
                        {{ $t('hotTimeModal.submitBtn') }}
                    </AppButton>
                </div>
            </div>
        </div>
    </form>
</template>

<script setup>
import AppButtonTypeIcon from '~/shared/ui/Buttons/AppButtonTypeIcon.vue'
import AppButton from '~/shared/ui/Buttons/AppButton.vue'
import ArrowPrev from '~/shared/assets/icons/arrow-prev.svg'
import AppInput from '~/shared/ui/Form/AppInput.vue'
import HotTimeInfo from './HotTimeInfo.vue'

import useVuelidate from '@vuelidate/core'
import { returnHotTimeFormRules } from '../utils/rules.js'
import { storeToRefs } from 'pinia'
import { steps } from '../constants/index.js'
import { addHotHours } from '../api'
import { TOAST_VARIANTS } from '~/shared/ui/Toast/constants'
import { useHotTimeModalStore } from '../store/store.js'
import { useRootStore } from '~/entities/root/store/root-store'
import { useToastStore } from '~/shared/ui/Toast/store/toast-store.js'
import { useModalsStore } from '~/entities/modals/store/modals-store.js'
import { useActiveModalsStore } from '~/entities/active-modals/store/active-modals.js'
import { useSuccessModalStore } from '~/entities/modals/ui/SuccessModal/store/success-modal-store.js'
import { useStaticDataStore } from '~/entities/root/store/static-data-store'
import { MODALS_KEYS } from '~/entities/active-modals/constants/index.js'
import { MARKETING_EVENTS, pushDataLayerEvent } from '~/shared/utils/marketing/dataLayerEvents'

const hotTimeModalStore = useHotTimeModalStore()
const rootStore = useRootStore()
const toast = useToastStore()
const modalsStore = useModalsStore()
const activeModalsStore = useActiveModalsStore()
const successModalStore = useSuccessModalStore()
const staticData = useStaticDataStore()
const { 
    formFields,
    selectedService,
    selectedDay,
    selectedTime,
    schedule,
    systemName,
    selectedMarketing
} = storeToRefs(hotTimeModalStore)
const { locale, t } = useI18n()
const localePath = useLocalePath()

const fields = computed(() => ({
    name: formFields.value.name,
    phone: formFields.value.phone
}))
const v$ = useVuelidate(returnHotTimeFormRules(), fields)

const onInput = (value, key) => hotTimeModalStore.SET_FORM_FIELDS({ key, value })
const validate = (key) => v$.value[key].$touch()
const onReturn = () => hotTimeModalStore.SELECT_STEP(steps.DATE_TIME_PICKER)

// const getLeadValue = computed(() => {
//     return selectedMarketing.value?.cpaValue || rootStore.pageMarketing 
//         ? rootStore.pageMarketing?.cpaValue 
//         : staticData.marketing?.cpaValue || null
// })
// const getLeadClassification = () => {
//     return selectedMarketing.value?.id || rootStore.pageMarketing 
//         ? rootStore.pageMarketing?.id 
//         : staticData.marketing?.id || null
// }

const generateGA4Code = () => ({
    path: window.location.href,
    event: selectedMarketing.value?.event || MARKETING_EVENTS.PARAGRAPHS_OTHER,
    cpaValue: selectedMarketing.value?.cpaValue || rootStore.pageMarketing?.cpaValue || staticData.marketing?.cpaValue || null,
    formtype: systemName.value
})

const generatePayload = () => {
    const dayKeys = schedule.value[selectedService.value.tid]
    const selectedDayKey = Object.entries(dayKeys)
        .find((el) => el[1].day === selectedDay.value.day)[0] || 0
    const [day, month] = selectedDayKey.split('.')
    const [hoursFrom, minutesFrom] = selectedTime.value.from.split(':')
    const [hoursTo, minutesTo] = selectedTime.value.to.split(':')
    const year = new Date().getFullYear()
    const timestampFrom = Date.parse(`${ month }/${ day }/${ year } ${ hoursFrom }:${ minutesFrom }:00`) / 1000
    const timestampTo = Date.parse(`${ month }/${ day }/${ year } ${ hoursTo }:${ minutesTo }:00`) / 1000
    const ga4Code = generateGA4Code()
    return {
        lang: locale.value,
        name: formFields.value.name,
        phone: formFields.value.phone.split(' ').join(''),
        subject: t('hotTimeModal.title'),
        message: '',
        system_name: systemName.value,
        url: window.location.href,
        service: selectedService.value.tid,
        timestampFrom,
        timestampTo,
        ga4Code: JSON.stringify(ga4Code),
        leadValue: selectedMarketing.value?.cpaValue || rootStore.pageMarketing?.cpaValue || staticData.marketing?.cpaValue || null,
        leadClassification: selectedMarketing.value?.id || rootStore.pageMarketing?.id || staticData.marketing?.id || null
    }
}
const handleSubmit = async () => {
    v$.value.$touch()

    if (v$.value.$invalid) return

    try {
        const ga4Code = generateGA4Code()
        const payload = generatePayload()
        rootStore.TOGGLE_LOADING_STATUS()
        const response = await addHotHours(payload)
        if (response?.error) {
            throw new Error(response?.error_message)
        }
        pushDataLayerEvent(ga4Code)
        successModalStore.SET_SUCCESS_MODAL_DATA({
            title: `${ t('hotTimeModal.successThanks') + formFields.value.name }!`,
            subtitle: t('hotTimeModal.successSubtitle'),
            description: t('hotTimeModal.successText')
        })
        modalsStore.TOGGLE_SUCCESS_MODAL()
        activeModalsStore.ADD_ACTIVE_KEYS([MODALS_KEYS.SUCCESS])
        modalsStore.TOGGLE_HOT_TIME_MODAL()
        activeModalsStore.REMOVE_ACTIVE_KEYS([MODALS_KEYS.HOT_TIME])
        hotTimeModalStore.$reset()
    } catch (err) {
        console.error(err)
        toast.add({
            title: t('global.toast.error.title'),
            description: t('global.toast.error.description'),
            variant: TOAST_VARIANTS.ERROR,
            id: Math.random()
        })
    } finally {
        rootStore.TOGGLE_LOADING_STATUS()
    }
}
</script>

<style scoped lang="scss">
.hot-time-form {
    display: flex;
    flex-direction: column;
    gap: 40px;
    height: 100%;

    @media (min-width: $tablet-breakpoint) {
        gap: 60px;
    }

    @media (min-width: $desktop-breakpoint) {
        flex-direction: row;
        gap: 128px;
    }

    @media (min-width: $lg-desktop-breakpoint) {
        gap: 288px;
    }

    &__left {
        display: flex;
        gap: 20px;

        @media (min-width: $tablet-breakpoint) {
            gap: 30px;
        }

        @media (min-width: $desktop-breakpoint) {
            flex-direction: column-reverse;
            justify-content: space-between;
            flex-shrink: 0;
            gap: 212px;
            width: 100%;
            max-width: 192px;
        }

        @media (min-width: $lg-desktop-breakpoint) {
            gap: 278px;
            max-width: 288px;
        }
    }

    &__nav {
        flex-shrink: 0;
    }

    &__info {
        flex-grow: 1;
    }

    &__nav-icon {
        width: 20px;
        height: 20px;
        stroke: $dark-500;

        @media (min-width: $tablet-breakpoint) {
            width: 22px;
            height: 22px;
        }
    }

    &__right {
        display: flex;
        flex-direction: column;
        flex-grow: 1;

        @media (min-width: $desktop-breakpoint) {
            flex-direction: row;
            gap: 64px;
        }

        @media (min-width: $lg-desktop-breakpoint) {
            gap: 96px;
        }
    }

    &__content {
        @media (min-width: $desktop-breakpoint) {
            width: calc(100% - 32px);
        }

        @media (min-width: $lg-desktop-breakpoint) {
            width: calc(100% - 48px);
        }
    }

    &__row {
        + .hot-time-form__row {
            margin-top: 10px;

            @media (min-width: $tablet-breakpoint) {
                margin-top: 16px;
            }

            @media (min-width: $desktop-breakpoint) {
                margin-top: 20px;
            }

            @media (min-width: $lg-desktop-breakpoint) {
                margin-top: 24px;
            }
        }
    }

    &__controls {
        margin-top: auto;

        @media (min-width: $desktop-breakpoint) {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            width: calc(100% - 32px);
            margin: 0;
        }

        @media (min-width: $lg-desktop-breakpoint) {
            width: calc(100% - 48px);
        }
    }

    &__policy {
        margin-bottom: 20px;
        font-size: 14px;
        line-height: 140%;
        color: $primary-300;

        @media (min-width: $tablet-breakpoint) {
            margin-bottom: 30px;
        }

        @media (min-width: $desktop-breakpoint) {
            max-width: 50%;
            margin: 0;
            margin-left: auto;
        }
    }

    &__actions {
        width: 50%;
        margin-left: auto;
    }

    &__btn,
    &__btn:hover {
        min-width: unset;
    }

    &__policy-link {
        font-weight: 400;
        color: $primary-500;

        @media (any-hover: hover) {
            &:hover {
                color: $primary-600;
            }
        }
    }
}
</style>