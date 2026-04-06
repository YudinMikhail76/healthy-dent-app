<template>
    <div class="reviews-page">
        <PageHeading
            :breadcrumbs="reviewsPageData?.breadcrumbs"
            :title="reviewsPageData.dynamic_data.title"
            :subtitle="pageSubtitle"
        />
        <AppContainer>
            <InnerContainer>
                <template #sidebar>
                    <div class="reviews-page__sidebar">
                        <ReviewsFilter :items="reviewsPageData.services" />
                        <ReviewsCompanyRating :data="reviewsPageData.aggregate_rating" />
                    </div>
                </template>
                <template #content>
                    <div class="reviews-page__blocks">
                        <ReviewCard
                            v-for="item, index in frames"
                            :key="index"
                            :data="item"
                        />
                    </div>
                    <div v-if="hasPagination" class="reviews-page__pagination">
                        <AppPagination
                            :limit="reviewsPageData?.limit"
                            :total="reviewsPageData?.total_items"
                            :page="reviewsPageData?.page"
                            @on-change="onPaginationChange"
                            @on-load="onPaginationChange($event, true)"
                        />
                    </div>
                    <ParagraphsList
                        v-if="metaTagsParagraphs?.length > 0"
                        :items="metaTagsParagraphs"
                        :breadcrumbs="reviewsPageData?.breadcrumbs"
                    />
                </template>
            </InnerContainer>
        </AppContainer>
    </div>
</template>

<script setup>
import AppContainer from '~/shared/ui/Containers/AppContainer.vue'
import InnerContainer from '~/shared/ui/Containers/InnerContainer.vue'
import PageHeading from '~/shared/ui/Heading/PageHeading.vue'
import ReviewsFilter from './ui/ReviewsFilter.vue'
import ReviewsCompanyRating from './ui/ReviewsCompanyRating.vue'
import ReviewCard from '~/entities/reviews/ui/ReviewCard.vue'

import { useRootStore } from '~/entities/root/store/root-store'
import { apiService } from '~/app/api'
import { useReviewsPageStore } from '~/views/Reviews/store/reviews-store'
import { useActiveModalsStore } from '~/entities/active-modals/store/active-modals'
import { useModalsStore } from '~/entities/modals/store/modals-store'
import { MODALS_KEYS } from '~/entities/active-modals/constants'
import ParagraphsList from '~/widgets/paragraphs/ParagraphList'

const AppPagination = defineAsyncComponent(() => import('~/shared/ui/Navigation/AppPagination.vue'))

const rootStore = useRootStore()
const reviewsPageStore = useReviewsPageStore()
const activeModalsStore = useActiveModalsStore()
const modalsStore = useModalsStore()
const { reviewsPageData, frames } = toRefs(reviewsPageStore)

const { locale } = useI18n()
const route = useRoute()

const metaTagsParagraphs = computed(() => reviewsPageData.value?.metatags.paragraphs)
const hasPagination = computed(() => reviewsPageData.value?.limit < reviewsPageData.value?.total_items)
const pageSubtitle = computed(() => reviewsPageData.value?.metatags?.title_h1 || reviewsPageData.value?.dynamic_data?.subtitle)

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

    reviewsPageStore.SET_REVIEWS_PAGE_DATA(response)
    reviewsPageStore.SET_FRAMES(items)
    rootStore.TOGGLE_LOADING_STATUS()
}

onMounted(() => {
    if (route.query?.check_logged_in) {
        activeModalsStore.ADD_ACTIVE_KEYS([MODALS_KEYS.REVIEW])
        modalsStore.TOGGLE_REVIEW_MODAL()
    }
})
</script>

<style lang="scss" scoped>
.reviews-page {
    &__sidebar {
        @media (min-width: $desktop-breakpoint) {
            margin-bottom: 80px;
        }

        @media (min-width: $lg-desktop-breakpoint) {
            margin-bottom: 96px;
        }
    }

    &__blocks {
        display: flex;
        flex-direction: column;
        gap: 5px;
        margin: 60px 0;

        @media (min-width: $tablet-breakpoint) {
            gap: 8px;
        }

        @media (min-width: $desktop-breakpoint) {
            gap: 10px;
            margin: 0 0 80px;
        }

        @media (min-width: $lg-desktop-breakpoint) {
            gap: 12px;
            margin: 0 0 96px;
        }
    }

    &__pagination {
        margin-bottom: 40px;

        @media (min-width: $tablet-breakpoint) {
            margin-bottom: 60px;
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