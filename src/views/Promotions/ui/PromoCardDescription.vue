<template>
    <div class="promo-description" v-html="html" />
</template>

<script setup>
defineProps({
    html: {
        type: String,
        required: true
    }
})
</script>

<style lang="scss" scoped>
@import '@/app/styles/ckeditor/mixins';
@import '@/app/styles/ckeditor/spacers';
@import '@/app/styles/ckeditor/style-elements';
@import '@/app/styles/ckeditor/basic-elements';

.promo-description {
    margin-top: 20px;

    @media (min-width: $tablet-breakpoint) {
        margin-top: 30px;
    }

    @media (min-width: $desktop-breakpoint) {
        margin-top: 40px;
    }

    @media (min-width: $lg-desktop-breakpoint) {
        margin-top: 48px;
    }
}
</style>