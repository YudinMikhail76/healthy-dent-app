<template>
    <div class="promotions-page">
        <AppContainer>
            <ParagraphsList
                v-if="topParagraphs"
                :items="topParagraphs"
                :breadcrumbs="breadcrumbs"
            />
            <slot name="between-blocks" />
            <InnerContainer>
                <template #sidebar>
                    <PromoFacetsBlock v-if="facets?.length" :facets="facets" />
                </template>
                <template #content>
                    <PromoCard
                        v-for="(item, index) in cards"
                        :key="item.nid"
                        :data="item"
                        :lazyImg="index > 0"
                    />
                    <div v-if="hasPagination" class="promotions-page__pagination">
                        <AppPagination
                            :limit="data?.limit"
                            :total="data?.total_items"
                            :page="data?.page"
                            @on-change="onPaginationChange"
                            @on-load="onPaginationChange($event, true)"
                        />
                    </div>
                    <ParagraphsList
                        v-if="bottomParagraphs?.length"
                        :items="bottomParagraphs"
                    />
                </template>
            </InnerContainer>
        </AppContainer>
        <AppLangHiddenLinks v-if="data?.locales" :locales="data.locales" />
    </div>
</template>

<script setup>
import { usePromotionsPageStore } from './store/promotions-page-store'
import { useParagraphs } from '~/widgets/paragraphs/composables/useParagraphs'
import { useRootStore } from '~/entities/root/store/root-store'
import PromoCard from './ui/PromoCard.vue'
import { apiService } from '~/app/api'
import AppLangHiddenLinks from '~/shared/ui/Links/AppLangHiddenLinks'

const PromoFacetsBlock = defineAsyncComponent(() => import('./ui/PromoFacetsBlock.vue'))
const AppPagination = defineAsyncComponent(() => import('~/shared/ui/Navigation/AppPagination.vue'))
const InnerContainer = defineAsyncComponent(() => import('~/shared/ui/Containers/InnerContainer.vue'))
const AppContainer = defineAsyncComponent(() => import('~/shared/ui/Containers/AppContainer.vue'))
const ParagraphsList = defineAsyncComponent(() => import('~/widgets/paragraphs/ParagraphList.vue'))

const promotionsStore = usePromotionsPageStore()
const { topParagraphs, bottomParagraphs } = useParagraphs(promotionsStore.promotionsData?.dynamic_data?.paragraphs)
const rootStore = useRootStore()
const { locale } = useI18n()
const route = useRoute() 

const breadcrumbs = computed(() => promotionsStore.promotionsData.breadcrumbs)
const cards = computed(() => promotionsStore.frames)
const facets = computed(() => promotionsStore?.promotionsData?.facets)
const data = computed(() => promotionsStore.promotionsData)
const hasPagination = computed(() => data.value?.limit < data.value?.total_items)

const onPaginationChange = async (data, expand = false) => {
    rootStore.TOGGLE_LOADING_STATUS()

    const response = await apiService.getPathByAlias({ 
        lang: locale.value,
        url: route.path,
        queryParams: data.queryParamsWithoutQuestionMark
    })
    const items = expand
        ? [...cards.value, ...response.items]
        : [...response.items]

    promotionsStore.SET_PROMOTIONS_PAGE_DATA(response)
    promotionsStore.SET_FRAMES(items)
    rootStore.TOGGLE_LOADING_STATUS()
}
</script>

<style scoped lang="scss">
.promotions-page {
    &__pagination {
        margin-bottom: 20px;

        @media (min-width: $tablet-breakpoint) {
            margin-bottom: 30px;
        }

        @media (min-width: $desktop-breakpoint) {
            margin-bottom: 40px;
        }

        @media (min-width: $lg-desktop-breakpoint) {
            margin-bottom: 48px;
        }
    }
}
</style>