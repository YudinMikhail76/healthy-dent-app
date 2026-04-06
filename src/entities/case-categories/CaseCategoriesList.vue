<template>
    <div class="case-categories">
        <h2 v-if="data?.title" class="case-categories__title">
            {{ data.title }}
        </h2>
        <div class="case-categories__items">
            <template v-for="item in data.items" :key="item.id">
                <CaseMaximum 
                    v-if="item.case_type === CASE_TYPES.MAXIMUM"
                    class="case-categories__item case-categories__item--maximum"
                    :data="item"
                    lazy
                />
                <CaseVideoLink
                    v-else-if="item.case_type === CASE_TYPES.VIDEO"
                    :data="item"
                    class="case-categories__item case-categories__item--regular"
                    lazy
                />
                <CaseItemRegular
                    v-else-if="item.case_type === CASE_TYPES.MINIMAL" 
                    :data="item"
                    class="case-categories__item case-categories__item--regular"
                    lazy
                />
                <CaseItemRegular 
                    v-else-if="item.case_type === CASE_TYPES.BEFORE_AFTER"
                    :data="item"
                    class="case-categories__item case-categories__item--regular"
                    lazy
                />
            </template>
        </div>
        <AppLoadMoreButton
            v-if="data?.all_cases_link?.url"
            :to="localePath(data?.all_cases_link?.url)"
            class="case-categories__all-link"
            align="center"
            full-width
        >
            <template #label>
                {{ data?.all_cases_link.title }}
            </template>
            <template #count>
                {{ data?.all_cases_link.count }}
            </template>
        </AppLoadMoreButton>
    </div>
</template>

<script setup>
import { CASE_TYPES } from './constants'

import AppLoadMoreButton from '~/shared/ui/Navigation/AppLoadMoreButton.vue'

const CaseMaximum = defineAsyncComponent(() => import('./ui/CaseMaximum.vue'))
const CaseVideoLink = defineAsyncComponent(() => import('./ui/CaseVideoLink.vue'))
const CaseItemRegular = defineAsyncComponent(() => import('./ui/CaseItemRegular.vue'))

defineProps({
    data: {
        type: Object,
        required: true
    }
})

const localePath = useLocalePath()
</script>

<style lang="scss" scoped>
.case-categories {
    display: block;
    margin: 40px 0;

    @media (min-width: $tablet-breakpoint) {
        margin: 60px 0;
    }

    @media (min-width: $desktop-breakpoint) {
        margin: 80px 0;
    }

    @media (min-width: $lg-desktop-breakpoint) {
        margin: 96px 0;
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