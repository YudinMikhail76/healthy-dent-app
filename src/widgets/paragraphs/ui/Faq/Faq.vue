<template>
    <ParagraphItemContainer
        class="faq"
        itemtype="https://schema.org/FAQPage"
        itemscope
    >
        <h2 v-if="data?.title" class="faq__title" itemprop="name">
            {{ data.title }}
        </h2>
        <div class="faq__content">
            <FaqAccordion :data="data.items" />
        </div>
    </ParagraphItemContainer>
</template>

<script setup>
import FaqAccordion from './ui/FaqAccordion.vue'

import ParagraphItemContainer from '~/shared/ui/Containers/ParagraphItemContainer.vue'

defineProps({
    data: {
        type: Object,
        required: true
    }
})
</script>

<style lang="scss" scoped>
.faq {
    &__title {
        margin-bottom: 20px;
        font-size: 24px;
        font-style: normal;
        font-weight: 700;
        line-height: 120%;
        color: $dark-500;

        @media (min-width: $tablet-breakpoint) {
            margin-bottom: 30px;
            font-size: 28px;
        }

        @media (min-width: $desktop-breakpoint) {
            margin-bottom: 40px;
            font-size: 32px;
        }

        @media (min-width: $lg-desktop-breakpoint) {
            margin-bottom: 48px;
            font-size: 48px;
        }
    }
}
</style>