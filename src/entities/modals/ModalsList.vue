<template>
    <div class="modals-list">
        <Transition name="transform">
            <AppointmentModal v-if="isAppointmentModalOpen" />
        </Transition>
        <Transition name="transform">
            <ReviewModal v-if="isReviewModalOpen" />
        </Transition>
        <Transition name="transform">
            <SuccessModal v-if="isSuccessModalOpen" />
        </Transition>
        <Transition name="transform">
            <GalleryLightboxModal v-if="isGalleryLightboxModalOpen" />
        </Transition>
        <Transition name="transform">
            <HotTimeModal v-if="isHotTimeModalOpen" />
        </Transition>
    </div>
</template>

<script setup>
import { useModalsStore } from '~/entities/modals/store/modals-store'

const GalleryLightboxModal = defineAsyncComponent(() => import('~/entities/modals/ui/GalleryLightboxModal/GalleryLightboxModal'))
const AppointmentModal = defineAsyncComponent(() => import('~/entities/modals/ui/AppointmentModal/AppointmentModal.vue'))
const ReviewModal = defineAsyncComponent(() => import('~/entities/modals/ui/ReviewModal/ReviewModal.vue'))
const HotTimeModal = defineAsyncComponent(() => import('~/entities/modals/ui/HotTimeModal/HotTimeModal.vue'))
const SuccessModal = defineAsyncComponent(() => import('~/entities/modals/ui/SuccessModal/SuccessModal.vue'))

const modalsStore = useModalsStore()
const {
    isAppointmentModalOpen,
    isReviewModalOpen,
    isSuccessModalOpen,
    isHotTimeModalOpen,
    isGalleryLightboxModalOpen
} = toRefs(modalsStore)
</script>

<style lang="scss">
.transform-enter-active,
.transform-leave-active {
    transition: .5s;

    [data-bg],
    [data-content] {
        transition: .5s;
    }
}

.transform-enter-from,
.transform-leave-to {
    [data-bg] {
        opacity: 0;
    }

    [data-content] {
        transform: translateY(-100%);
    }
}
</style>
