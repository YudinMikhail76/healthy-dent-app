<template>
    <div class="prices">
        <PageHeading
            :title="pricesStore.pricesData?.dynamic_data.title"
            :subtitle="pricesStore.pricesData?.dynamic_data?.subtitle"
            :breadcrumbs="[]"
        />
        <AppContainer>
            <div class="prices__top-paragraphs">
                <ParagraphsList
                    v-if="bannerParagraphs"
                    :items="bannerParagraphs"
                />
            </div>
            <InnerContainer>
                <template #sidebar>
                    <PageNavigation v-if="allLinks?.length > 0" :items="allLinks" />
                </template>
                <template #content>
                    <ParagraphsList
                        v-if="loyaltyParagraphs.length"
                        :items="loyaltyParagraphs"
                    />
                    <PriceServicesList v-if="startingServices?.length" :items="startingServices" />
                    <template v-if="specialPricePackages.length">
                        <PricePackages
                            v-for="item in specialPricePackages"
                            :data="item"
                            :title="item.name"
                        />
                    </template>
                    <PriceServicesList v-if="servicesAfterImplantation?.length" :items="servicesAfterImplantation" />
                    <PriceServicesList v-if="hasNoSeparatedServices" :items="services" />
                    <template v-if="otherPricePackages.length">
                        <PricePackages
                            v-for="item in otherPricePackages"
                            :key="item.tid"
                            :data="item"
                            :title="item.name"
                        />
                    </template>
                    <template v-if="hasNoSeparatedPackages">
                        <PricePackages
                            v-for="item in allPricePackages"
                            :key="item.tid"
                            :data="item"
                            :title="item.name"
                        />
                    </template>
                    <ParagraphsList
                        v-if="bottomParagraphsWithoutLoyalty?.length"
                        :items="bottomParagraphsWithoutLoyalty"
                    />
                </template>
            </InnerContainer>
        </AppContainer>
        <!-- FOR SSR LINKS -->
        <AppLangHiddenLinks v-if="locales" :locales="locales" />
    </div>
</template>

<script setup>
import { usePricesPageStore } from './store/prices-page-store'
import PageHeading from '~/shared/ui/Heading/PageHeading.vue'
import AppContainer from '~/shared/ui/Containers/AppContainer.vue'
import InnerContainer from '~/shared/ui/Containers/InnerContainer.vue'
import ParagraphsList from '~/widgets/paragraphs/ParagraphList.vue'
import { useParagraphs } from '~/widgets/paragraphs/composables/useParagraphs'
import PricePackages from '~/entities/price-packages/ui/PricePackages.vue'
import PriceServicesList from './ui/PriceServicesList.vue'
import {
    BLOCK_IDS,
    IMPLANTATION_ID,
    LOYALTY_PARAGRAPH_TYPE,
    SPECIAL_PRICE_PACKAGE_ID
} from './constants'
import AppLangHiddenLinks from '~/shared/ui/Links/AppLangHiddenLinks'

const PageNavigation = defineAsyncComponent(() => import('~/entities/links/ui/PageNavigation.vue'))

const pricesStore = usePricesPageStore()

// PARAGRAPHS BLOCKS
const { 
    topParagraphs: bannerParagraphs,
    bottomParagraphs 
} = useParagraphs(pricesStore.pricesData?.dynamic_data?.paragraphs)
const allParagraphs = computed(() => pricesStore.pricesData?.dynamic_data?.paragraphs)
const loyaltyParagraphs = computed(() => allParagraphs.value.filter((p) => p.paragraph_type === LOYALTY_PARAGRAPH_TYPE))
const bottomParagraphsWithoutLoyalty = computed(() => bottomParagraphs.value.filter(
    (p) => p.paragraph_type !== LOYALTY_PARAGRAPH_TYPE)
)

// SERVICES BLOCKS
const services = computed(() => pricesStore.pricesData?.services)
const implantationIndex = computed(() => services.value?.findIndex((item) => item.tid === IMPLANTATION_ID))
const separatedServices = computed(() => {
    return implantationIndex.value !== -1
        ? splitServicesByIndex(services.value, implantationIndex.value)
        : { before: [], after: [] }
})
const startingServices = computed(() => separatedServices.value.before)
const servicesAfterImplantation  = computed(() => separatedServices.value.after)
const hasNoSeparatedServices = computed(() => !startingServices.value?.length && !servicesAfterImplantation.value?.length)

// PRICE PACKAGES BLOCKS
const allPricePackages = computed(() => pricesStore.pricesData?.price_package_catalogs)
const specialPricePackages = computed(() => allPricePackages.value?.filter((item) => item.tid === SPECIAL_PRICE_PACKAGE_ID))
const otherPricePackages = computed(() => !!specialPricePackages.value.length 
    ? allPricePackages.value.filter((item) => item.tid !== SPECIAL_PRICE_PACKAGE_ID)
    : allPricePackages.value
)
const hasNoSeparatedPackages = computed(() => !specialPricePackages.value?.length && !otherPricePackages.value?.length)

// SIDEBAR LINKS
const serviceLinksBefore = computed(() => generateLinks(startingServices.value, BLOCK_IDS.SERVICE))
const serviceLinksAfter = computed(() => generateLinks(servicesAfterImplantation.value, BLOCK_IDS.SERVICE))
const pricePackagesLinksBefore = computed(() => generateLinks(specialPricePackages.value, BLOCK_IDS.PRICE_PACKAGE))
const pricePackagesLinksAfter = computed(() => generateLinks(otherPricePackages.value, BLOCK_IDS.PRICE_PACKAGE))
const allLinks = computed(() => [
    ...loyaltyParagraphs.value,
    ...serviceLinksBefore.value,
    ...pricePackagesLinksBefore.value,
    ...serviceLinksAfter.value,
    ...pricePackagesLinksAfter.value,
    ...bottomParagraphsWithoutLoyalty.value
])

const locales = computed(() => pricesStore.pricesData?.locales)

function splitServicesByIndex(services, index) {
    return {
        before: services.slice(0, index + 1),
        after: services.slice(index + 1),
    }
}

function generateLinks(items, prefix) {
    return items.map((item) => ({
        page_menu_name: item.name,
        id: `${prefix}-${item.tid}`,
    }))
}
</script>

<style scoped lang="scss">
.prices {
    &__top-paragraphs {
        padding: 20px 0;

        @media (min-width: $tablet-breakpoint) {
            padding: 30px 0;
        }

        @media (min-width: $desktop-breakpoint) {
            padding: 40px 0;
        }

        @media (min-width: $lg-desktop-breakpoint) {
            padding: 48px 0;
        }
    }
}
</style>