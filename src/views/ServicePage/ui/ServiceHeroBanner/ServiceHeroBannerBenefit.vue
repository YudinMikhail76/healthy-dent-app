<template>
    <div class="service-benefit">
        <div class="service-benefit__title">
            {{ data.value_name }}
        </div>
        <div class="service-benefit__icon">
            <img
                :src="data.value_icon"
                :alt="data.value_icon__alt"
                :title="data.value_icon__title"
            >
        </div>
    </div>
</template>

<script setup>
defineProps({
    data: {
        type: Object,
        required: true
    }
})
</script>

<style lang="scss" scoped>
.service-benefit {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
    width: 160px;
    padding: 8px;
    background: rgba(240, 242, 244, .3);
    backdrop-filter: blur(7.5px);
    border-radius: 6px;

    @media (min-width: $tablet-breakpoint) {
        gap: 12px;
        width: 180px;
        padding: 12px;
        border-radius: 8px;
    }

    @media (min-width: $desktop-breakpoint) {
        gap: 14px;
        width: 208px;
        padding: 14px;
        border-radius: 10px;
    }

    @media (min-width: $lg-desktop-breakpoint) {
        gap: 16px;
        width: 288px;
        padding: 16px;
        border-radius: 12px;
    }

    &__title {
        font-size: 14px;
        font-weight: 400;
        line-height: 140%;

        @media (min-width: $tablet-breakpoint) {
            font-size: 16px;
        }

        @media (min-width: $desktop-breakpoint) {
            font-size: 18px;
        }

        @media (min-width: $lg-desktop-breakpoint) {
            font-size: 20px;
        }
    }

    &__icon {
        flex-shrink: 0;
        width: 24px;
        height: 24px;
        stroke: $primary-300;

        img {
            width: 100%;
            height: 100%;
        }

        @media (min-width: $tablet-breakpoint) {
            width: 30px;
            height: 30px;
        }

        @media (min-width: $desktop-breakpoint) {
            width: 40px;
            height: 40px;
        }

        @media (min-width: $lg-desktop-breakpoint) {
            width: 48px;
            height: 48px;
        }
    }
}
</style>