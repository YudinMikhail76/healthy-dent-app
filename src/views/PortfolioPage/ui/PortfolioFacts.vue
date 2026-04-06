<template>
    <FactsList
        :data="data"
        :full-width="fullWidth"
        class="portfolio-facts"
    />
</template>

<script setup>
import FactsList from '~/entities/facts-block/FactsList.vue'

defineProps({
    data: {
        type: Object,
        required: true
    },
    fullWidth: {
        type: Boolean,
        default: false
    }
})
</script>

<style lang="scss" scoped>
.portfolio-facts {
    margin-top: 0;
}
</style>
