<template>
    <div class="bottom-characteristics__container">
        <div
            v-for="item in bottomCharacteristics?.items"
            :key="item.id"
            class="bottom-characteristics__block"
        >
            <div class="bottom-characteristics__label">
                {{ item.name }}
            </div>
            <div class="bottom-characteristics__label bottom-characteristics__label--value">
                {{ getBottomItemValue(item.values) }}
            </div>
        </div>
    </div>
</template>

<script setup>
defineProps({
    bottomCharacteristics: {
        type: Object,
        required: true
    }
})

const getBottomItemValue = (values) => values.map((item) => item.value_name)?.join(', ')
</script>

<style lang="scss" scoped>
.bottom-characteristics {
    &__container {
        display: flex;
        flex-direction: column;
        gap: 3px;

        @media (min-width: $desktop-breakpoint) {
            gap: 5px;
        }

        @media (min-width: $lg-desktop-breakpoint) {
            gap: 6px;
        }
    }
}
</style>