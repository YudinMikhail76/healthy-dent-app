<template>
    <div :class="['author', { 'author--full-width': fullWidth }]">
        <div class="author__content">
            <div class="author__title">
                {{ title }}
            </div>
            <div class="author__data">
                <NuxtLink :to="localePath(doctor?.url)" class="author__name">
                    {{ name }}
                </NuxtLink>
                <div class="author__position">
                    {{ position }}
                </div>
            </div>
        </div>
        <div class="author__avatar-container">
            <AppImage
                :urls="image?.urls"
                :title="image?.alt"
                :alt="image?.alt"
            />
        </div>
    </div>
</template>

<script setup>
import AppImage from '~/shared/ui/Media/AppImage.vue'

defineProps({
    title: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    position: {
        type: String,
        required: true
    },
    doctor: {
        type: Object,
        required: true
    },
    image: {
        type: Object,
        required: true
    },
    fullWidth: {
        type: Boolean,
        required: false
    }
})

const localePath = useLocalePath()
</script>

<style lang="scss" scoped>
.author {
    display: flex;
    align-items: center;
    gap: 15px;
    padding: 15px;
    margin-bottom: 3px;
    font-size: 14px;
    font-style: normal;
    line-height: 140%;
    background-color: $dark-100;
    border-radius: 7px;

    @media (min-width: $tablet-breakpoint) {
        width: 50%;
        padding: 20px;
    }

    @media (min-width: $desktop-breakpoint) {
        gap: 20px;
        font-size: 18px;
        border-radius: 12px;
    }

    @media (min-width: $lg-desktop-breakpoint) {
        gap: 24px;
        padding: 24px;
        font-size: 20px;
        border-radius: 15px;
    }

    &--full-width {
        width: 100%;
    }

    &__content {
        display: flex;
        flex-direction: column;
        flex-grow: 1;
    }

    &__title {
        margin-bottom: 20px;
        font-weight: 400;
        color: $primary-300;

        @media (min-width: $desktop-breakpoint) {
            margin-bottom: 40px;
        }

        @media (min-width: $lg-desktop-breakpoint) {
            margin-bottom: 48px;
        }
    }

    &__name {
        font-weight: 700;
        color: $dark-500;

        @media (min-width: $desktop-breakpoint) {
            margin-bottom: 5px;
        }

        @media (min-width: $lg-desktop-breakpoint) {
            margin-bottom: 6px;
        }
    }

    &__position {
        font-weight: 400;
    }

    &__avatar-container {
        width: 56px;
        height: 56px;
        overflow: hidden;
        background-color: $secondary-100;
        border-radius: 50%;

        @media (min-width: $desktop-breakpoint) {
            width: 88px;
            height: 88px;
        }

        @media (min-width: $lg-desktop-breakpoint) {
            width: 120px;
            height: 120px;
        }
    }
}
</style>