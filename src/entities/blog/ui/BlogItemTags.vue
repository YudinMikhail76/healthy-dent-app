<template>
    <div class="blog-tags">
        <template v-for="characteristic in characteristics">
            <AppTagPilled
                v-for="tag in characteristic.values"
                :key="tag.value_id"
                class="blog-tags__article"
            >
                {{ tag.value_name }}
            </AppTagPilled>
        </template>
    </div>
</template>

<script setup>
import AppTagPilled from '~/shared/ui/Tags/AppTagPilled.vue'

defineProps({
    characteristics: {
        type: Array,
        default: () => []
    }
})
</script>

<style lang="scss" scoped>
.blog-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 4px;
    margin-bottom: 20px;

    @media (min-width: $desktop-breakpoint) {
        gap: 5px;
    }

    @media (min-width: $lg-desktop-breakpoint) {
        gap: 6px;
    }

    &__article {
        pointer-events: none;
    }
}
</style>