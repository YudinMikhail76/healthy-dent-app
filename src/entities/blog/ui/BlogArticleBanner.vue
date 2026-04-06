<template>
    <article class="article-banner">
        <AppContainer>
            <AppBreadcrumbs class="article-banner__breadcrumbs" :breadcrumbs="breadcrumbs" />
            <div class="article-banner__inner">
                <div class="article-banner__img-container">
                    <AppImage
                        :urls="image?.urls"
                        :alt="image?.alt"
                        class="article-banner__img"
                        :title="image?.alt"
                        preload
                        fetch-priority="high"
                    />
                </div>
                <div class="article-banner__content">
                    <h1 class="article-banner__title">
                        {{ title }}
                    </h1>
                    <div class="article-banner__tags">
                        <template v-for="arr in tags">
                            <template v-if="arr.id === CHARACTERISTICS_ID.category">
                                <AppTag
                                    v-for="item in arr.values"
                                    :key="item.value_name"
                                    class="article-banner__tag"
                                >
                                    {{ item.value_name }}
                                </AppTag>
                            </template>
                            <template v-else>
                                <AppTagPilled
                                    v-for="item in arr.values"
                                    :key="item.value_name"
                                    size="small"
                                    class="article-banner__tag"
                                >
                                    {{ item.value_name }}
                                </AppTagPilled>
                            </template>
                        </template>
                    </div>
                    <div class="article-banner__date">
                        <time :datetime="createdFormatted" pubdate>{{ createdHumanized }}</time>
                    </div>
                </div>
            </div>
        </AppContainer>
    </article>
</template>

<script setup>
import AppContainer from '~/shared/ui/Containers/AppContainer.vue'
import AppImage from '~/shared/ui/Media/AppImage.vue'
import AppBreadcrumbs from '~/shared/ui/Navigation/AppBreadcrumbs.vue'
import AppTag from '~/shared/ui/Tags/AppTag.vue'
import AppTagPilled from '~/shared/ui/Tags/AppTagPilled.vue'

const props = defineProps({
    tags: {
        type: Array,
        default: () => []
    },
    image: {
        type: Object,
        required: true
    },
    breadcrumbs: {
        type: Array,
        default: () => []
    },
    title: {
        type: String,
        required: true
    },
    created: {
        type: String,
        required: true
    }
})

const CHARACTERISTICS_ID = {
    category: 1,
    problem: 2
}

const createdFormatted = computed(() => {
    return new Date(props.created * 1000).toISOString()
})

const createdHumanized = computed(() => {
    const date = new Date(props.created * 1000)
    const day = String(date.getDate()).padStart(2, '0')
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const year = date.getFullYear()
    return `${ day }.${ month }.${ year }`
})
</script>

<style lang="scss" scoped>
.article-banner {
    margin-bottom: 40px;

    &__inner {
        @media (min-width: $desktop-breakpoint) {
            display: flex;
            flex-direction: row-reverse;
            align-items: center;
            gap: 64px;
        }

        @media (min-width: $lg-desktop-breakpoint) {
            gap: 96px;
        }
    }

    @media (min-width: $desktop-breakpoint) {
        margin-bottom: 80px;
    }

    @media (min-width: $lg-desktop-breakpoint) {
        margin-bottom: 96px;
    }

    &__breadcrumbs {
        margin-bottom: 6.5px;

        @media (min-width: $desktop-breakpoint) {
            margin-bottom: 12px;
        }

        @media (min-width: $lg-desktop-breakpoint) {
            margin-bottom: 16px;
        }
    }

    &__title {
        margin-bottom: 20px;
        font-size: 32px;
        font-style: normal;
        font-weight: 700;
        line-height: 120%;

        @media (min-width: $desktop-breakpoint) {
            margin-bottom: 40px;
            font-size: 48px;
        }

        @media (min-width: $lg-desktop-breakpoint) {
            margin-bottom: 48px;
            font-size: 64px;
        }
    }

    &__img-container {
        position: relative;
        height: 200px;
        margin-bottom: 20px;
        overflow: hidden;
        border-radius: 15px;

        @media (min-width: $desktop-breakpoint) {
            height: 436px;
            border-radius: 25px;
        }

        @media (min-width: $lg-desktop-breakpoint) {
            height: 620px;
            border-radius: 30px;
        }

        &::after {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(0deg, rgba(45, 194, 187, .2) 0%, rgba(45, 194, 187, .2) 100%), linear-gradient(0deg, rgba(145, 147, 161, .5) 0%, rgba(145, 147, 161, .5) 100%), rgba(73, 74, 82, .2);
            opacity: .6;
            background-blend-mode: screen, multiply, color;
        }
    }

    &__tags {
        display: flex;
        flex-wrap: wrap;
        gap: 3px;
        margin-bottom: 20px;

        @media (min-width: $desktop-breakpoint) {
            gap: 5px;
        }

        @media (min-width: $lg-desktop-breakpoint) {
            gap: 6px;
        }
    }

    &__tag {
        display: flex;
        align-items: center;
        justify-content: center;
        pointer-events: none;
    }

    &__content,
    &__img-container {
        @media (min-width: $desktop-breakpoint) {
            width: 50%;
        }
    }

    &__img {
        object-fit: cover;
    }

    &__date {
        font-size: 14px;
        font-weight: 400;
        line-height: 1.4;
        color: $primary-300;

        @media (min-width: $desktop-breakpoint) {
            font-size: 16px;
        }
    }
}
</style>