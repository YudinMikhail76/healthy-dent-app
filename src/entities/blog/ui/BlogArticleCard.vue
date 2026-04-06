<template>
    <NuxtLink :to="localePath(data.alias)" class="article">
        <div class="article__top">
            <div class="article__title">
                {{ data.title }}
            </div>
            <BlogItemTags :characteristics="data.characteristics" />
        </div>
        <div class="article__date">
            <time :datetime="createdFormatted" pubdate>{{ createdHumanized }}</time>
        </div>
        <div class="article__description">
            {{ data.subtitle }}
        </div>
    </NuxtLink>
</template>

<script setup>
import BlogItemTags from '~/entities/blog/ui/BlogItemTags.vue'

const props = defineProps({
    data: {
        type: Object,
        required: true
    }
})

const localePath = useLocalePath()

const createdFormatted = computed(() => {
    return new Date(props.data.created * 1000).toISOString()
})

const createdHumanized = computed(() => {
    const date = new Date(props.data.created * 1000)
    const day = String(date.getDate()).padStart(2, '0')
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const year = date.getFullYear()
    return `${ day }.${ month }.${ year }`
})
</script>

<style lang="scss" scoped>
.article {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 20px;
    width: 280px;
    height: 100%;
    min-height: 352px;
    padding: 20px;
    background-color: $light;
    border: 3px solid $secondary-100;
    border-radius: 7px;
    transition: $base-ui-transition border-radius;

    @media (any-hover: hover) {
        &:hover {
            border-radius: 25px;

            .article__title {
                color: $primary-500;
            }
        }
    }

    @media (min-width: $desktop-breakpoint) {
        gap: 25px;
        width: 320px;
        min-height: 448px;
        padding: 25px;
        border-radius: 12px;
    }

    @media (min-width: $lg-desktop-breakpoint) {
        width: 480px;
        min-height: 512px;
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

    &__description {
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
        margin-top: auto;
        font-size: 14px;
        font-style: normal;
        font-weight: 400;
        line-height: 1.4;
        color: $primary-300;

        @media (min-width: $desktop-breakpoint) {
            font-size: 16px;
        }

        @media (min-width: $lg-desktop-breakpoint) {
            font-size: 18px;
        }
    }
}
</style>