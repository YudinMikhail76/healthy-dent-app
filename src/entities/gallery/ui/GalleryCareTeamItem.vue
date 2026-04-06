<template>
    <GalleryItemContainer class="care-team-item">
        <div class="care-team-item__full-name">
            {{ data.name }}
        </div>
        <div class="care-team-item__position">
            {{ data.position }}
        </div>
        <GalleryItemImageBlock :image="data?.photo" :lazyImg="lazyImg" />
        <GalleryItemDescription>
            {{ data.description }}
        </GalleryItemDescription>
    </GalleryItemContainer>
</template>

<script setup>
import GalleryItemContainer from './GalleryItemContainer.vue'
import GalleryItemDescription from './GalleryItemDescription.vue'
import GalleryItemImageBlock from './GalleryItemImageBlock.vue'

defineProps({
    data: {
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
.care-team-item {
    &__full-name {
        margin-bottom: 8px;
        font-size: 20px;
        font-style: normal;
        font-weight: 700;
        line-height: 120%;

        @media (min-width: $tablet-breakpoint) {
            font-size: 22px;
        }

        @media (min-width: $desktop-breakpoint) {
            margin-bottom: 10px;
            font-size: 24px;
        }

        @media (min-width: $lg-desktop-breakpoint) {
            margin-bottom: 12px;
            font-size: 32px;
        }
    }

    &__position {
        margin-bottom: 10px;
        font-size: 14px;
        font-style: normal;
        font-weight: 400;
        line-height: 140%;

        @media (min-width: $tablet-breakpoint) {
            margin-bottom: 15px;
            font-size: 16px;
        }

        @media (min-width: $desktop-breakpoint) {
            margin-bottom: 20px;
            font-size: 18px;
        }

        @media (min-width: $lg-desktop-breakpoint) {
            margin-bottom: 24px;
            font-size: 20px;
        }
    }
}
</style>