<template>
    <div class="doctors-page">
        <PageParagraphBuilder
            :paragraphs="paragraphs"
            :breadcrumbs="data?.breadcrumbs"
            :links="allLinks"
        >
            <template #body-bottom>
                <DoctorsList :items="data?.doctors?.items" :title="data?.doctors?.tile" />
                <Gallery id="serviceTeam" :data="galleryData" lazyImages />
            </template>
        </PageParagraphBuilder>
    </div>
</template>

<script setup>
import { GALLERY_TYPES } from '~/entities/gallery/constants'
import { useDoctorsPageStore } from '~/views/DoctorsPage/store/doctors-page-store'

import Gallery from '~/entities/gallery/Gallery.vue'
import PageParagraphBuilder from '~/widgets/paragraphs/PageParagraphBuilder.vue'
import DoctorsList from '~/entities/doctors/DoctorsList.vue'

const { t } = useI18n()
const doctorsPageStore = useDoctorsPageStore()

const data = computed(() => doctorsPageStore.doctorsPageData)
const paragraphs = computed(() => data.value?.dynamic_data.paragraphs)

const galleryData = computed(() => ({
    id: 'doctors',
    items: data.value?.care_team.items,
    title: data.value?.care_team?.title,
    text: data.value?.care_team?.description,
    paragraph_type: GALLERY_TYPES.CARE_TEAM
}))

const paragraphLinks = computed(() => paragraphs.value?.filter((p) => !!p.page_menu_name))
const allLinks = computed(() => [
    ...paragraphLinks.value, 
    { id: 'doctorsList', page_menu_name: t('doctorsPage.doctorsList') },
    { id: 'serviceTeam', page_menu_name: t('doctorsPage.serviceTeam') }
])
</script>