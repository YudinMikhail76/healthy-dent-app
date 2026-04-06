<template>
    <div class="cta-embedded-form">
        <div class="cta-embedded-form__text-content">
            <div class="cta-embedded-form__title">
                {{ data.title }}
            </div>
            <div class="cta-embedded-form__text" v-html="data.text" />
        </div>
        <BlockSeparator class="is-desktop-hide" />
        <div class="cta-embedded-form__form">
            <div class="cta-embedded-form__inputs">
                <AppInput
                    :id="`name-${ data.id }`"
                    class="cta-embedded-form__name"
                    :value="fields.name"
                    :is-error="v$.name.$invalid && v$.name.$dirty"
                    :is-success="!v$.name.$invalid && !v$.name.$dirty"
                    :label-text="`${ $t('embeddedForm.fields.nameLabel') } *`"
                    @on-input="handleInput($event, 'name')"
                    @on-change="validate('name')"
                />
                <AppInput
                    :id="`phone-${ data.id }`"
                    v-maska
                    type="tel"
                    :value="fields.phone"
                    :is-error="v$.phone.$invalid && v$.phone.$dirty"
                    :is-success="!v$.phone.$invalid && !v$.phone.$dirty"
                    data-maska="+38 ### ### ####"
                    placeholder="+38"
                    :label-text="`${ $t('embeddedForm.fields.phone') } *`"
                    @on-input="handleInput($event, 'phone')"
                    @on-change="validate('phone')"
                />
            </div>
            <div class="cta-embedded-form__checkbox-block">
                <AppCheckbox
                    :id="`policy-${ data.id }`"
                    value
                    is-checked
                    disabled
                />
                <div class="cta-embedded-form__policy-text">
                    {{ $t('policy.embeddedForm') }}
                    <AppLink
                        v-if="data?.privacy_policy_link"
                        :to="localePath(data.privacy_policy_link)"
                        class="cta-embedded-form__policy-link"
                    >
                        {{ $t('policy.link') }}
                    </AppLink>
                    <span v-else>
                        {{ $t('policy.link') }}
                    </span>
                </div>
            </div>
            <div class="cta-embedded-form__contacts">
                <div class="cta-embedded-form__contacts-text">
                    <ClientOnly>
                        <a :href="`tel:${ data.phone }`" class="cta-embedded-form__phone">
                            {{ data.phone }}
                        </a>
                    </ClientOnly>
                    <div class="cta-embedded-form__schedule-text">
                        {{ data.work_schedule_text }}
                    </div>
                </div>
                <div class="cta-embedded-form__contacts-btn">
                    <AppButton 
                        class="cta-embedded-form__appointment-btn" 
                        full-width
                        @on-click="handleSubmitClick"
                    >
                        {{ data.button_text }}
                    </AppButton>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { minLength, required } from '@vuelidate/validators'
import useVuelidate from '@vuelidate/core'

import { sendCtaEmbeddedFormData } from './api'
import { useRootStore } from '~/entities/root/store/root-store'
import { useToastStore } from '~/shared/ui/Toast/store/toast-store'

import BlockSeparator from '~/shared/ui/Separators/BlockSeparator.vue'
import AppButton from '~/shared/ui/Buttons/AppButton.vue'
import AppCheckbox from '~/shared/ui/Form/AppCheckbox.vue'
import AppInput from '~/shared/ui/Form/AppInput.vue'
import { TOAST_VARIANTS } from '~/shared/ui/Toast/constants'
import { FORM_TYPES } from '~/entities/modals/ui/AppointmentModal/utils/form-types'
import AppLink from '~/shared/ui/Links/AppLink.vue'
import { MARKETING_EVENTS, runDataLayerEvent } from '~/shared/utils/marketing/dataLayerEvents'
import { useStaticDataStore } from '~/entities/root/store/static-data-store'

const props = defineProps({
    data: {
        type: Object,
        required: true
    }
})

const rules = {
    name: {
        required,
        minLength: minLength(3)
    },
    phone: {
        required,
        minLength: minLength(16)
    }
}

const fields = ref({
    name: '',
    phone: ''
})

const toast = useToastStore()
const rootStore = useRootStore()
const staticData = useStaticDataStore()
const route = useRoute()
const { locale, t } = useI18n()
const localePath = useLocalePath()
const v$ = useVuelidate(rules, fields)

const handleInput = (value, key) => fields.value[key] = value
const validate = (key) => v$.value[key].$touch()
const resetForm = () => {
    fields.value.name = ''
    fields.value.phone = ''
    v$.value.$reset()
}

const handleSubmitSuccess = () => {
    resetForm()
    toast.add({
        title: t('global.toast.success.title'),
        description: t('global.toast.success.description'),
        variant: TOAST_VARIANTS.SUCCESS,
        id: Math.random()
    })
    runDataLayerEvent(MARKETING_EVENTS.APPOINTMENT_DEFAULT)
    rootStore.TOGGLE_LOADING_STATUS()
}

