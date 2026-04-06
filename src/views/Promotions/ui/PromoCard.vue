<template>
    <ParagraphItemContainer class="promo-card">
        <div class="promo-card__row">
            <PromoIntro :data="data" :lazyImg="lazyImg" />
            <template v-if="hasSchedule">
                <BlockSeparator class="promo-card__separator" />
                <PromoSchedule :items="data.schedule_counts" />
            </template>
            <template v-if="hasPricesStrings">
                <BlockSeparator class="promo-card__separator" />
                <PriceStringServiceList :data="data.discount_prices_strings" />
            </template>
            <template v-if="data?.description">
                <BlockSeparator class="promo-card__separator" />
                <PromoCardDescription :html="data.description" />
            </template>
            <template v-if="data?.connected_services?.length">
                <BlockSeparator class="promo-card__separator" />
                <PromoRelatedServices :items="data?.connected_services" />
            </template>
        </div>
    </ParagraphItemContainer>
</template>

<script setup>
import ParagraphItemContainer from '~/shared/ui/Containers/ParagraphItemContainer.vue'

import PromoIntro from './PromoIntro.vue'
import BlockSeparator from '~/shared/ui/Separators/BlockSeparator.vue'

const PriceStringServiceList = defineAsyncComponent(() => import('~/entities/price-card-list/ui/PriceStringServiceList.vue'))
const PromoRelatedServices = defineAsyncComponent(() => import('./PromoRelatedServices.vue'))
const PromoSchedule = defineAsyncComponent(() => import('./PromoSchedule.vue'))
const PromoCardDescription = defineAsyncComponent(() => import('./PromoCardDescription.vue'))

const props = defineProps({
    data: {
        type: Object,
        required: true
    },
    lazyImg: {
        type: Boolean,
        default: false
    }
})

const hasPricesStrings = computed(() => !!props.data?.discount_prices_strings?.length)
const hasSchedule = computed(() => !!Object.keys(props.data?.schedule_counts)?.length)
</script>

<style lang="scss" scoped>
.promo-card {
    &__separator {
        margin: 20px 0;

        @media (min-width: $tablet-breakpoint) {
            margin: 30px 0;
        }

        @media (min-width: $desktop-breakpoint) {
            margin: 40px 0;
        }

        @media (min-width: $lg-desktop-breakpoint) {
            margin: 48px 0;
        }
    }
}
</style>