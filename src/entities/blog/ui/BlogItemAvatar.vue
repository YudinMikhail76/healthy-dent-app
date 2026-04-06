<template>
    <div class="avatar">
        <AppImage :src="urls.mobile_webp" class="avatar__img" />
    </div>
</template>

<script setup>
import AppImage from '~/shared/ui/Media/AppImage.vue'

defineProps({
    urls: {
        type: Object,
        required: true
    } 
})
</script>

<style lang="scss" scoped>
.avatar {
    height: 40px;
    max-width: 40px;
    min-width: 40px;
    overflow: hidden;
    background-color: $secondary-100;
    border-radius: 50%;

    @media (min-width: $desktop-breakpoint) {
        height: 48px;
        max-width: 48px;
        min-width: 48px;
    }

    @media (min-width: $desktop-breakpoint) {
        height: 60px;
        max-width: 60px;
        min-width: 60px;
    }

    &__img {
        object-position: top center;
    }
}
</style>