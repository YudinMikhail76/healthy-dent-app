<template>
    <ParagraphItemContainer class="services-problems">
        <div v-if="data?.title" class="services-problems__block">
            <h2 class="services-problems__title">
                {{ data.title }}
            </h2>
        </div>
        <div
            v-for="item in data.items"
            :key="item.title"
            class="services-problems__block"
        >
            <ServicesProblemsItem :data="item" />
        </div>
    </ParagraphItemContainer>
</template>

<script setup>
import ParagraphItemContainer from '~/shared/ui/Containers/ParagraphItemContainer.vue'
import ServicesProblemsItem from './ui/ServicesProblemsItem.vue'

defineProps({
    data: {
        type: Object,
        required: true
    }
})
</script>

<style lang="scss" scoped>
.services-problems {
    display: flex;
    flex-direction: column;
    gap: 20px;

    @media (min-width: $tablet-breakpoint) {
        gap: 30px;
    }

    @media (min-width: $desktop-breakpoint) {
        gap: 40px;
    }

    @media (min-width: $lg-desktop-breakpoint) {
        gap: 48px;
    }

    &__block {
        &::after {
            content: '';
            display: block;
            width: 100%;
            height: 1px;
            margin-top: 20px;
            background-color: $secondary-100;

            @media (min-width: $tablet-breakpoint) {
                margin-top: 30px;
            }

            @media (min-width: $desktop-breakpoint) {
                margin-top: 40px;
            }

            @media (min-width: $lg-desktop-breakpoint) {
                margin-top: 48px;
            }
        }

        &:last-child::after {
            display: none;
        }
    }

    &__title {
        font-size: 24px;
        font-style: normal;
        font-weight: 700;
        line-height: 120%;
        color: $dark-500;

        @media (min-width: $tablet-breakpoint) {
            font-size: 28px;
        }

        @media (min-width: $desktop-breakpoint) {
            font-size: 32px;
        }

        @media (min-width: $lg-desktop-breakpoint) {
            font-size: 48px;
        }
    }
}
</style>