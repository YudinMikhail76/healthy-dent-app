<template>
    <div class="paragraph-page">
        <PageParagraphBuilder :paragraphs="paragraphs" :links="paragraphLinks" />
    </div>
</template>

<script setup>
import { useSimplifiedEnglishPageStore } from './store/simplified-english-page'
import PageParagraphBuilder from '~/widgets/paragraphs/PageParagraphBuilder.vue'

const pageStore = useSimplifiedEnglishPageStore()
const paragraphs = computed(() => pageStore.englishPageData?.paragraphs)
const paragraphLinks = computed(() => paragraphs.value?.filter((p) => !!p.page_menu_name))
</script>