const handleSubmitError = (error) => {
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

    const selectedMarketing = rootStore?.pageMarketing || staticData?.defaultMarketingLead || null
    const SYSTEM_NAME = 'cta-embedded-form'

    const ga4Code = {
        url: window.location.href,
        event: selectedMarketing?.event,
        cpaValue: selectedMarketing?.cpaValue,
        // TODO: check formtype prop
        formtype: SYSTEM_NAME
    }

    const payload = {
        ...fields.value,
        url: window.location.origin + route.path,
        type: FORM_TYPES.REGULAR,
        subject: props.data.title,
        system_name: SYSTEM_NAME,
        lead_classification: selectedMarketing?.id,
        lead_value: selectedMarketing?.cpaValue,
        ga4_code: JSON.stringify(ga4Code)
    }

    try {
        rootStore.TOGGLE_LOADING_STATUS()
        await sendCtaEmbeddedFormData(payload, locale.value)
        handleSubmitSuccess()
    } catch (error) {
        handleSubmitError(error)
    }
}
</script>

<style lang="scss" scoped>
@import '~/app/styles/ckeditor/mixins';
@import '~/app/styles/ckeditor/basic-elements';

.cta-embedded-form {
    padding: 20px;
    margin: 40px 0;
    background-color: $light;
    border-radius: 15px;

    @media (min-width: $tablet-breakpoint) {
        padding: 30px;
        margin: 60px 0;
        border-radius: 20px;
    }

    @media (min-width: $desktop-breakpoint) {
        display: flex;
        flex-wrap: wrap;
        padding: 40px;
        margin: 80px 0;
        border-radius: 25px;
    }

    @media (min-width: $lg-desktop-breakpoint) {
        padding: 48px;
        margin: 96px 0;
        border-radius: 30px;
    }

    &__text-content {
        display: flex;
        flex-direction: column;
        gap: 20px;

        @media (min-width: $tablet-breakpoint) {
            gap: 30px;
        }

        @media (min-width: $desktop-breakpoint) {
            width: 50%;
            padding-right: 20px;
        }

        @media (min-width: $lg-desktop-breakpoint) {
            padding-right: 48px;
        }
    }

    &__text {
        @media (min-width: $desktop-breakpoint) {
            margin-top: auto;

            :deep(*:last-child) {
                margin-bottom: 0;
            }
        }
    }

    &__form {
        padding-top: 20px;

        @media (min-width: $tablet-breakpoint) {
            padding-top: 30px;
            margin-bottom: 0;
        }

        @media (min-width: $desktop-breakpoint) {
            display: flex;
            flex-direction: column;
            width: 50%;
            padding: 0 0 0 20px;
        }
    
        @media (min-width: $lg-desktop-breakpoint) {
            padding: 0 0 0 48px;
        }
    }

    &__checkbox-block {
        display: flex;
        align-items: center;
        gap: 15px;
        margin-bottom: 20px;

        @media (min-width: $desktop-breakpoint) {
            width: 100%;
            margin-bottom: 40px;
        }

        @media (min-width: $lg-desktop-breakpoint) {
            margin-bottom: 48px;
        }
    }

    &__inputs {
        margin-bottom: 15px;

        @media (min-width: $tablet-breakpoint) {
            margin-bottom: 20px;
        }

        @media (min-width: $desktop-breakpoint) {
            width: 100%;
        }

        @media (min-width: $lg-desktop-breakpoint) {
            margin-bottom: 24px;
        }
    }

    &__name {
        margin-bottom: 15px;

        @media (min-width: $desktop-breakpoint) {
            margin-bottom: 20px;
        }

        @media (min-width: $lg-desktop-breakpoint) {
            margin-bottom: 24px;
        }
    }

    &__title {
        font-size: 24px;
        font-style: normal;
        font-weight: 700;
        line-height: 120%;

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

    &__policy-text {
        font-size: 14px;
        font-style: normal;
        font-weight: 400;
        line-height: 140%;
        color: $primary-300;

        @media (min-width: $desktop-breakpoint) {
            font-size: 16px;
        }
    }

    &__policy-link {
        margin: 0;
        font-size: inherit;
        font-weight: 400;
        color: $primary-500;

        &::after {
            display: none;
        }
    }

    &__contacts {
        display: flex;
        gap: 15px;

        @media (min-width: $tablet-breakpoint) {
            gap: 20px;
        }

        @media (min-width: $desktop-breakpoint) {
            gap: 25px;
            width: 100%;
            margin-top: auto;
        }

        @media (min-width: $lg-desktop-breakpoint) {
            gap: 32px;
        }
    }

    &__contacts-text,
    &__contacts-btn {
        width: 50%;
    }

    &__contacts-text {
        @media (min-width: $tablet-breakpoint) {
            width: 49.166%;
        }
    }

    &__contacts-btn {
        align-self: flex-end;

        @media (min-width: $tablet-breakpoint) {
            width: calc(50% - 20px);
        }
    }

    &__phone {
        margin: 0 0 5px;
        font-size: 16px;
        color: $dark-500;

        &::after {
            display: none;
        }

        @media (min-width: $tablet-breakpoint) {
            font-size: 16px;
        }

        @media (min-width: $desktop-breakpoint) {
            margin-bottom: 8px;
            font-size: 18px;
        }

        @media (min-width: $lg-desktop-breakpoint) {
            font-size: 20px;
        }
    }

    &__schedule-text {
        font-size: 14px;
        font-style: normal;
        font-weight: 400;
        line-height: 140%;
        
        @media (min-width: $desktop-breakpoint) {
            font-size: 16px;
        }
    }
}
</style>