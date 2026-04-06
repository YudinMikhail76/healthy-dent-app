<template>
    <Gallery :data="data" />
</template>

<script setup>
import Gallery from '~/entities/gallery/Gallery.vue'

defineProps({
    data: {
        type: Object,
        required: true
    }
})
</script>
