<template>
    <GalleryItemContainer class="tool">
        <div class="tool__title">
            {{ data.name }}
        </div>
        <GalleryItemImageBlock :image="data?.photo" />
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
    }
})
</script>

<style lang="scss" scoped>
.tool {
    &__title {
        margin-bottom: 10px;
        font-size: 16px;
        font-style: normal;
        font-weight: 700;
        line-height: 120%;

        @media (min-width: $tablet-breakpoint) {
            margin-bottom: 15px;
            font-size: 18px;
        }

        @media (min-width: $desktop-breakpoint) {
            margin-bottom: 20px;
            font-size: 20px;
        }

        @media (min-width: $lg-desktop-breakpoint) {
            margin-bottom: 24px;
            font-size: 24px;
        }
    }
}
</style>