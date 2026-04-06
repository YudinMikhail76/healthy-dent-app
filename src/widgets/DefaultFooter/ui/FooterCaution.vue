<template>
    <p class="caution">{{ t('caution') }}</p>
</template>

<script setup lang="ts">
const { t } = useI18n()
</script>

<style scoped lang="scss">
.caution {
    margin-top: 20px;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 140%;
    color: $dark-500;

    @media (min-width: $desktop-breakpoint) {
        margin-top: 0;
        width: 100%;
        font-size: 16px;
    }
}
</style>