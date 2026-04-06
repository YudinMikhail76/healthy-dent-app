<template>
    <div class="blog">
        <EmptyData v-if="shouldShowEmptyText" />
        <AppContainer v-else>
            <ParagraphsList
                v-if="topParagraphs"
                :items="topParagraphs"
                :breadcrumbs="breadcrumbs"
            />
            <slot name="between-blocks" />
            <InnerContainer>
                <template #sidebar>
                    <PageNavigation v-if="links?.length > 0" :items="links" />
                </template>
                <template #content>
                    <slot name="body-heading" />
                    <ParagraphsList
                        v-if="bottomParagraphs?.length"
                        :items="bottomParagraphs"
                    />
                    <slot name="body-bottom" />
                </template>
            </InnerContainer>
        </AppContainer>
    </div>
</template>

<script setup>
import { useParagraphs } from './composables/useParagraphs'

const InnerContainer = defineAsyncComponent(() => import('~/shared/ui/Containers/InnerContainer.vue'))
const AppContainer = defineAsyncComponent(() => import('~/shared/ui/Containers/AppContainer.vue'))
const PageNavigation = defineAsyncComponent(() => import('~/entities/links/ui/PageNavigation.vue'))
const EmptyData = defineAsyncComponent(() => import('~/shared/ui/EmptyData/EmptyData.vue'))
const ParagraphsList = defineAsyncComponent(() => import('~/widgets/paragraphs/ParagraphList.vue'))

const props = defineProps({
    paragraphs: {
        type: Array,
        default: () => []
    },
    breadcrumbs: {
        type: [Array, null],
        default: () => null
    },
    links: {
        type: Array,
        default: () => []
    },
    enableEmptyPlaceholder: {
        type: Boolean,
        default: true
    }
})

const { 
    topParagraphs,
    bottomParagraphs,
    isEmpty
} = useParagraphs(props?.paragraphs)

const slots = useSlots()

const hasNoSlots = computed(() => !slots['body-heading'] && !slots['body-bottom'] && !slots['between-blocks'])
const shouldShowEmptyText = computed(() => hasNoSlots.value && props.enableEmptyPlaceholder && isEmpty.value)
</script>