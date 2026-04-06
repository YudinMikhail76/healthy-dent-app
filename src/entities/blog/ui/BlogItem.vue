<template>
    <NuxtLink :to="localePath(item.alias)" class="blog-item">
        <div class="blog-item__title">
            {{ item.title }}
        </div>
        <BlogItemTags :characteristics="item.characteristics" />
        <div class="blog-item__date">
            <time :datetime="createdFormatted" pubdate>{{ createdHumanized }}</time>
        </div>
        <div class="blog-item__overview" v-html="item.subtitle" />
    </NuxtLink>
</template>

<script setup>
import BlogItemTags from './BlogItemTags.vue'

const props = defineProps({
    item: {
        type: Object,
        required: true
    }
})

const localePath = useLocalePath()

const createdFormatted = computed(() => {
    return new Date(props.item.created * 1000).toISOString()
})

const createdHumanized = computed(() => {
    const date = new Date(props.item.created * 1000)
    const day = String(date.getDate()).padStart(2, '0')
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const year = date.getFullYear()
    return `${ day }.${ month }.${ year }`
})
</script>

<style lang="scss" scoped>
.blog-item {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    padding: 20px;
    background-color: $light;
    border: 3px solid $secondary-100;
    border-radius: 7px;

    @media (any-hover: hover) {
        &:hover {
            .blog-item__title {
                color: $primary-500;
            }
        }
    }

    @media (min-width: $tablet-breakpoint) {
        width: 50%;
        min-height: 480px;
    }
 
    @media (min-width: $desktop-breakpoint) {
        flex-grow: initial;
        width: 25%;
        min-height: 512px;
        padding: 25px;
        border-radius: 12px;
    }

    @media (min-width: $lg-desktop-breakpoint) {
        min-height: 640px;
        padding: 32px;
        border-radius: 15px;
    }

    &__title {
        margin-bottom: 10px;
        font-size: 20px;
        font-style: normal;
        font-weight: 700;
        line-height: 120%;
        color: $dark-500;
        transition: color $base-ui-transition;

        @media (min-width: $desktop-breakpoint) {
            margin-bottom: 20px;
            font-size: 24px;
        }

        @media (min-width: $lg-desktop-breakpoint) {
            margin-bottom: 24px;
            font-size: 32px;
        }
    }

    &__tags {
        display: flex;
        flex-wrap: wrap;
        gap: 4px;
        margin-bottom: 20px;
    }

    &__overview {
        font-size: 14px;
        font-style: normal;
        font-weight: 400;
        line-height: 140%;
        color: $primary-300;

        @include text-line-overflowed-multiple(3);

        @media (min-width: $desktop-breakpoint) {
            font-size: 18px;
        }

        @media (min-width: $lg-desktop-breakpoint) {
            font-size: 20px;
        }
    }

    &__date {
        margin-bottom: 10px;
        font-size: 14px;
        font-weight: 400;
        line-height: 1.4;
        color: $primary-300;

        @media (min-width: $tablet-breakpoint) {
            margin-top: auto;
            margin-bottom: 24px;
        }

        @media (min-width: $desktop-breakpoint) {
            font-size: 16px;
        }
    }
}
</style>