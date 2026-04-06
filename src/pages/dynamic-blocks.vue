<template>
    <div class="dynamic-blocks">
        <div class="dynamic-blocks__list">
            <OurWorksBanner />
            <ServiceHeroBanner />
        </div>
    </div>
</template>

<script setup>
import OurWorksBanner from '~/entities/our-works/ui/OurWorksBanner.vue'
import AppContainer from '~/shared/ui/Containers/AppContainer.vue'
import ServiceHeroBanner from '~/views/ServicePage/ui/ServiceHeroBanner/ServiceHeroBanner.vue'
</script>

<style lang="scss" scoped>
.pages {
    padding: 40px 0;

    &__list {
        display: flex;
        flex-wrap: wrap;
        gap: 5px;
    }
}
</style>