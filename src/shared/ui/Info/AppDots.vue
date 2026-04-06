<template>
    <div class="app-dots">
        <div 
            v-for="item in total" 
            :key="item" 
            :class="['app-dots__item', { 'app-dots__item--selected': item === selectedStep }]"
        />
    </div>
</template>

<script setup>
defineProps({
    total: {
        type: Number,
        required: true
    },
    selectedStep: {
        type: Number,
        required: true
    }
})
</script>

<style scoped lang="scss">
.app-dots {
    display: flex;
    gap: 4px;

    @media (min-width: $tablet-breakpoint) {
        gap: 6px;
    }

    @media (min-width: $desktop-breakpoint) {
        gap: 8px;
    }

    @media (min-width: $lg-desktop-breakpoint) {
        gap: 10px;
    }
    
    &__item {
        width: 4px;
        height: 4px;
        background: $light;
        border-radius: 10px;
        opacity: .5;
        transition: .3s;

        @media (min-width: $tablet-breakpoint) {
            width: 6px;
            height: 6px;
        }

        @media (min-width: $desktop-breakpoint) {
            width: 8px;
            height: 8px;
        }

        @media (min-width: $lg-desktop-breakpoint) {
            width: 10px;
            height: 10px;
        }

        &--selected {
            width: 20px;
            opacity: 1;

            @media (min-width: $tablet-breakpoint) {
                width: 30px;
            }

            @media (min-width: $desktop-breakpoint) {
                width: 40px;
            }

            @media (min-width: $lg-desktop-breakpoint) {
                width: 48px;
            }
        }
    }
}
</style>