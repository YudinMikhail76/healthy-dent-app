<template>
    <div class="authors">
        <Author
            v-if="hasAuthor"
            :title="$t('author.position')"
            :name="author?.name"
            :doctor="author?.doctor"
            :image="author?.photo"
            :position="author?.short_description"
            :fullWidth="!hasReviewer"
        />
        <Author
            v-if="hasReviewer"
            :title="$t('reviewer.position')"
            :name="reviewer?.name"
            :doctor="reviewer.doctor"
            :image="reviewer?.photo"
            :position="reviewer?.short_description"
            :fullWidth="!hasAuthor"
        />
    </div>
</template>

<script setup>
import Author from './Author.vue'

const props = defineProps({
    author: {
        type: Object,
        required: true
    },
    reviewer: {
        type: Object,
        required: true
    }
})

const hasValues = (obj) => obj && Object.values(obj)?.length > 0

const hasReviewer = computed(() => hasValues(props.reviewer))
const hasAuthor = computed(() => hasValues(props.author))
</script>

<style lang="scss" scoped>
.authors {
    margin-bottom: 40px;

    @media (min-width: $tablet-breakpoint) {
        display: flex;
        gap: 4px;
    }

    @media (min-width: $desktop-breakpoint) {
        margin-bottom: 80px;
    }
}
</style>