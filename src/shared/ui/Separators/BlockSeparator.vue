<template>
    <div class="block-separator" />
</template>

<style lang="scss" scoped>
.block-separator {
    position: relative;
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 3px;

    &::before {
        content: '';
        display: block;
        width: 20px;
        height: 3px;
        background-color: $dark-200;

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

    &::after {
        content: '';
        display: block;
        width: 100%;
        height: 1px;
        background-color: $dark-200;
    }
}
</style>