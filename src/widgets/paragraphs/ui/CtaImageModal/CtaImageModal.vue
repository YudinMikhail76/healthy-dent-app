<template>
    <CtaImageModalBlock :data="data" class="portfolio-cta-appointment" />
</template>

<script setup>
import CtaImageModalBlock from '~/entities/cta-image-modal/CtaImageModalBlock.vue'

defineProps({
    data: {
        type: Object,
        required: true
    }
})
</script>
