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
            <PriceTags v-if="item.children?.length" :items="item?.children" />
        </PriceCard>
    </div>
</template>

<script setup>
import PriceCard from '~/entities/price-card-list/ui/PriceCard.vue'
import { isNonEmptyObject } from '~/shared/utils/helpers'
import { TEASER_TYPES } from '~/views/Prices/constants'

const PriceTeaserStrings = defineAsyncComponent(() => import('~/entities/price-card-list/ui/PriceTeaserStrings.vue'))
const PriceTeaserSchedule = defineAsyncComponent(() => import('~/entities/price-card-list/ui/PriceTeaserSchedule.vue'))
const PriceTeaser = defineAsyncComponent(() => import('~/entities/price-card-list/ui/PriceTeaser.vue'))
const PriceTags = defineAsyncComponent(() => import('~/entities/price-card-list/ui/PriceTags.vue'))

defineProps({
    items: {
        type: Array,
        default: () => []
    }
})

const isHotHoursType = (item) => item?.promotion && item.promotion?.type === TEASER_TYPES.HOT_HOURS

const shouldRenderTeaser = (item) => isNonEmptyObject(item?.promotion)
const hasDiscountPriceStrings = (item) => {
    return item?.promotion 
        && item.promotion?.type === TEASER_TYPES.DISCOUNT 
        && !!item?.promotion?.discount_prices_strings?.length
}
const hasScheduleCounts = (item) => isHotHoursType(item) && isNonEmptyObject(item?.promotion?.schedule_counts)
const shouldRenderRightBlock = (item) => hasScheduleCounts(item) || hasDiscountPriceStrings(item)
</script>