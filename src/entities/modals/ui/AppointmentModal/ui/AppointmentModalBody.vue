<template>
    <div class="appointment-modal-body">
        <div class="appointment-modal-body__form">
            <div class="appointment-modal-body__form-wrap">
                <div class="appointment-modal-body__input"> 
                    <AppInput
                        id="name"
                        :value="fields.name"
                        :label-text="$t('appointmentModal.name')"
                        :is-error="v$.name.$invalid && v$.name.$dirty"
                        :is-success="!v$.name.$error && v$.name.$dirty"
                        is-required-field
                        @on-input="handleInput($event, 'name')"
                        @on-change="validate('name')"
                    />
                </div>
                <div class="appointment-modal-body__input">
                    <AppInput
                        id="maska"
                        v-maska
                        :value="fields.phone"
                        :label-text="$t('appointmentModal.phone')"
                        :is-error="v$.phone.$invalid && v$.phone.$dirty"
                        :is-success="!v$.phone.$error && v$.phone.$dirty"
                        data-maska="+38 ### ### ####"
                        type="tel"
                        placeholder="+38"
                        is-required-field
                        @on-input="handleInput($event, 'phone')"
                        @on-change="validate('phone')"
                    />
                </div>
            </div>

<div style="display: none;">
<AppTextarea
                id="comment"
                :value="fields.message"
                :label-text="$t('appointmentModal.message')"
                :is-error="v$.message.$invalid && v$.message.$dirty"
                :is-success="!v$.message.$error && v$.message.$dirty"
                @on-input="handleInput($event, 'message')"
            />
</div>
            
           
                
      <label for="modal-services-list" class="app-textarea__label-text">Чим ми зможемо допомогти вам?</label>

       <select @change="handleServiceChange" id="modal-services-list" style="height: 40px; padding: 0 15px; font-size: 18px; border-radius: 10px;">
          <option value="">Виберіть послугу *</option>
          <option value="Лікування зубів">Лікування зубів</option>
          <option value="Чистка зубів">Чистка зубів</option>
          <option value="Хірургія">Хірургія</option>
          <option value="Протезування">Протезування</option>
          <option value="Імплантація">Імплантація</option>
          <option value="Діагностика">Діагностика</option>
          <option value="Лікування ясень">Лікування ясень</option>
          <option value="Вирівнювання зубів">Вирівнювання зубів</option>
          <option value="Ідеальна посмішка">Ідеальна посмішка</option>
          <option value="Дитяча стоматологія">Дитяча стоматологія</option>
        </select>

            
        </div>


        
        <div class="appointment-modal-body__bottom">
            <div class="appointment-modal-body__text">
                {{ $t('appointmentModal.confirm') }}
                <a :href="localePath('/privacy')" class="appointment-modal-body__policy-link">
                    {{ $t('appointmentModal.policy') }}
                </a>
            </div>
            <div class="appointment-modal-body__button-wrap">
                <AppButton class="appointment-modal-body__button" @on-click="handleSubmitClick">
                    {{ appointmentModalData.button }}
                </AppButton>
            </div>
        </div>
    </div>
</template>

<script setup>
import AppInput from '~/shared/ui/Form/AppInput.vue'
import AppButton from '~/shared/ui/Buttons/AppButton.vue'
import AppTextarea from '~/shared/ui/Form/AppTextarea.vue'
import useVuelidate from '@vuelidate/core'

import { useAppointmentModalStore } from '~/entities/modals/ui/AppointmentModal/store/appointment-modal-store'
import { useRootStore } from '~/entities/root/store/root-store'
import { useToastStore } from '~/shared/ui/Toast/store/toast-store'
import { useSuccessModalStore } from '~/entities/modals/ui/SuccessModal/store/success-modal-store'
import { appointmentModalApi } from '~/entities/modals/ui/AppointmentModal/api'
import { useModalsStore } from '~/entities/modals/store/modals-store'
import { useActiveModalsStore } from '~/entities/active-modals/store/active-modals'

import { returnAppointmentFormRules } from '~/entities/modals/ui/AppointmentModal/utils/rules.js'
import { TOAST_VARIANTS } from '~/shared/ui/Toast/constants'
import { MODALS_KEYS } from '~/entities/active-modals/constants'
import { pushDataLayerEvent } from '~/shared/utils/marketing/dataLayerEvents'

