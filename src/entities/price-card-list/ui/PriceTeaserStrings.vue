<template>
    <div class="price-teaser-strings__price-strings">
        <div
            v-for="(item, idx) in items"
            :key="idx"
            class="price-teaser-strings__price-string"
        >
            {{ item.title_with_link?.text }}
            {{ item.title_without_link.text }}

            <div v-if="item?.price2?.is_free" class="price-teaser-strings__price-value">
                <div class="price-teaser-strings__bold">
                    {{ $t('promo.prices.free') }}
                </div>
            </div>
            <div
                v-else-if="item?.price1?.price || item?.price2?.price"
                class="price-teaser-strings__price-value"
            >
                <span class="price-teaser-strings__bracket">[</span>
                <span
                    v-if="!item?.price2?.is_free && !!item?.price1?.price"
                    :class="['price-teaser-strings__value', { 'price-teaser-strings__crossed': item.price1?.is_crossed }]"
                >
                    {{ item?.price1?.prefix }}
                    {{ formatPrice(item?.price1?.price) }}
                    {{ getCurrencyChar(item?.currency) }}
                </span>
                <span v-if="item?.price2?.prefix" class="price-teaser-strings__prefix">
                    {{ item?.price2?.prefix }}
                </span>
                <span class="price-teaser-strings__bold">
                    <template v-if="!!item?.price2?.price">
                        {{ formatPrice(item?.price2?.price) }}
                        {{ getCurrencyChar(item?.currency) }}
                    </template>
                </span>
                <span class="price-teaser-strings__bracket">]</span>
            </div>
        </div>
    </div>
</template>

<script setup>
import { getCurrencyChar } from '~/shared/constants'
import { formatPrice } from '~/shared/utils/helpers'

const props = defineProps({
    items: {
        type: Array,
        default: () => []
    }
})
</script>

<style lang="scss" scoped>
.price-teaser-strings {
    &__price-strings {
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        height: 100%;
    }

    &__price-string {
        display: flex;
        gap: 20px;
        font-size: 16px;
        font-style: normal;
        font-weight: 400;
        line-height: 140%;

        &:not(:last-child) {
            margin-bottom: 8px;
        }

        @media (min-width: $desktop-breakpoint) {
            font-size: 18px;
        }

        @media (min-width: $lg-desktop-breakpoint) {
            font-size: 20px;
        }
    }

    &__crossed {
        text-decoration: line-through;
    }

    &__price-value {
        display: flex;
        align-items: flex-start;
        justify-content: flex-end;
        gap: 3px;
        margin-left: auto;
        flex-wrap: wrap;
        min-width: 100px;

        @media (min-width: $tablet-breakpoint) {
            flex-wrap: nowrap;
            min-width: auto;
        }

        @media (min-width: $desktop-breakpoint) {
            gap: 6px;
        }
    }

    &__value {
        white-space: nowrap;
    }

    &__bold {
        font-weight: 700;
        white-space: nowrap;
    }
}
</style>