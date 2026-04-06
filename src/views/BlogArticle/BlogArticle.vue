<template>
    <BlogArticleBanner
        :title="articleData?.title"
        :breadcrumbs="articleData?.breadcrumbs"
        :tags="articleData?.characteristics"
        :image="articleData?.image"
        :created="articleData?.created"
    />
    <PageParagraphBuilder 
        :paragraphs="articleData?.paragraphs"
        :breadcrumbs="articleData?.breadcrumbs"
        :links="paragraphLinks"
    >
        <template #body-heading>
            <AuthorsBlock
                :author="articleData?.author" 
                :reviewer="articleData?.reviewer" 
            />
        </template>
    </PageParagraphBuilder>
    <RelatedServices
        v-if="articleData?.connected_services?.length"
        :data="articleData?.connected_services"
    />
    <RelatedArticles
        v-if="articleData?.blogs_by_problem?.items?.length"
        :data="articleData?.blogs_by_problem"
        type="problem" 
    />
    <RelatedArticles 
        v-if="articleData?.blogs_by_category?.items?.length" 
        :data="articleData?.blogs_by_category" 
        type="category"
    />
</template>

<script setup>
import { useBlogArticleStore } from './store/blog-article-store'

import AuthorsBlock from '~/entities/authors/ui/AuthorsBlock.vue'
import BlogArticleBanner from '~/entities/blog/ui/BlogArticleBanner.vue'
import PageParagraphBuilder from '~/widgets/paragraphs/PageParagraphBuilder.vue'

const RelatedArticles = defineAsyncComponent(() => import('./ui/RelatedArticles.vue'))
const RelatedServices = defineAsyncComponent(() => import('~/entities/related-services/ui/RelatedServices'))

const blogArticle = useBlogArticleStore()

const { articleData } = storeToRefs(blogArticle)

const paragraphLinks = computed(() => articleData?.value?.paragraphs?.filter((p) => !!p.page_menu_name))
</script>