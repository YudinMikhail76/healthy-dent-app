<template>
    <div class="doctor-education-item">
        <div v-if="data?.year" class="doctor-education-item__year">
            {{ data?.year }}
        </div>
        <div class="doctor-education-item__divider" />
        <div v-if="data?.event" class="doctor-education-item__desc">
            {{ data?.event }}
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
.doctor-education-item {
    display: flex;
    gap: 20px;
    padding: 10px 0;

    @media (min-width: $tablet-breakpoint) {
        gap: 30px;
        padding: 15px 0;
    }

    @media (min-width: $desktop-breakpoint) {
        gap: 40px;
        padding: 20px 0;
    }

    &__year {
        min-width: 60px;
        font-size: 20px;
        font-weight: 700;
        line-height: 120%;
        color: $primary-300;

        @media (min-width: $tablet-breakpoint) {
            min-width: 72px;
            font-size: 22px;
        }

        @media (min-width: $desktop-breakpoint) {
            width: 100%;
            font-size: 24px;
            text-align: right;
        }

        @media (min-width: $lg-desktop-breakpoint) {
            font-size: 32px;
        }
    }

    &__desc {
        font-size: 14px;
        font-weight: 400;
        line-height: 140%;

        @media (min-width: $tablet-breakpoint) {
            font-size: 16px;
        }

        @media (min-width: $desktop-breakpoint) {
            width: 100%;
            font-size: 18px;
        }

        @media (min-width: $lg-desktop-breakpoint) {
            font-size: 20px;
        }
    }

    &__divider {
        width: 1px;
        background-color: $dark-200;
    }
}
</style>