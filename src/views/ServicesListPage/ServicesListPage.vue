<template>
    <div class="doctors-page">
        <PageParagraphBuilder
            :paragraphs="paragraphs"
            :breadcrumbs="data?.breadcrumbs"
            :links="allLinks"
        >
            <template #body-heading>
                <ServicesList :items="data?.items" />
            </template>
        </PageParagraphBuilder>
    </div>
</template>

<script setup>
import { useServiceListPageStore } from './store/service-list-page-store'

import PageParagraphBuilder from '~/widgets/paragraphs/PageParagraphBuilder.vue'
import ServicesList from './ui/ServicesList.vue'

const servicesStore = useServiceListPageStore()

const data = computed(() => servicesStore.servicesData)
const paragraphs = computed(() => data.value?.dynamic_data.paragraphs)

const paragraphLinks = computed(() => paragraphs.value?.filter((p) => !!p.page_menu_name))
const servicesLinks = computed(() => data.value.items.map((item) => ({ 
    page_menu_name: item.name, 
    id: `service-${ item.tid }`,
    ...item
})))
const allLinks = computed(() => [...servicesLinks.value, ...paragraphLinks.value])
</script>