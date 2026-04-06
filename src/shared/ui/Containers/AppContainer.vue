<template>
    <div class="app-container">
        <slot />
    </div>
</template>

<style scoped lang="scss">
.app-container {
    max-width: 1920px;
    padding: 0 20px;
    margin: 0 auto;

    @media (min-width: $tablet-breakpoint) {
        padding: 0 30px;
    }

    @media (min-width: $desktop-breakpoint) {
        padding: 0 40px;
    }

    @media (min-width: $lg-desktop-breakpoint) {
        padding: 0 48px;
    }
}
</style>
