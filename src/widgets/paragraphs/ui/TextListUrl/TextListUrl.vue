<template>
    <div class="text-list-url">
        <div class="text-list-url__top">
            <p class="text-list-url__title">
                {{ data.title }}
            </p>
            <p class="text-list-url__description">
                {{ data.description }}
            </p>
        </div>
        <hr class="text-list-url__line">
        <div class="text-list-url__content">
            <Garanty
                v-for="(item, index) in data.items"
                :key="item.title"
                :data="item"
                :index="index"
            />
        </div>
        <AppLink :to="data.link.url" variant="primary" class="text-list-url__link">
            {{ data.link.title }}
        </AppLink>
    </div>
</template>

<script setup>
import Garanty from './ui/garanty.vue'
import AppLink from '~/shared/ui/Links/AppLink.vue'
defineProps({
    data: {
        type: Object,
        required: true
    }
})
</script>

<style lang="scss" scoped>
.text-list-url {
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding: 20px;
    margin: 40px 0;
    background: $light;
    border-radius: 15px;

    @media (min-width: $tablet-breakpoint) {
        gap: 30px;
        padding: 30px;
        margin: 60px 0;
    }

    @media (min-width: $desktop-breakpoint) {
        gap: 40px;
        padding: 40px;
        margin: 80px 0;
    }
    
    @media (min-width: $lg-desktop-breakpoint) {
        gap: 48px;        
        padding: 48px;
        margin: 96px 0;
    }

    &__top {
        display: flex;
        flex-direction: column;
        gap: 20px;

        @media (min-width: $tablet-breakpoint) {
            flex-direction: row;
            gap: 30px;
        }

        @media (min-width: $desktop-breakpoint) {
            gap: 40px;
        }

        @media (min-width: $lg-desktop-breakpoint) {
            gap: 48px;
        }
    }

    &__title {
        font-size: 24px;
        font-weight: 700;
        line-height: 120%;
        color: $dark-500;

        @media (min-width: $tablet-breakpoint) {
            width: 50%;
            font-size: 28px;
        }

        @media (min-width: $desktop-breakpoint) {
            font-size: 32px;
        }

        @media (min-width: $lg-desktop-breakpoint) {
            font-size: 48px;
        }
    }

    &__description {
        font-size: 14px;
        line-height: 140%;
        color: $dark-500;

        @media (min-width: $tablet-breakpoint) {
            width: 50%;
            font-size: 16px;
        }

        @media (min-width: $desktop-breakpoint) {
            font-size: 18px;
        }

        @media (min-width: $lg-desktop-breakpoint) {
            font-size: 20px;
        }
    }
    
    &__line {
        border: 0 solid $secondary-100;
        border-bottom: 1px solid $secondary-100;

        &::before {
            content: '';
            display: block;
            width: 20px;
            border: 0 solid $secondary-100;
            border-bottom: 3px solid $secondary-100;

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
    }

    &__content {
        display: flex;
        flex-direction: column;
        gap: 15px;

        @media (min-width: $tablet-breakpoint) {
            flex-direction: row;
            flex-wrap: wrap;
        }

        @media (min-width: $desktop-breakpoint) {
            gap: 20px;
        }

        @media (min-width: $lg-desktop-breakpoint) {
            gap: 24px;
        }
    }

    &__link {
        margin-right: auto;
        font-size: 16px;

        @media (min-width: $desktop-breakpoint) {
            font-size: 18px;
        }

        @media (min-width: $lg-desktop-breakpoint) {
            font-size: 20px;
        }
    }

}
</style>