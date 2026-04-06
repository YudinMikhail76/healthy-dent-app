<template>
    <div class="filter">
        <AppDropdown
            swap-on-mobile
            is-row-reverse
            class="filter__dropdown"
            :label="$t('reviews.filter')"
            position="center"
        >
            <template #heading-icon>
                <FilterIcon />
            </template>
            <template #list>
                <ReviewFilterItem
                    v-for="item in items"
                    :key="item.tid"
                    :to="localePath(item.alias)"
                    :is-active="item.is_active"
                >
                    {{ item.name }}
                </ReviewFilterItem>
                <div class="filter__all">
                    <AppLink :to="localePath('/reviews')">
                        {{ $t('reviews.allReviews') }}
                    </AppLink>
                </div>
            </template>
        </AppDropdown>
        <div class="filter__sidebar">
            <ReviewFilterItem
                v-for="item in items"
                :key="item.tid"
                :to="localePath(item.alias)"
                :is-active="item.is_active"
            >
                {{ item.name }}
            </ReviewFilterItem>
            <div class="filter__all">
                <AppLink :to="localePath('/reviews')">
                    {{ $t('reviews.allReviews') }}
                </AppLink>
            </div>
        </div>
    </div>
</template>

<script setup>
import AppDropdown from '~/shared/ui/Dropdown/AppDropdown.vue'
import AppLink from '~/shared/ui/Links/AppLink.vue'
import ReviewFilterItem from './ReviewFilterItem.vue'
import FilterIcon from '~/shared/assets/icons/filter.svg'

defineProps({
    items: {
        type: Array,
        default: () => []
    }
})

const localePath = useLocalePath()
</script>

<style scoped lang="scss">
.filter {
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 5;
    width: 100%;
    padding: 20px;
    background-image: linear-gradient(180deg, transparent 0%, #CFCFD7 100%);

    @media (min-width: $tablet-breakpoint) {
        padding: 30px;
    }

    @media (min-width: $desktop-breakpoint) {
        position: static;
        padding: 0;
        background-image: none;
    }

    &__dropdown {
        width: 126px;
        margin: 0 auto;

        @media (min-width: $tablet-breakpoint) {
            width: 156px;
        }

        @media (min-width: $desktop-breakpoint) {
            display: none;
        }

        :deep(.dropdown__icon-container svg) {
            stroke: $light;
            stroke-width: .01px;
            width: 20px;
            height: 20px;
            fill: $dark-500;
        }
    }

    &__sidebar {
        display: none;

        @media (min-width: $desktop-breakpoint) {
            display: block;
            padding: 40px 0;
        }

        @media (min-width: $lg-desktop-breakpoint) {
            padding: 48px 0;
        }
    }

    &__all {
        :deep(.app-link) {
            margin: 30px 0 0 12px;

            @media (min-width: $desktop-breakpoint) {
                margin: 40px 0 0 14px;
            }

            @media (min-width: $lg-desktop-breakpoint) {
                margin: 48px 0 0 16px;
            }
        }
    }
}
</style>