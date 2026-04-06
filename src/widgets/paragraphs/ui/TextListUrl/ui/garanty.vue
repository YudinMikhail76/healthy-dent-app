<template>
    <div class="garanty">
        <div class="garanty__content">
            <p class="garanty__header">
                {{ data.title }}
            </p>
            <p class="garanty__description">
                {{ data.description }}
            </p>
        </div>
        <div class="garanty__footer">
            {{ padZero(index + 1) }}
        </div>
    </div>
</template>

<script setup>
defineProps({
    data: {
        type: Object,
        required: true
    },
    index: {
        type: Number,
        required: true
    }
})

const padZero = (value) => {
    return String(value).padStart(2, '0')
}
</script>

<style lang="scss" scoped>
.garanty {
    display: flex;
    flex: 0 0 100%;
    flex-direction: column;

    @media (min-width: $tablet-breakpoint) {
        flex: 1 1 31%;
    }

    &__content {
        display: flex;
        flex-direction: column;
        gap: 10px;
        padding: 10px;
        padding-bottom: 15px;
        background: $dark-100;
        border-radius: 7px 7px 7px 0;

        @media (min-width: $tablet-breakpoint) {
            gap: 15px;
            padding: 15px;
            padding-bottom: 20px;
        }

        @media (min-width: $desktop-breakpoint) {
            gap: 20px;
            padding: 20px;
            padding-bottom: 30px;
        }

        @media (min-width: $lg-desktop-breakpoint) {
            gap: 24px;
            padding: 24px;
            padding-bottom: 32px;
        }
    }

    &__header {
        font-size: 22px;
        font-weight: 700;
        line-height: 120%;
        color: $dark-500;

        @media (min-width: $desktop-breakpoint) {
            font-size: 24px;
        }

        @media (min-width: $lg-desktop-breakpoint) {
            font-size: 32px;
        }
    }

    &__description {
        font-size: 16px;
        line-height: 140%;
        color: $dark-500;

        @media (min-width: $desktop-breakpoint) {
            font-size: 18px;
        }

        @media (min-width: $lg-desktop-breakpoint) {
            font-size: 20px;
        }
    }

    &__footer {
        position: relative;
        display: flex;
        align-items: center;
        width: 110px;
        height: 30px;
        padding: 0 10px;
        font-size: 14px;
        font-weight: 400;
        line-height: 140%; 
        color: $dark-200;
        background: $dark-100;
        
        &::after {
            content: '';
            position: absolute;
            top: 0;
            left: 100%;
            display: block;
            border: 15px solid $dark-100;
            border-right-color: transparent;
            border-bottom-color: transparent;
        }

        @media (min-width: $tablet-breakpoint) {
            width: 65px;
            padding: 0 15px;
            font-size: 16px;
        }

        @media (min-width: $desktop-breakpoint) {
            width: 80px;
            height: 40px;
            padding: 0 20px;
            font-size: 18px;

            &::after {
                border: 20px solid $dark-100;
                border-right-color: transparent;
                border-bottom-color: transparent;
            }
        }

        @media (min-width: $lg-desktop-breakpoint) {
            width: 150px;
            height: 48px;
            padding: 0 24px;
            font-size: 20px;

            &::after {
                border: 24px solid $dark-100;
                border-right-color: transparent;
                border-bottom-color: transparent;
            }
        }
    }
}
</style>