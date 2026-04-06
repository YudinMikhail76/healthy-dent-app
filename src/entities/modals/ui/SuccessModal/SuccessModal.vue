<template>
    <AppModal @on-close="onClose">
        <template #title>
            <div>
                {{ successModalData.title }}
            </div>
            <div v-if="successModalData.subtitle">
                {{ successModalData.subtitle }}
            </div>
        </template>
        <template #body>
            <SuccessModalBody />
        </template>
    </AppModal>
</template>

<script setup>
import AppModal from '~/shared/ui/Modals/AppModal.vue'
import SuccessModalBody from './ui/SuccessModalBody.vue'

import { useModalsStore } from '~/entities/modals/store/modals-store'
import { useSuccessModalStore } from '~/entities/modals/ui/SuccessModal/store/success-modal-store'
import { useActiveModalsStore } from '~/entities/active-modals/store/active-modals'
import { MODALS_KEYS } from '~/entities/active-modals/constants'

const modalsStore = useModalsStore()
const activeModalsStore = useActiveModalsStore()
const successModalStore = useSuccessModalStore()
const { successModalData } = toRefs(successModalStore)

const onClose = () => {
    modalsStore.TOGGLE_SUCCESS_MODAL()
    successModalStore.RESET_SUCCESS_MODAL()
    activeModalsStore.REMOVE_ACTIVE_KEYS([MODALS_KEYS.SUCCESS])
}
</script>
