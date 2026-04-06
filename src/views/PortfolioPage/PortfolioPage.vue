<template>
    <div class="portfolio-page">
        <AppContainer>
            <ParagraphsList
                :items="topParagraphs"
                :breadcrumbs="portfolioData?.breadcrumbs"
            />
            <InnerContainer>
                <template #sidebar>
                    <PortfolioFacts
                        v-if="factNumbers?.items?.length && !isMobileSize"
                        :data="factNumbers"
                        full-width
                    />
                </template>
                <template #content>
                    <PortfolioFacts
                        v-if="factNumbers?.items?.length && isMobileSize"
                        :data="factNumbers"
                    />
                    <PortfolioList
                        v-if="frames?.length"
                    />
                    <ParagraphsList
                        v-if="paragraphs?.length"
                        :items="paragraphs"
                    />
                </template>
            </InnerContainer>
            <div v-if="hasPagination" class="portfolio-page__pagination">
                <AppPagination
                    :limit="portfolioData?.limit"
                    :total="portfolioData?.total_items"
                    :page="portfolioData?.page"
                    @on-change="onPaginationChange"
                    @on-load="onPaginationChange($event, true)"
                />
            </div>
        </AppContainer>
    </div>
</template>

<script setup>
import AppContainer from '~/shared/ui/Containers/AppContainer.vue'
import InnerContainer from '~/shared/ui/Containers/InnerContainer.vue'
import ParagraphsList from '~/widgets/paragraphs/ParagraphList.vue'

import PortfolioFacts from './ui/PortfolioFacts.vue'
import PortfolioList from './ui/PortfolioList.vue'

import { useRootStore } from '~/entities/root/store/root-store'
import { usePortfolioPageStore } from '~/views/PortfolioPage/store/portfolio-page-store'
import { useBreakPoints } from '~/shared/composables/useBreakpoints'
import { useParagraphs } from '~/widgets/paragraphs/composables/useParagraphs'
import { apiService } from '~/app/api'

const AppPagination = defineAsyncComponent(() => import('~/shared/ui/Navigation/AppPagination.vue'))

const rootStore = useRootStore()
const portfolioStore = usePortfolioPageStore()
const { portfolioData, frames } = toRefs(portfolioStore)

const { isMobileSize } = useBreakPoints()
const { locale } = useI18n()
const route = useRoute()
const { topParagraphs, bottomParagraphs } = useParagraphs(portfolioData.value?.dynamic_data.paragraphs)

const paragraphs = computed(() => bottomParagraphs.value?.filter((p) => p.paragraph_type !== 'facts_numbers'))
const factNumbers = computed(() => bottomParagraphs.value?.find((p) => p.paragraph_type === 'facts_numbers'))
const hasPagination = computed(() => portfolioData.value?.limit < portfolioData.value?.total_items)

const onPaginationChange = async (data, expand = false) => {
    rootStore.TOGGLE_LOADING_STATUS()
    const response = await apiService.getPathByAlias({
        lang: locale.value,
        url: route.path,
        queryParams: data.queryParamsWithoutQuestionMark
    })
    const items = expand
        ? [...frames.value, ...response.items]
        : [...response.items]

    portfolioStore.SET_PORTFOLIO_PAGE_DATA(response)
    portfolioStore.SET_FRAMES(items)
    rootStore.TOGGLE_LOADING_STATUS()
}
</script>

<style lang="scss" scoped>
.portfolio-page {
    .portfolio-page__pagination {
        margin-bottom: 20px;

        @media (min-width: $tablet-breakpoint) {
            margin-bottom: 40px;
        }

        @media (min-width: $desktop-breakpoint) {
            margin-bottom: 80px;
        }

        @media (min-width: $lg-desktop-breakpoint) {
            margin-bottom: 96px;
        }
    }
}
</style>
