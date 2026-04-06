<template>
    <div class="gallery-item">
        <slot />
    </div>
</template>

<style lang="scss" scoped>
.gallery-item {
    width: 280px;

    @media (min-width: $tablet-breakpoint) {
        width: 360px;
    }

    @media (min-width: $desktop-breakpoint) {
        width: 320px;
    }

    @media (min-width: $lg-desktop-breakpoint) {
        width: 480px;
    }
}
</style>