const toast = useToastStore()
const rootStore = useRootStore()
const appointmentModalStore = useAppointmentModalStore()
const successModalStore = useSuccessModalStore()
const modalsStore = useModalsStore()
const activeModalsStore = useActiveModalsStore()
const { appointmentModalData, staticFormData, name, selectedMarketing } = toRefs(appointmentModalStore)

const emit = defineEmits(['on-close'])
const localePath = useLocalePath()
const { t, locale } = useI18n()

const fields = ref({
    name: '',
    phone: '',
    message: ''
})

const rules = computed(() => returnAppointmentFormRules())
const v$ = useVuelidate(rules, fields)
const handleInput = (value, key) => {
    fields.value[key] = value

    if (key === 'name') {
        appointmentModalStore.SET_NAME(value)
    }
}
const validate = (key) => v$.value[key].$touch()
const resetForm = () => {
    fields.value.name = ''
    fields.value.phone = ''
    fields.value.message = ''
    v$.value.$reset()
}

const successForm = computed(() => ({
    title: `${ name.value }, ${ t('appointmentModal.success') }`,
    subtitle: '',
    description: t('appointmentModal.successText')
}))

const handleSubmitSuccess = (ga4Code) => {
    pushDataLayerEvent(ga4Code)

    emit('on-close')
    resetForm()
    successModalStore.SET_SUCCESS_MODAL_DATA(successForm.value)
    modalsStore.TOGGLE_SUCCESS_MODAL()
    activeModalsStore.ADD_ACTIVE_KEYS([MODALS_KEYS.SUCCESS])
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

    const ga4Code = {
        url: window.location.href,
        event: selectedMarketing.value?.event || '',
        cpaValue: selectedMarketing.value?.cpaValue,
        // TODO: check formtype prop
        formtype: staticFormData.value?.system_name,
    }

    const body = {
        ...fields.value,
        ...staticFormData.value,
        lead_classification: selectedMarketing.value?.id,
        lead_value: selectedMarketing.value?.cpaValue,
        ga4_code: JSON.stringify(ga4Code),
    }

    try {
        rootStore.TOGGLE_LOADING_STATUS()
        await appointmentModalApi.addMakeAnAppointment(body, locale.value)
        handleSubmitSuccess(ga4Code)
    } catch (error) {
        handleSubmitError(error)
    }
}



function handleServiceChange(event) {
  const selectedValue = event.target.value;

  document.getElementById("comment").value = selectedValue;

    fields.value.message = selectedValue;

  console.log('Selected value:', selectedValue);
}

    
</script>

<style lang="scss" scoped>



    
.appointment-modal-body {
    &__form {
        display: flex;
        flex-direction: column;
        gap: 15px;
        padding: 20px;

        @media (min-width: $tablet-breakpoint) {
            padding: 30px;
        }

        @media (min-width: $desktop-breakpoint) {
            gap: 20px;
            padding: 40px;
        }

        @media (min-width: $lg-desktop-breakpoint) {
            gap: 24px;
            padding: 48px;
        }
    }

    &__form-wrap {
        display: flex;
        flex-direction: column;
        gap: 10px;

        @media (min-width: $tablet-breakpoint) {
            flex-direction: row;
            gap: 15px;
        }

        @media (min-width: $desktop-breakpoint) {
            gap: 20px;
        }

        @media (min-width: $lg-desktop-breakpoint) {
            gap: 24px;
        }
    }

    &__input {
        width: 100%;
    }

    &__bottom {
        display: flex;
        flex-direction: column;
        gap: 20px;
        padding: 20px;

        @media (min-width: $tablet-breakpoint) {
            flex-direction: row;
            gap: 30px;
            padding: 30px;
        }

        @media (min-width: $desktop-breakpoint) {
            gap: 40px;
            padding: 40px;
        }

        @media (min-width: $lg-desktop-breakpoint) {
            gap: 48px;
            padding: 48px;
        }
    }

    &__text {
        font-size: 14px;
        font-weight: 400;
        line-height: 140%;
        color: $primary-300;

        a {
            font-weight: 400;
        }

        @media (min-width: $tablet-breakpoint) {
            width: 100%;
        }
    }

    &__button-wrap {
        display: flex;
        justify-content: flex-end;

        @media (min-width: $tablet-breakpoint) {
            align-items: flex-end;
            width: 100%;
        }
    }

    &__button {
        width: 50%;

        @media (min-width: $tablet-breakpoint) {
            width: 100%;
            height: fit-content;
        }
    }

    &__policy-link {
        color: $primary-500;
        
        @media (any-hover: hover) {
            &:hover {
                color: $primary-600;
            }
        }
    }
}
</style>
