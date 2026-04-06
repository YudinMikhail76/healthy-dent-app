<template>
    <div class="paragraph-page">
        <PageParagraphBuilder :paragraphs="paragraphs" :links="paragraphLinks" />
    </div>
</template>

<script setup>
import { useSimplePageStore } from '~/views/SimplePage/store/simple-page-store'
import PageParagraphBuilder from '~/widgets/paragraphs/PageParagraphBuilder.vue'

const simplePageStore = useSimplePageStore()
const paragraphs = computed(() => simplePageStore.simplePageData?.paragraphs)
const paragraphLinks = computed(() => paragraphs.value?.filter((p) => !!p.page_menu_name))
</script>