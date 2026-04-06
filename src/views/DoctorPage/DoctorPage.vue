<template>
    <div class="doctor-page">
        <AppContainer>
            <DoctorPageHeroBanner
                :data="doctorPageData?.hero_block"
                :breadcrumbs="doctorPageData?.breadcrumbs"
                :socials="doctorPageData.socials"
            />
            <div class="doctor-page__inner">
                <InnerContainer>
                    <template #sidebar>
                        <PageNavigation v-if="allLinks?.length > 0" :items="allLinks" />
                    </template>
                    <template #content>
                        <div class="doctor-page__blocks">
                            <DoctorSpecialization
                                v-if="doctorPageData?.specialization"
                                id="specialization"
                                :data="doctorPageData?.specialization"
                            />
                            <RelatedServices
                                v-if="doctorPageData?.connected_services?.length"
                                id="connected-services"
                                :data="doctorPageData?.connected_services"
                            />
                            <DoctorPortfolio
                                v-if="doctorPageData?.cases?.items?.length"
                                id="doctor-portfolio"
                                :data="portfolio"
                            />
                            <DoctorEducation
                                v-if="doctorPageData?.education?.length"
                                id="education"
                                :data="doctorPageData?.education"
                            />
                            <DoctorCertificates
                                v-if="doctorPageData?.certificates?.length"
                                id="certificates"
                                :data="doctorPageData?.certificates"
                            />
                            <DoctorReviews
                                v-if="doctorPageData?.reviews?.items?.length"
                                id="doctor-reviews"
                                :data="reviews"
                            />
                            <ParagraphsList
                                v-if="paragraphs?.length"
                                :items="paragraphs"
                            />
                        </div>
                    </template>
                </InnerContainer>
            </div>
        </AppContainer>
    </div>
</template>

<script setup>
import AppContainer from '~/shared/ui/Containers/AppContainer.vue'
import ParagraphsList from '~/widgets/paragraphs/ParagraphList.vue'
import InnerContainer from '~/shared/ui/Containers/InnerContainer.vue'
import PageNavigation from '~/entities/links/ui/PageNavigation.vue'
import DoctorPageHeroBanner from '~/views/DoctorPage/ui/DoctorPageHeroBanner.vue'
import DoctorSpecialization from '~/views/DoctorPage/ui/DoctorSpecialization/DoctorSpecialization.vue'
import DoctorEducation from '~/views/DoctorPage/ui/DoctorEducation/DoctorEducation.vue'
import RelatedServices from '~/entities/related-services/ui/RelatedServices.vue'
import DoctorCertificates from '~/views/DoctorPage/ui/DoctorCertificates/DoctorCertificates.vue'
import DoctorPortfolio from '~/views/DoctorPage/ui/DoctorPortfolio.vue'
import DoctorReviews from '~/views/DoctorPage/ui/DoctorReviews.vue'

import { useDoctorPageStore } from '~/views/DoctorPage/store/doctor-page-store'

const doctorPageStore = useDoctorPageStore()
const { doctorPageData } = toRefs(doctorPageStore)

const { t } = useI18n()

const reviews = computed(() => ({
    title: t('doctor.reviews'),
    id: 'doctor-reviews',
    ...doctorPageData.value?.reviews
}))
const portfolio = computed(() => ({
    title: t('doctor.cases'),
    id: 'doctor-portfolio',
    ...doctorPageData.value?.cases
}))
const paragraphs = computed(() => doctorPageData.value?.paragraphs)
const paragraphsLinks = computed(() => paragraphs.value?.filter((p) => !!p.page_menu_name))
const dynamicLinks = computed(() => [
    ...doctorPageData.value?.specialization ? [{ id: 'specialization', page_menu_name: t('doctor.specialization') }] : [],
    ...doctorPageData.value?.cases?.items?.length ? [{ id: 'doctor-portfolio', page_menu_name: `${ t('doctor.cases') }` }] : [],
    ...doctorPageData.value?.education?.length ? [{ id: 'education', page_menu_name: t('doctor.education') }] : [],
    ...doctorPageData.value?.certificates?.length ? [{ id: 'certificates', page_menu_name: t('doctor.certificates') }] : [],
    ...doctorPageData.value?.reviews?.items?.length ? [{ id: 'doctor-reviews', page_menu_name: t('doctor.reviews') }] : []
])
const allLinks = computed(() => [
    ...dynamicLinks.value,
    ...paragraphsLinks.value
])
</script>

<style lang="scss" scoped>
.doctor-page {
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
}
</style>