<template>
    <div class="portfolio-list">
        <h2 class="portfolio-list__title">
            {{ $t('portfolioPage.title') }}
        </h2>
        <div class="portfolio-list__items">
            <template v-for="(item, index) in frames" :key="item.id">
                <CaseMaximum
                    v-if="item.case_type === CASE_TYPES.MAXIMUM"
                    class="portfolio-list__item portfolio-list__item--maximum"
                    :data="item"
                    :lazy="index > 1"
                />
                <CaseVideoLink
                    v-else-if="item.case_type === CASE_TYPES.VIDEO"
                    :data="item"
                    class="portfolio-list__item portfolio-list__item--regular"
                    :lazy="index > 1"
                />
                <CaseItemRegular
                    v-else-if="item.case_type === CASE_TYPES.MINIMAL"
                    :data="item"
                    class="portfolio-list__item portfolio-list__item--regular"
                    :lazy="index > 1"
                />
                <CaseItemRegular
                    v-else-if="item.case_type === CASE_TYPES.BEFORE_AFTER"
                    :data="item"
                    class="portfolio-list__item portfolio-list__item--regular"
                    :lazy="index > 1"
                />
            </template>
        </div>
    </div>
</template>

<script setup>
import { CASE_TYPES } from '~/entities/case-categories/constants'
import { usePortfolioPageStore } from '~/views/PortfolioPage/store/portfolio-page-store'

const CaseMaximum = defineAsyncComponent(() => import('~/entities/case-categories/ui/CaseMaximum.vue'))
const CaseVideoLink = defineAsyncComponent(() => import('~/entities/case-categories/ui/CaseVideoLink.vue'))
const CaseItemRegular = defineAsyncComponent(() => import('~/entities/case-categories/ui/CaseItemRegular.vue'))

const portfolioStore = usePortfolioPageStore()
const { frames } = toRefs(portfolioStore)
</script>

<style lang="scss" scoped>
.portfolio-list {
    display: block;
    margin: 0 0 40px;

    @media (min-width: $tablet-breakpoint) {
        margin: 0 0 60px;
    }

    @media (min-width: $desktop-breakpoint) {
        margin: 0 0 80px;
    }

    @media (min-width: $lg-desktop-breakpoint) {
        margin: 0 0 96px;
    }

    &__title {
        margin-bottom: 30px;
        font-size: 24px;
        font-style: normal;
        font-weight: 700;
        line-height: 120%;

        @media (min-width: $tablet-breakpoint) {
            font-size: 28px;
        }

        @media (min-width: $desktop-breakpoint) {
            margin-bottom: 48px;
            font-size: 40px;
        }

        @media (min-width: $lg-desktop-breakpoint) {
            font-size: 48px;
        }
    }

    &__items {
        @media (min-width: $tablet-breakpoint) {
            display: flex;
            flex-wrap: wrap;
        }
    }

    &__item {
        display: block;
        padding: 20px;
        background-color: $light;
        border: 3px solid $secondary-100;
        border-radius: 15px;

        @media (min-width: $tablet-breakpoint) {
            padding: 30px;
            border-radius: 20px;
        }

        @media (min-width: $desktop-breakpoint) {
            padding: 40px;
            border-radius: 25px;
        }

        @media (min-width: $lg-desktop-breakpoint) {
            padding: 48px;
            border-radius: 30px;
        }

        &--regular {
            @media (min-width: $tablet-breakpoint) {
                width: 50%;
            }
        }

        &--maximum {
            display: flex;
            width: 100%;
        }
    }

    &__all-link {
        margin-top: 5px;

        @media (min-width: $tablet-breakpoint) {
            margin-top: 8px;
        }

        @media (min-width: $desktop-breakpoint) {
            margin-top: 10px;
        }

        @media (min-width: $lg-desktop-breakpoint) {
            margin-top: 12px;
        }
    }
}
</style>