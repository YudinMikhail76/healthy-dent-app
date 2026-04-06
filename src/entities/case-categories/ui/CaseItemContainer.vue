<template>
    <div class="case-item-container">
        <slot />
    </div>
</template>

<style lang="scss" scoped>
.case-item-container {
    display: flex;
    flex-direction: column;
    gap: 20px;

    @media (min-width: $tablet-breakpoint) {
        gap: 30px;
    }

    @media (min-width: $desktop-breakpoint) {
        gap: 20px;
    }

    @media (min-width: $lg-desktop-breakpoint) {
        gap: 24px;
    }

    &__img-wrap {
        position: relative;
        height: 200px;

        @media (min-width: $lg-desktop-breakpoint) {
            height: 336px;
        }
    }

    &__img {
        object-fit: cover;
        border-radius: 7px;

        @media (min-width: $tablet-breakpoint) {
            border-radius: 10px;
        }

        @media (min-width: $desktop-breakpoint) {
            border-radius: 15px;
        }
    }
}
</style>