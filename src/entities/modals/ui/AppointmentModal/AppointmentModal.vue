<template>
    <AppModal @on-close="onClose">
        <template #option>
            {{ option }}
        </template>
        <template #title>
            {{ appointmentModalData.title }}
        </template>
        <template #body>
            <AppointmentModalBody @on-close="onClose" />
        </template>
    </AppModal>
</template>

<script setup>
import AppModal from '~/shared/ui/Modals/AppModal.vue'
import AppointmentModalBody from './ui/AppointmentModalBody.vue'

import { useModalsStore } from '~/entities/modals/store/modals-store'
import { useAppointmentModalStore } from '~/entities/modals/ui/AppointmentModal/store/appointment-modal-store'
import { useActiveModalsStore } from '~/entities/active-modals/store/active-modals'
import { MODALS_KEYS } from '~/entities/active-modals/constants'

const modalsStore = useModalsStore()
const activeModalsStore = useActiveModalsStore()
const appointmentModalStore = useAppointmentModalStore()
const { appointmentModalData } = toRefs(appointmentModalStore)

const option = computed(() => appointmentModalData.value.option ? `[ ${ appointmentModalData.value.option } ]` : '')

const onClose = () => {
    modalsStore.TOGGLE_APPOINTMENT_MODAL()
    appointmentModalStore.RESET_APPOINTMENT_MODAL()
    activeModalsStore.REMOVE_ACTIVE_KEYS([MODALS_KEYS.APPOINTMENT])
}

onMounted(() => {
    appointmentModalStore.SET_URL(window.location.href)
    appointmentModalStore.SET_SUBJECT(appointmentModalData.value.title)
})
</script>
