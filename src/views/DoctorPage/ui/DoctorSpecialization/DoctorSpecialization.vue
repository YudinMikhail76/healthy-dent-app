<template>
    <div
        class="doctor-specialization"
        v-html="data"
    />
</template>

<script setup>
defineProps({
    data: {
        type: String,
        required: true
    }
})
</script>

<style lang="scss" scoped>
@import '~/app/styles/ckeditor/index';

.doctor-specialization {
    padding: 20px;
    background: $light;
    border-radius: 15px;

    @media (min-width: $tablet-breakpoint) {
        padding: 30px;
        border-radius: 20px;
    }

    @media (min-width: $desktop-breakpoint) {
        padding: 40px;
        border-radius: 25px;
    }

    @media (min-width: $lg-desktop-breakpoint) {
        padding: 48px;
        border-radius: 30px;
    }

    :deep(hr) {
        margin-bottom: 24px;

        @media (min-width: $tablet-breakpoint) {
            margin-bottom: 32px;
        }

        @media (min-width: $desktop-breakpoint) {
            margin-bottom: 48px;
        }

        @media (min-width: $lg-desktop-breakpoint) {
            margin-bottom: 64px;
        }
    }
}
</style>