<template>
    <div class="treatment-item">
        <div class="treatment-item__img-wrap">
            <AppImage 
                :urls="data.photo?.urls"
                class="treatment-item__img"
                :alt="data.photo?.alt" 
                :title="data.photo?.title" 
            />
        </div>
        <div class="treatment-item__description">
            {{ data.description }}
        </div>
    </div>
</template>

<script setup>
import AppImage from '~/shared/ui/Media/AppImage.vue'

defineProps({
    data: {
        type: Object,
        required: true
    }
})
</script>

<style lang="scss" scoped>
.treatment-item {
    width: 280px;

    @media (min-width: $tablet-breakpoint) {
        width: 360px;
    }

    @media (min-width: $desktop-breakpoint) {
        width: 320px;
    }

    @media (min-width: $lg-desktop-breakpoint) {
        width: 480px;
    }

    &__description {
        font-size: 14px;
        font-style: normal;
        font-weight: 400;
        line-height: 140%;

        @media (min-width: $tablet-breakpoint) {
            font-size: 16px;
        }

        @media (min-width: $desktop-breakpoint) {
            font-size: 18px;
        }

        @media (min-width: $lg-desktop-breakpoint) {
            font-size: 20px;
        }
    }

    &__img-wrap {
        height: 210px;
        margin-bottom: 10px;

        @media (min-width: $tablet-breakpoint) {
            height: 270px;
            margin-bottom: 15px;
        }

        @media (min-width: $desktop-breakpoint) {
            height: 240px;
            margin-bottom: 20px;
        }

        @media (min-width: $lg-desktop-breakpoint) {
            height: 360px;
            margin-bottom: 24px;
        }

        :deep(img) {
            border-radius: 7px;

            @media (min-width: $tablet-breakpoint) {
                margin-bottom: 10px;
                border-radius: 10px;
            }

            @media (min-width: $desktop-breakpoint) {
                margin-bottom: 12px;
                border-radius: 12px;
            }

            @media (min-width: $lg-desktop-breakpoint) {
                margin-bottom: 15px;
                border-radius: 15px;
            }
        }
    }
}
</style>