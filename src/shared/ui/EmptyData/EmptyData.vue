<template>
    <div class="empty-data">
        <AppContainer>
            {{ $t('global.emptyData.title') }}
        </AppContainer>
    </div>
</template>

<script setup>
import AppContainer from '../Containers/AppContainer.vue'
</script>

<style lang="scss" scoped>
.empty-data {
    padding: 40px 0;
    font-size: 40px;
    font-weight: 700;
    line-height: 120%;
    text-align: center;

    @media (min-width: $desktop-breakpoint) {
        padding: 80px 0;
        font-size: 50px;
    }

    @media (min-width: $desktop-breakpoint) {
        padding: 96px 0;
        font-size: 64px;
    }
}
</style>