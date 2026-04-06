<template>
    <div class="blog-list">
        <template v-for="(item, index) in items" :key="item.nid">
            <BlogItemSpecial
                v-if="item.is_special_subject"
                :item="item"
                :lazy-img="index > 6"
            />
            <BlogItem v-else :item="item" />
        </template>
    </div>
</template>

<script setup>
import BlogItem from './BlogItem.vue'
import BlogItemSpecial from './BlogItemSpecial.vue'

const props = defineProps({
    items: {
        type: Array,
        default: () => []
    }
})
</script>

<style lang="scss" scoped>
.blog-list {
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 40px;

    @media (min-width: $desktop-breakpoint) {
        margin-bottom: 80px;
    }

    @media (min-width: $lg-desktop-breakpoint) {
        margin-bottom: 96px;
    }
}
</style>