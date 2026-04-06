<template>
    <div class="blog">
        <PageHeading
            :title="blogData?.dynamic_data.title"
            :subtitle="blogData?.metatags?.title_h1"
            :breadcrumbs="blogData?.breadcrumbs"
        />
        <AppContainer>
            <BlogFilters v-if="blogData?.facets?.length" :items="blogData?.facets" />
            <BlogList v-if="frames?.length" :items="frames" />
            <EmptyData v-else />
            <div v-if="hasPagination" class="blog__pagination">
                <AppPagination
                    :limit="blogData?.limit"
                    :total="blogData?.total_items"
                    :page="blogData?.page"
                    @on-change="onPaginationChange"
                    @on-load="onPaginationChange($event, true)"
                />
            </div>
        </AppContainer>
        <PageParagraphBuilder 
            :paragraphs="paragraphs"
            :breadcrumbs="blogData?.breadcrumbs"
            :links="paragraphLinks"
            :enable-empty-placeholder="false"
        />
    </div>
</template>

<script setup>
import { useRootStore } from '~/entities/root/store/root-store'
import { useBlogStore } from './store/blog-store'
import { apiService } from '~/app/api'

import PageParagraphBuilder from '~/widgets/paragraphs/PageParagraphBuilder.vue'
import AppContainer from '~/shared/ui/Containers/AppContainer.vue'
import PageHeading from '~/shared/ui/Heading/PageHeading.vue'

const EmptyData = defineAsyncComponent(() => import('~/shared/ui/EmptyData/EmptyData.vue'))
const AppPagination = defineAsyncComponent(() => import('~/shared/ui/Navigation/AppPagination.vue'))
const BlogList = defineAsyncComponent(() => import('~/entities/blog/ui/BlogList.vue'))
const BlogFilters = defineAsyncComponent(() => import('~/entities/blog/ui/BlogFilters.vue'))

const blogStore = useBlogStore()
const rootStore = useRootStore()
const { locale } = useI18n()
const route = useRoute() 

const { blogData, frames } = storeToRefs(blogStore)

const paragraphs = computed(() => blogStore?.blogData?.dynamic_data?.paragraphs)
const paragraphLinks = computed(() => paragraphs.value?.filter((p) => !!p.page_menu_name))
const hasPagination = computed(() => blogData.value?.limit < blogData.value?.total_items)

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

    blogStore.SET_BLOG_DATA(response)
    blogStore.SET_FRAMES(items)
    rootStore.TOGGLE_LOADING_STATUS()
}
</script>

<style lang="scss" scoped>
.blog {
    margin-bottom: 40px;

    @media (min-width: $desktop-breakpoint) {
        margin-bottom: 80px;
    }

    @media (min-width: $lg-desktop-breakpoint) {
        margin-bottom: 96px;
    }
}
</style>