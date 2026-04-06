<template>
    <div>
        <PageParagraphBuilder :paragraphs="paragraphs" :links="paragraphLinks" />
        <AppLangHiddenLinks v-if="locales" :locales="locales" />
    </div>
</template>

<script setup>
import { useHomePageStore } from './store/home-page-store'
import PageParagraphBuilder from '~/widgets/paragraphs/PageParagraphBuilder.vue'
import AppLangHiddenLinks from '~/shared/ui/Links/AppLangHiddenLinks'

const homePage = useHomePageStore()

const paragraphs = computed(() => homePage.homePageData?.paragraphs)
const locales = computed(() => homePage.homePageData?.locales)

const paragraphLinks = computed(() => paragraphs.value?.filter((p) => !!p.page_menu_name))
</script>