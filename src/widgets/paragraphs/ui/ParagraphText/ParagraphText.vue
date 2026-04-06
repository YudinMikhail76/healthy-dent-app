<template>
    <div class="paragraph-text">
        <div class="paragraph-text__body" v-html="props.data.text" />
    </div>
</template>

<script setup>
const props = defineProps({
    data: {
        type: Object,
        required: true
    }
})
</script>

<style lang="scss" scoped>
@import '@/app/styles/ckeditor/index';

.paragraph-text {
    margin: 40px 0;

    @media (min-width: $desktop-breakpoint) {
        margin: 80px 0;
    }

    @media (min-width: $lg-desktop-breakpoint) {
        margin: 96px 0;
    }

    &__body {
        width: 100%;
        padding: 20px;
        overflow-x: auto;
        background-color: $light;
        border-radius: 15px;

        @media (min-width: $tablet-breakpoint) {
            padding: 30px;
            border-radius: 20px;
        }

        @media (min-width: $desktop-breakpoint) {
            padding: 40px;
            border-radius: 25px;
        }

        @media (min-width: $desktop-breakpoint) {
            padding: 48px;
            border-radius: 30px;
        }

        :deep(a:not([class])) {
            margin: 0;
        }
    }
}
</style>