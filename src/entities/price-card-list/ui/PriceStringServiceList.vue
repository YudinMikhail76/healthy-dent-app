<template>
    <div class="price-string-table">
        <div v-for="(item, idx) in data" :key="idx" class="price-string-table__item">
            <div class="price-string-table__service">
                <div class="price-string-table__link">
                    <AppLink
                        v-if="Object.keys(item?.title_with_link).length"
                        :to="localePath(item.title_with_link?.link)"
                        variant="default"
                    >
                        {{ item.title_with_link.text }}
                    </AppLink>
                </div>
                <div class="price-string-table__desc">
                    {{ item?.title_without_link?.text }}
                </div>
            </div>
            <div class="price-string-table__prices">
                <div class="price-string-table__price-text">
                    <AppBadge v-if="item.is_promotion" class="price-string-table__badge">
                        {{ $t('global.promo') }}
                    </AppBadge>
                    <span
                        v-if="!item?.price2?.is_free && !!item?.price1?.price"
                        :class="[{ 'price-string-table__price-crossed': item?.price1.is_crossed }]"
                    >
                        {{ item?.price1?.prefix }}
                        {{ formatPrice(item?.price1?.price) }}
                        {{ getCurrencyChar(item?.currency) }}
                    </span>
                    <template v-if="item?.price2?.prefix">
                        &nbsp;
                        {{ item?.price2?.prefix }}
                    </template>
                    <span class="price-string-table__current-price">
                        <template v-if="item?.price2?.is_free">
                            {{ $t('promo.prices.free') }}
                        </template>
                        <template v-else-if="!!item?.price2?.price">
                            &nbsp;
                            {{ formatPrice(item?.price2?.price) }}
                            {{ getCurrencyChar(item?.currency) }}
                        </template>
                    </span>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import AppBadge from '~/shared/ui/Info/AppBadge.vue'
import AppLink from '~/shared/ui/Links/AppLink.vue'
import { getCurrencyChar } from '~/shared/constants'
import { formatPrice } from '~/shared/utils/helpers'

const props = defineProps({
    data: {
        type: Object,
        required: true
    }
})

const localePath = useLocalePath()
</script>

<style lang="scss" scoped>
.price-string-table {
    &__item {
        display: flex;
        flex-direction: column;
        gap: 8px;
        padding: 12px 0;

        &:not(:last-child) {
            border-bottom: 1px solid $dark-100;
        }

        @media (min-width: $tablet-breakpoint) {
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
            gap: 15px;
            padding: 8px 0;
        }

        @media (min-width: $desktop-breakpoint) {
            gap: 20px;
            padding: 10px;
        }

        @media (min-width: $lg-desktop-breakpoint) {
            gap: 24px;
            padding: 12px;
        }
    }

    &__service {
        display: flex;
        flex-direction: column;
        gap: 5px;

        @media (min-width: $tablet-breakpoint) {
            flex-direction: row;
            align-items: center;
        }
    }

    &__link {
        flex-shrink: 0;

        :deep(a) {
            margin: 0;
            color: $primary-500;
        }
    }

    &__desc {
        font-size: 14px;
        font-style: normal;
        font-weight: 400;
        line-height: 140%;

        @media (min-width: $tablet-breakpoint) {
            font-size: 16px;
        }

        @media (min-width: $desktop-breakpoint) {
            font-size: 18px;
        }

        @media (min-width: $lg-desktop-breakpoint) {
            font-size: 20px;
        }
    }

    &__prices {
        display: flex;
        justify-content: flex-end;

        @media (min-width: $tablet-breakpoint) {
            min-width: 220px;
        }

        @media (min-width: $desktop-breakpoint) {
            min-width: 280px;
        }
    }

    &__price-text {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        font-size: 14px;
        font-style: normal;
        line-height: 140%;

        @media (min-width: $tablet-breakpoint) {
            font-size: 16px;
        }

        @media (min-width: $desktop-breakpoint) {
            font-size: 20px;
        }
    }

    &__current-price {
        font-weight: 700;
    }

    &__price-crossed {
        text-decoration-line: line-through;
        text-align: right;
    }

    &__badge {
        margin-right: 10px;
    }
}
</style>