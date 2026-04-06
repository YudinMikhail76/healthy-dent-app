<template>
    <CtaImageModalBlock
        :data="data"
        :data-layer-event="MARKETING_EVENTS.PORTFOLIO"
        class="portfolio-cta-appointment"
        lazy-image
    />
</template>

<script setup>
import CtaImageModalBlock from '~/entities/cta-image-modal/CtaImageModalBlock.vue'
import { MARKETING_EVENTS } from '~/shared/utils/marketing/dataLayerEvents'

defineProps({
    data: {
        type: Object,
        required: true
    }
})
</script>

<style scoped lang="scss">
.portfolio-cta-appointment {
    margin: 0;
}
</style>