<template>
    <div class="services-list">
        <PriceCard
            v-for="item in items"
            :id="`service-${ item.tid }`"
            :key="item.tid"
            :data="item"
        >
            <PriceTeaser v-if="shouldRenderTeaser(item)" :data="item">
                <template v-if="shouldRenderRightBlock(item)" #right-block>
                    <PriceTeaserSchedule v-if="hasScheduleCounts(item)" :data="item" />
                    <PriceTeaserStrings v-else-if="hasDiscountPriceStrings(item)" :items="item?.promotion?.discount_prices_strings" />
                </template>
            </PriceTeaser>
            <PriceStringServiceList v-if="hasServicePriceStrings(item)" :data="item?.prices_strings" />
        </PriceCard>
    </div>
</template>

<script setup>
import PriceCard from '~/entities/price-card-list/ui/PriceCard.vue'
import { TEASER_TYPES } from '../constants'
import PriceTeaserStrings from '~/entities/price-card-list/ui/PriceTeaserStrings.vue'
import { isArrayWithItems, isNonEmptyObject } from '~/shared/utils/helpers'

const PriceTeaserSchedule = defineAsyncComponent(() => import('~/entities/price-card-list/ui/PriceTeaserSchedule.vue'))
const PriceStringServiceList = defineAsyncComponent(() => import('~/entities/price-card-list/ui/PriceStringServiceList.vue'))
const PriceTeaser = defineAsyncComponent(() => import('~/entities/price-card-list/ui/PriceTeaser.vue'))

const props = defineProps({
    items: {
        type: Array,
        default: () => []
    }
})

const shouldRenderTeaser = (item) => isNonEmptyObject(item?.promotion)
const isHotHoursType = (item) => item?.promotion && item?.promotion?.type === TEASER_TYPES.HOT_HOURS

const hasScheduleCounts = (item) => isHotHoursType(item) && isNonEmptyObject(item?.promotion?.schedule_counts)
const hasServicePriceStrings = (item) => isArrayWithItems(item?.prices_strings)
const hasDiscountPriceStrings = (item) => {
    return item?.promotion 
        && item?.promotion?.type === TEASER_TYPES.DISCOUNT 
        && !!item?.promotion?.discount_prices_strings?.length
}
const shouldRenderRightBlock = (item) => hasScheduleCounts(item) || hasDiscountPriceStrings(item)
</script>