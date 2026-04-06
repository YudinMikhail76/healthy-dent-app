<template>
    <AppModal size="fit-screen" @on-close="onClose" class="gallery-modal">
        <template #title>
            {{ data.title }}
        </template>
        <template #body>
            <GalleryLightboxSlider v-bind="options" class="lightbox">
                <template #slide="{ item, index }">
                    <div class="lightbox__item">
                        <img
                            :src="item.image"
                            :alt="`${item.title} - ${index + 1}`"
                            :title="`${item.title} - ${index + 1}`"
                            fit="contain"
                            loading="lazy"
                        >
                    </div>
                </template>
                <template #arrows>
                    <AppButton class="lightbox__arrow-right--2">arrow</AppButton>
                </template>
            </GalleryLightboxSlider>
        </template>
    </AppModal>
</template>

<script setup lang="js">
import AppModal from '~/shared/ui/Modals/AppModal.vue'
import { useActiveModalsStore } from '~/entities/active-modals/store/active-modals'
import { useLightboxModalStore } from '~/entities/modals/ui/GalleryLightboxModal/store/store'
import { useModalsStore } from '~/entities/modals/store/modals-store'
import GalleryLightboxSlider from '~/entities/modals/ui/GalleryLightboxModal/ui/GalleryLightboxSlider'
import AppButton from '~/shared/ui/Buttons/AppButton'

const { t } = useI18n()
const modalStore = useModalsStore()
const activeModals = useActiveModalsStore()
const lightboxModalStore = useLightboxModalStore()

const data = computed(() => lightboxModalStore.lightboxModalData)

const onClose = () => {
    activeModals.REMOVE_ACTIVE_KEYS(['lightbox'])
    modalStore.TOGGLE_GALLERY_LIGHTBOX_MODAL()
}

const options = computed(() => {
    return {
        data: data.value.items,
        sliderClass: 'lightbox-slider',
        scrollBarClass: 'lightbox-slider__scrollbar',
        overflowHidden: true,
        slidesPerView: 1,
        spaceBetween: 30,
        initialSlide: data.value.currentIndex || 0,
        navigation: {
            prevEl: `.lightbox__arrow-left--1`,
            nextEl: `.lightbox__arrow-right--2`
        },
        paginationClass: 'lightbox-slider__pagination',
        renderBullet: function (index, className) {
            const item = data.value.items[index]
            return `
                <span class="${ className }">
                    <img
                        src="${ item.image }"
                        alt="${ item.title } - ${ index + 1 }"
                        title="${ item.title }- ${ index + 1 }"
                        loading="lazy"
                    />
                </span>
            `
        },
    }
})
</script>

<style scoped lang="scss">
.gallery-modal {
    :deep(.modal__wrapper) {
        @media (min-width: $desktop-breakpoint) {
            height: 100%;
        }
    }

    :deep(.modal__inner--fit-screen) {
        @media (min-width: $desktop-breakpoint) {
            padding: 48px;
        }
    }
}

:deep(.modal__heading-title) {
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 140%;

    @media (min-width: $desktop-breakpoint) {
        font-size: 20px;
    }
}

:deep(.modal__body) {
    position: relative;
    padding: 0 20px 20px 20px;

    @media (min-width: $desktop-breakpoint) {
        padding: 0 48px 48px 48px;

    }
}

.lightbox {
    //position: relative;
    flex: 1;
    overflow: hidden;

    :deep(.swiper-slide) {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    :deep(.slider) {
        height: 100%;
        padding-bottom: 120px;

        @media (min-width: $desktop-breakpoint) {
            padding-bottom: 200px;
        }
    }

    &__item {
        display: flex;
        align-items: center;
        justify-content: center;

        img {
            width: 100%;
            height: 100%;
            object-fit: contain;
            max-height: calc(100vh - 360px);

            @media (min-width: $desktop-breakpoint) {
                height: calc(100vh - 352px);
                max-width: calc(100% - 130px);
                max-height: none;
            }

            @media (min-width: $lg-desktop-breakpoint) {
                height: calc(100vh - 400px);
            }
        }
    }

    :deep(.app-container) {
        padding: 0;
    }

    :deep(.slider__scrollbar) {
        display: none;
    }

    //:deep(.swiper-wrapper) {
    //    align-items: center;
    //}

    :deep(.slider__pagination) {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 6px;

        @media (min-width: $desktop-breakpoint) {
            gap: 12px;

        }
    }

    :deep(.swiper-pagination-bullet) {
        display: inline-block;
        width: 40px;
        height: 40px;
        overflow: hidden;
        border: 6px solid $light;
        border-radius: 6px;

        @media (min-width: $tablet-breakpoint) {
            width: 64px;
            height: 64px;
        }

        @media (min-width: $desktop-breakpoint) {
            border-radius: 8px;
            width: 72px;
            height: 72px;
        }

        img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
    }

    :deep(.swiper-pagination-bullet-active) {
        border: 6px solid $primary-500;
    }

    :deep(.slider__bottom) {
        position: absolute;
        bottom: 48px;
        left: 50%;
        z-index: 1;
        transform: translateX(-50%);
        overflow-x: auto;
        width: 100%;

        @media (min-width: $desktop-breakpoint) {
            padding-top: 48px;
        }
    }

    :deep(.slider__bottom-inner) {
        @media (min-width: $desktop-breakpoint) {
            padding: 0;
        }
    }
}
</style>
