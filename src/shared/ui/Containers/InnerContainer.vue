<template>
    <div class="layout-container__row">
        <aside class="layout-container__sidebar">
            <slot name="sidebar" />
        </aside>
        <div class="layout-container__content">
            <slot name="content" />
        </div>
    </div>
</template>

<style lang="scss" scoped>
.layout-container {
    &__row {
        display: flex;
        flex-direction: column;
        align-items: flex-start;

        @media (min-width: $desktop-breakpoint) {
            flex-direction: row;
            gap: 5.333%;
        }

        @media (min-width: $lg-desktop-breakpoint) {
            flex-direction: row;
            gap: 96px;
        }
    }

    &__sidebar {
        width: 100%;

        @media (min-width: $desktop-breakpoint) {
            position: sticky;
            top: 110px;
            display: flex;
            width: 24%;
            min-width: 288px;
        }

        @media (min-width: $lg-desktop-breakpoint) {
            min-width: 384px;
        }
    }

    &__content {
        flex-grow: 1;
        width: 100%;
        overflow: hidden;
    }
}
</style>