<template>
    <div class="paragraphs">
        <template v-for="item in items">
            <component
                :is="paragraphs[item.paragraph_type]"
                v-if="paragraphs[item.paragraph_type]"
                :id="item.id"
                :key="item.id"
                :data="item"
                class="paragraphs__item"
                :breadcrumbs="breadcrumbs"
            />
        </template>
    </div>
</template>

<script setup>
import { paragraphs } from '~/widgets/paragraphs/utils/paragraphs'

defineProps({
    items: {
        type: Array,
        required: true
    },
    breadcrumbs: {
        type: [Array, null],
        default: null
    }
})
</script>

<style scoped lang="scss">
.paragraphs {
    &__item:first-child {
        margin-top: 0;
    }
}
</style>
