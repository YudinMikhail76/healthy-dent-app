<template>
    <div class="faq-content">
        <FaqAccordionItem
            v-for="item, index in data"
            :key="index"
            :content="item.answer"
            class="faq-content__item"
        >
            <template #title>
                {{ item.question }}
            </template>
        </FaqAccordionItem>
    </div>
</template>

<script setup>
import FaqAccordionItem from './FaqAccordionItem.vue'

defineProps({
    data: {
        type: Object,
        required: true
    }
})
</script>