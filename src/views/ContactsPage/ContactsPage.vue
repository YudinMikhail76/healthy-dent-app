<template>
    <div class="contacts-page">
        <ContactsHeading />
        <AppContainer>
            <ContactsBottom />
            <ParagraphsList
                v-if="paragraphs?.length"
                :items="paragraphs"
            />
        </AppContainer>
    </div>
</template>

<script setup>
import AppContainer from '~/shared/ui/Containers/AppContainer.vue'
import ParagraphsList from '~/widgets/paragraphs/ParagraphList.vue'
import ContactsHeading from './ui/ContactsHeading.vue'
import ContactsBottom from './ui/ContactsBottom.vue'

import { useContactsPageStore } from '~/views/ContactsPage/store/contacts-store'

const contactsPageStore = useContactsPageStore()
const { contactsPageData } = toRefs(contactsPageStore)

const paragraphs = computed(() => contactsPageData.value?.dynamic_data?.paragraphs)
</script>
