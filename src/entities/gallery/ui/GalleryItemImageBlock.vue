<template>
    <div class="gallery-image-block">
        <div class="gallery-image-block__img-container">
            <AppImage
                :urls="image?.urls"
                class="gallery-image-block__img"
                :alt="image?.alt"
                :title="image?.alt"
                :loading="lazyImg ? 'lazy' : null"
            />
        </div>
    </div>
</template>

<script setup>
import AppImage from '~/shared/ui/Media/AppImage.vue'

defineProps({
    image: {
        type: Object,
        required: true
    },
    lazyImg: {
        type: Boolean,
        default: false
    }
})
</script>

<style lang="scss" scoped>
.gallery-image-block {
    display: flex;
    justify-content: center;
    height: 184px;
    margin-bottom: 10px;
    overflow: hidden;
    background-color: $dark-200;
    border-radius: 7px;

    @media (min-width: $tablet-breakpoint) {
        height: 240px;
        margin-bottom: 15px;
        border-radius: 10px;
    }

    @media (min-width: $desktop-breakpoint) {
        height: 216px;
        margin-bottom: 20px;
        border-radius: 12px;
    }

    @media (min-width: $lg-desktop-breakpoint) {
        height: 320px;
        margin-bottom: 24px;
        border-radius: 15px;
    }

    &__img-container {
        width: 184px;
        height: 100%;

        @media (min-width: $tablet-breakpoint) {
            width: 240px;
        }

        @media (min-width: $desktop-breakpoint) {
            width: 216px;
        }

        @media (min-width: $lg-desktop-breakpoint) {
            width: 320px;
        }
    }
}
</style>