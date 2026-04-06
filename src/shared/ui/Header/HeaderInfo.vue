<template>
    <div class="header__info">
        <div class="header__info-adress">
            {{ title }}
        </div>
        <div class="header__work-time">
            {{ description }}
        </div>
    </div>
</template>

<script setup>
defineProps({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
})
</script>

<style lang="scss" scoped>
.header {
    &__info {
        display: none;
        
        @media (min-width: $desktop-breakpoint) {
            display: flex;
            gap: 24px;
            height: 56px;
            max-width: 350px;
            min-width: 288px;
            padding: 8px 20px;
            font-size: 14px;
            font-style: normal;
            font-weight: 400;
            line-height: 140%;
            color: $primary-300;
            background-color: $light;
            border-radius: 12px;
        }

        @media (min-width: $lg-desktop-breakpoint) {
            align-items: center;
            min-width: 304px;
            min-height: 72px;
        }
    }

    &__info-adress,
    &__work-time {
        @media (min-width: $desktop-breakpoint) {
            @include text-line-overflowed-multiple(2);
        }
    }

    &__work-time {
        @media (min-width: $desktop-breakpoint) {
            min-width: 74px;
        }
    }
}
</style>