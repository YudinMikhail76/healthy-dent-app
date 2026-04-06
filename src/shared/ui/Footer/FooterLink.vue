<template>
    <NuxtLink class="footer-link">
        <slot />
    </NuxtLink>
</template>

<style lang="scss" scoped>
.footer-link {
    display: inline-block;
    min-height: 32px;
    padding: 5px 8px;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 140%;
    color: $dark-500;
    word-break: normal;
    background-color: rgba($light, .25);
    border-radius: 6px;
    transition: $base-ui-transition;

    @media (any-hover: hover) {
        &:hover {
            color: $dark-500;
            background-color: $light;
        }
    }

    @media (min-width: $tablet-breakpoint) {
        padding: 6px 12px;
        font-size: 16px;
        border-radius: 8px;
    }

    @media (min-width: $desktop-breakpoint) {
        padding: 7px 14px;
        font-size: 18px;
        border-radius: 10px;
    }

    @media (min-width: $lg-desktop-breakpoint) {
        padding: 9px 16px;
        font-size: 20px;
        border-radius: 12px;
    }
}
</style>