<template>
    <div class="video__modal">
        <div class="video__modal-overlay" data-bg @click="close" />
        <div class="video__modal-inner" data-content>
            <div class="video__modal-heading">
                <AppButtonTypeIcon
                    title="Close" 
                    @click="close"
                >
                    <CloseIcon />
                </AppButtonTypeIcon>
            </div>
            <div class="video__video-container">
                <iframe
                    v-if="popupVideoStore.popupVideoSrc"
                    width="100%"
                    height="100%"
                    class="video__iframe"
                    :src="popupVideoStore.popupVideoSrc" 
                    title="YouTube video player" 
                    frameborder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                    referrerpolicy="strict-origin-when-cross-origin" 
                    allowfullscreen
                />
            </div>
        </div>
    </div>
</template>

<script setup>
import AppButtonTypeIcon from '~/shared/ui/Buttons/AppButtonTypeIcon.vue'
import CloseIcon from '~/shared/assets/icons/close.svg'
import { useActiveModalsStore } from '~/entities/active-modals/store/active-modals'
import { usePopupVideoStore } from '../store/popup-video'
import { MODALS_KEYS } from '~/entities/active-modals/constants'

const popupVideoStore = usePopupVideoStore()
const activeModalsStore = useActiveModalsStore()

const close = () => {
    popupVideoStore.closeVideoPopup()
    activeModalsStore.REMOVE_ACTIVE_KEYS([MODALS_KEYS.VIDEO])
}
</script>

<style lang="scss" scoped>
.video {
    &__modal {
        position: fixed;
        top: 0;
        left: 0;
        z-index: 102;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
    }

    &__modal-overlay {
        position: absolute;
        top: 0;
        left: 0;
        z-index: 101;
        width: 100%;
        height: 100%;
        background-color: $overlay-bg-color;
    }

    &__modal-heading {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        margin-bottom: 20px;
    }

    &__modal-close {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 40px;
        height: 40px;
        cursor: pointer;
        background-color: transparent;
        border: none;
    }

    &__modal-close-icon {
        width: 32px;
        height: 32px;
        stroke: $dark-500;
        transition: $base-ui-transition ease;
    }

    &__modal-inner {
        position: relative;
        z-index: 102;
        display: flex;
        flex-direction: column;
        width: 90%;
        height: 90%;
        max-width: 1215px;
        max-height: 769px;
        padding: 20px;
        background-color: $light;
        border-radius: 15px;
        
        @media (min-width: $desktop-breakpoint) {
            padding: 48px;
        }
    }

    &__video-container {
        display: flex;
        flex-grow: 1;
        max-height: 768px;

        iframe {
            width: 100%;
            height: 100%;
        }
    }
}
</style>