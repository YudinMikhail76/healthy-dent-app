<template>
    <CaseCategoriesList :data="worksData" class="similar-works" />
</template>

<script setup>
import CaseCategoriesList from '~/entities/case-categories/CaseCategoriesList.vue'

const props = defineProps({
    data: {
        type: Object,
        required: true
    }
})

const { t } = useI18n()

const worksData = computed(() => ({
    title: t('portfolioItemPage.similarWorks'),
    items: props.data
}))
</script>

<style scoped lang="scss">
.similar-works {
    margin-top: 0;
}
</style>