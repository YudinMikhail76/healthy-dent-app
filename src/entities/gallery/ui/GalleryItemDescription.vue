<template>
    <div class="gallery-item-description">
        <slot />
    </div>
</template>

<style lang="scss" scoped>
.gallery-item-description {
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 140%;
    color: $dark-500;

    @media (min-width: $tablet-breakpoint) {
        font-size: 16px;
    }

    @media (min-width: $desktop-breakpoint) {
        font-size: 18px;
    }

    @media (min-width: $lg-desktop-breakpoint) {
        font-size: 20px;
    }
}
</style>