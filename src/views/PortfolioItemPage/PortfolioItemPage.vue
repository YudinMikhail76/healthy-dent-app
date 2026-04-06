<template>
    <div ref="pageref" class="portfolio-item-page">
        <AppContainer>
            <PortfolioHeroBanner
                :data="portfolioItemData?.hero"
                :breadcrumbs="portfolioItemData?.breadcrumbs"
            />
            <div class="portfolio-item-page__inner">
                <InnerContainer>
                    <template #sidebar>
                        <PageNavigation v-if="allLinks?.length > 0" :items="allLinks" />
                    </template>
                    <template #content>
                        <div class="portfolio-item-page__blocks">
                            <PortfolioClinicalPicture
                                v-if="!!Object.keys(portfolioItemData?.clinical_picture).length"
                                id="problem-solution"
                                :data="portfolioItemData.clinical_picture"
                            />
                            <RelatedServices v-if="relatedServices.length" :data="relatedServices" />
                            <ParagraphsList
                                v-if="portfolioItemData.paragraphs?.length"
                                :items="portfolioItemData.paragraphs"
                                class="portfolio-item-page__paragraphs"
                            />
                            <PortfolioCosts
                                v-if="portfolioItemData.work_details?.items?.length"
                                id="parameters"
                                :data="portfolioItemData.work_details"
                            />
                            <PortfolioDoctorsList
                                v-if="portfolioItemData.doctors?.items?.length"
                                id="doctors"
                                :data="portfolioItemData.doctors"
                            />
                            <PortfolioCtaAppointment
                                :data="portfolioItemData.form_block"
                            />
                            <PortfolioSimilarWorks
                                v-if="portfolioItemData.similar_works?.length"
                                :data="portfolioItemData.similar_works"
                            />
                        </div>
                    </template>
                </InnerContainer>
            </div>
        </AppContainer>
        <Transition name="opacity">
            <VideoPopup v-if="!!popupVideoSrc" />
        </Transition>
    </div>
</template>

<script setup>
import AppContainer from '~/shared/ui/Containers/AppContainer.vue'
import ParagraphsList from '~/widgets/paragraphs/ParagraphList.vue'
import InnerContainer from '~/shared/ui/Containers/InnerContainer.vue'
import PageNavigation from '~/entities/links/ui/PageNavigation.vue'
import PortfolioHeroBanner from './ui/PortfolioHeroBanner.vue'
import PortfolioClinicalPicture from './ui/PortfolioClinicalPicture.vue'
import PortfolioCosts from './ui/PortfolioCosts.vue'
import PortfolioSimilarWorks from './ui/PortfolioSimilarWorks.vue'
import PortfolioCtaAppointment from './ui/PortfolioCtaAppointment.vue'
import PortfolioDoctorsList from './ui/PortfolioDoctorsList.vue'

import { usePortfolioItemPageStore } from '~/views/PortfolioItemPage/store/portfolio-item-store'
import { usePopupVideoHandler } from '~/entities/popup-video/composables/usePopupVideoHandler'
import { usePopupVideoStore } from '~/entities/popup-video/store/popup-video'

const RelatedServices = defineAsyncComponent(() => import('~/entities/related-services/ui/RelatedServices'))
const VideoPopup = defineAsyncComponent(() => import('~/entities/popup-video/ui/VideoPopup.vue'))
    
const portfolioItemPageStore = usePortfolioItemPageStore()
const { portfolioItemData } = toRefs(portfolioItemPageStore)
const popupVideoStore = usePopupVideoStore()
const { popupVideoSrc } = toRefs(popupVideoStore)

const { t } = useI18n()

const pageref = ref(null)

const relatedServices = computed(() => portfolioItemData.value?.connected_services || [])
const paragraphsLinks = computed(() => portfolioItemData.value.paragraphs.filter((p) => !!p.page_menu_name))
const dynamicLinks = computed(() => [
    ...portfolioItemData.value?.work_details?.items?.length ? [{ id: 'parameters', page_menu_name: t('portfolioItemPage.parameters') }] : [],
    ...portfolioItemData.value?.doctors?.items?.length ? [{ id: 'doctors', page_menu_name: t('portfolioItemPage.doctors') }] : []
])

const allLinks = computed(() => [
    { id: 'problem-solution', page_menu_name: t('portfolioItemPage.problemSolution') },
    ...paragraphsLinks.value,
    ...dynamicLinks.value
])

usePopupVideoHandler(pageref)
</script>

<style lang="scss" scoped>
.portfolio-item-page {
    &__inner {
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

    &__blocks {
        display: flex;
        flex-direction: column;
        gap: 40px;

        @media (min-width: $tablet-breakpoint) {
            gap: 60px;
        }

        @media (min-width: $desktop-breakpoint) {
            gap: 80px;
        }

        @media (min-width: $lg-desktop-breakpoint) {
            gap: 96px;
        }
    }

    &__paragraphs {
        :deep(.paragraph-item) {
            &:last-child {
                margin-bottom: 0;
            }
        }
    }
}
</style>