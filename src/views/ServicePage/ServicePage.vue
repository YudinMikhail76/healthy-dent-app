<template>
    <div class="service-page">
        <ServiceHeroBanner
            :data="heroBannerData"
            :breadcrumbs="data?.breadcrumbs"
            :title="titlePage"
        />
        <PageParagraphBuilder
            :paragraphs="paragraphs"
            :breadcrumbs="data?.breadcrumbs"
            :links="allLinks"
        >
            <template #body-bottom>
                <AuthorsBlock
                    v-if="data.author?.id"
                    :id="`author-${ data.author?.id }`"
                    :author="data?.author"
                    :reviewer="data?.reviewer"
                />
                <Articles
                    v-if="data?.blogs?.items?.length"
                    id="blogs-100"
                    :data="data.blogs"
                />
            </template>
        </PageParagraphBuilder>
        <AppContainer v-if="metatagsParagraphs?.length > 0">
            <ParagraphsList :items="metatagsParagraphs" :breadcrumbs="[]" />
        </AppContainer>
    </div>
</template>

<script setup>
import AuthorsBlock from '~/entities/authors/ui/AuthorsBlock.vue'
import { useServicePageStore } from './store/service-page-store'
import PageParagraphBuilder from '~/widgets/paragraphs/PageParagraphBuilder.vue'
import ServiceHeroBanner from '~/views/ServicePage/ui/ServiceHeroBanner/ServiceHeroBanner.vue'
import AppContainer from '~/shared/ui/Containers/AppContainer'
import ParagraphsList from '~/widgets/paragraphs/ParagraphList.vue'

const Articles = defineAsyncComponent(() => import('~/widgets/paragraphs/ui/Articles/Articles.vue'))

const serviceStore = useServicePageStore()
const { t } = useI18n()

const data = computed(() => serviceStore.serviceData)
const paragraphs = computed(() => data.value?.paragraphs)
const titlePage = computed(() => data.value.hero_block?.title || data.value?.name)

const metatagsParagraphs = computed(() => data.value.metatags.paragraphs || [])
const paragraphLinks = computed(() => paragraphs.value?.filter((p) => !!p.page_menu_name))
const dynamicLinks = computed(() => [
    ...data.value?.author?.id
        ? [{
            page_menu_name: t('author.position'),
            id: `author-${ data.value?.author?.id }`
        }]
        : [],
    ...data.value?.blogs?.title
        ? [{
            page_menu_name: data.value?.blogs?.title,
            id: 'blogs-100'
        }]
        : []
])
const allLinks = computed(() => [
    ...paragraphLinks.value,
    ...dynamicLinks.value
])

const heroBannerData = computed(() => ({ 
    ...data.value,
    ...data.value?.hero_block,
    marketing_event: data.value.marketing_event 
}))
</script>
