<template>
    <div class="schedule-item">
        {{ value }}
        <span class="schedule-item__bracket">[</span>
        <span class="schedule-item__count">{{ count }}</span>
        <span class="schedule-item__bracket">]</span>
    </div>
</template>

<script setup>
defineProps({
    value: {
        type: String,
        required: true
    },
    count: {
        type: Number,
        required: true
    }
})
</script>

<style lang="scss" scoped>
.schedule-item {
    display: flex;
    gap: 3px;
    font-size: 14px;
    font-style: normal;
    font-weight: 700;
    line-height: 140%;

    @media (min-width: $tablet-breakpoint) {
        font-size: 16px;
    }

    @media (min-width: $desktop-breakpoint) {
        gap: 5px;
        font-size: 18px;
    }

    @media (min-width: $lg-desktop-breakpoint) {
        gap: 6px;
        font-size: 20px;
    }

    &__bracket {
        color: $primary-500;
    }

    &__count {
        font-weight: 400;
    }
}
</style>