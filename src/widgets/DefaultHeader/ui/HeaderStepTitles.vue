<template>
    <div class="step-heading-title">
        <template v-if="selectedStepTitle">
            {{ $t('header.services.title') }} 
            <span class="step-heading-title__heading-slash">/</span>
            <span class="step-heading-title__heading--last">{{ selectedStepTitle }}</span>
        </template>
        <template v-else>
            Меню <span class="step-heading-title__heading-slash">/</span> 
            {{ $t('header.services.title') }} 
        </template>
        <span class="step-heading-title__heading-slash">/</span> 
    </div>
</template>

<script setup>
const props = defineProps({
    selectedStepTitle: {
        type: String,
        required: false,
        default: ''
    }
})
</script>

<style lang="scss" scoped>
.step-heading-title {
    display: flex;
    padding-left: 10px;

    @media (min-width: $tablet-breakpoint) {
        font-size: 16px;
    }

    @media (min-width: $desktop-breakpoint) {
        display: none;
    }

    &__heading-slash {
        margin: 0 10px;
        color: $primary-500;

        @media (min-width: $tablet-breakpoint) {
            margin: 0 15px;
        }

        @media (min-width: $desktop-breakpoint) {
            margin: 0 20px;
        }

        @media (min-width: $lg-desktop-breakpoint) {
            margin: 0 24px;
        }
    }
}
</style>