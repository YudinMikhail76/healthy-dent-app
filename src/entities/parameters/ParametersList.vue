<template>
    <div class="parameters-list">
        <h2 v-if="data?.title" class="parameters-list__title">{{ data?.title }}</h2>
        <BlockSeparator />
        <div class="parameters-list__items">
            <ParametersItem
                v-for="item in data?.items"
                :key="item.name"
                :data="item"
            />
        </div>
    </div>
</template>

<script setup>
import BlockSeparator from '~/shared/ui/Separators/BlockSeparator.vue'
import ParametersItem from '~/entities/parameters/ui/ParametersItem.vue'

defineProps({
    data: {
        type: Object,
        required: true
    }
})
</script>

<style lang="scss" scoped>
.parameters-list {
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding: 20px;
    background-color: $light;
    border-radius: 15px;

    @media (min-width: $tablet-breakpoint) {
        gap: 30px;
        padding: 30px;
        border-radius: 20px;
    }

    @media (min-width: $desktop-breakpoint) {
        gap: 40px;
        padding: 40px;
        border-radius: 25px;
    }

    @media (min-width: $lg-desktop-breakpoint) {
        gap: 48px;
        padding: 48px;
        border-radius: 30px;
    }

    &__title {
        font-size: 24px;
        font-weight: 700;
        line-height: 120%;

        @media (min-width: $tablet-breakpoint) {
            font-size: 28px;
        }

        @media (min-width: $desktop-breakpoint) {
            font-size: 40px;
        }

        @media (min-width: $lg-desktop-breakpoint) {
            font-size: 48px;
        }
    }

    &__items {
        display: flex;
        flex-direction: column;
        gap: 5px;

        @media (min-width: $tablet-breakpoint) {
            gap: 8px;
        }

        @media (min-width: $desktop-breakpoint) {
            gap: 10px;
        }

        @media (min-width: $lg-desktop-breakpoint) {
            gap: 12px;
        }
    }
}
</style>