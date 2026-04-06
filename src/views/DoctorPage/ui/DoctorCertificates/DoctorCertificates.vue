<template>
    <div class="doctor-certificates">
        <AppDynamicBlockContainer background="#E9E8EE" :with-padding="false">
            <template #heading>
                {{ $t('doctor.certificates') }}
            </template>
            <template #content>
                <div class="doctor-certificates__list">
                    <MasonryWall
                        :items="data"
                        :ssr-columns="4"
                        :min-columns="2"
                        :max-columns="4"
                        :column-width="columnWidth"
                        :gap="6"
                    >
                        <template #default="{ item, index }">
                            <DoctorCertificatesItem
                                :data="item"
                                class="doctor-certificates__item"
                                @click="openLightbox({ ...item, index })"
                            />
                        </template>
                    </MasonryWall>
                </div>
            </template>
        </AppDynamicBlockContainer>
    </div>
</template>

<script setup>
import AppDynamicBlockContainer from '~/shared/ui/Containers/AppDynamicBlockContainer.vue'
import DoctorCertificatesItem from './ui/DoctorCertificatesItem.vue'

import { useNuxtApp } from '#app'
import { useBreakPoints } from '~/shared/composables/useBreakpoints'
import MasonryWall from '@yeger/vue-masonry-wall'

const props = defineProps({
    data: {
        type: Array,
        required: true
    }
})

const nuxtApp = useNuxtApp()
nuxtApp.vueApp.use(MasonryWall)

const { isMobileSize } = useBreakPoints()
const { t } = useI18n()
const itemsWithIndex = computed(() => props.data.map((item, index) => ({ ...item, index })))

const columnWidth = computed(() => {
    if (isMobileSize.value) {
        return 180
    }

    return 250
})

const openLightbox = async (item) => {
    const { useLightboxModalStore } = await import('~/entities/modals/ui/GalleryLightboxModal/store/store')
    const lightboxStore = useLightboxModalStore()
    const { useActiveModalsStore } = await import('~/entities/active-modals/store/active-modals.js')
    const activeModals = useActiveModalsStore()
    const { useModalsStore } = await import('~/entities/modals/store/modals-store')
    const modals = useModalsStore()

    lightboxStore.SET_LIGHTBOX_MODAL_DATA({
        title: item.title || t('doctor.certificates'),
        items: itemsWithIndex.value,
        currentIndex: item.index,
    })

    modals.TOGGLE_GALLERY_LIGHTBOX_MODAL()
    activeModals.ADD_ACTIVE_KEYS(['lightbox'])
}
</script>
