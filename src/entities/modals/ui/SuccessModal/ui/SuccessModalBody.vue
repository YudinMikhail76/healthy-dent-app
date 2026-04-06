<template>
    <div class="success-modal-body">
        <div class="success-modal-body__icon">
            <BracketLeft />
        </div>
        <div class="success-modal-body__text">
            {{ successModalData.description }}
        </div>
        <div class="success-modal-body__icon success-modal-body__icon--right">
            <BracketRight />
        </div>
    </div>
</template>

<script setup>
import { useSuccessModalStore } from '~/entities/modals/ui/SuccessModal/store/success-modal-store'

import BracketLeft from '~/shared/assets/icons/bracket-left.svg'
import BracketRight from '~/shared/assets/icons/bracket-right.svg'

const successModalStore = useSuccessModalStore()
const { successModalData } = toRefs(successModalStore)
</script>

<style lang="scss" scoped>
.success-modal-body {
    display: flex;
    gap: 10px;
    width: calc(100% - 60px);
    padding: 0 20px 20px;

    @media (min-width: $tablet-breakpoint) {
        width: calc(100% - 78px);
        padding: 0 30px 30px;
    }

    @media (min-width: $desktop-breakpoint) {
        width: calc(100% - 96px);
        padding: 0 40px 40px;
    }

    @media (min-width: $lg-desktop-breakpoint) {
        width: calc(100% - 120px);
        padding: 0 48px 48px;
    }

    &__icon {
        flex-shrink: 0;
        width: 8px;
        height: 22px;
        stroke: $primary-500;

        @media (min-width: $tablet-breakpoint) {
            width: 9px;
            height: 24px;
        }

        @media (min-width: $desktop-breakpoint) {
            width: 10px;
            height: 26px;
        }

        @media (min-width: $lg-desktop-breakpoint) {
            width: 11px;
            height: 29px;
        }

        &--right {
            align-self: flex-end;
        }

        svg {
            width: 100%;
            height: 100%;
        }
    }

    &__text {
        font-size: 18px;
        font-weight: 400;
        line-height: 120%;
        color: $primary-300;

        @media (min-width: $tablet-breakpoint) {
            font-size: 20px;
        }

        @media (min-width: $desktop-breakpoint) {
            font-size: 22px;
        }

        @media (min-width: $lg-desktop-breakpoint) {
            font-size: 24px;
        }
    }
}
</style>