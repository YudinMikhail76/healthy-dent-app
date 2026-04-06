<template>
    <InnerContainer>
        <template #sidebar>
            <PageNavigation :items="links" />
        </template>
        <template #content>
            <ParagraphList 
                v-if="items?.length"
                :items="items"
            />
        </template>
    </InnerContainer>
</template>

<script setup>
import PageNavigation from '~/entities/links/ui/PageNavigation.vue'
import InnerContainer from '~/shared/ui/Containers/InnerContainer.vue'
import ParagraphList from '~/widgets/paragraphs/ParagraphList.vue'

const props = defineProps({
    items: {
        type: Array,
        default: () => []
    }
})

const links = computed(() => props.items.filter((p) => !!p.page_menu_name))
</script>