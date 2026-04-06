<template>
    <div class="case-item-title">
        <slot />
    </div>
</template>

<style lang="scss" scoped>
.case-item-title {
    font-size: 20px;
    font-style: normal;
    font-weight: 700;
    line-height: 120%;
    color: $dark-500;

    @media (min-width: $tablet-breakpoint) {
        font-size: 22px;
    }

    @media (min-width: $desktop-breakpoint) {
        font-size: 24px;
    }

    @media (min-width: $lg-desktop-breakpoint) {
        font-size: 32px;
    }
}
</style>