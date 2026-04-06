<template>
    <div class="articles-paragraph">
        <div class="articles-paragraph__heading">
            <div class="articles-paragraph__title">
                {{ data.title }}
            </div>
            <AppLink 
                :to="localePath(data?.all_blogs)"
                class="articles-paragraph__all-link"
            >
                {{ $t('blog.related.allLink') }}
            </AppLink>
        </div>
        <BlockSeparator class="articles-paragraph__separator" />
        <AppSlider v-bind="options">
            <template #slide="{ item }">
                <BlogArticleCard :data="item" />
            </template>
            <template v-if="itemsLength > 1" #arrows>
                <AppButtonTypeIcon
                    :class="`articles__arrow-left--${ data.id }`"
                    position="center"
                    :title="$t('pagination.btnLeft')"
                >
                    <ChevronLeftIcon />
                </AppButtonTypeIcon>
                <AppButtonTypeIcon
                    :class="`articles__arrow-right--${ data.id }`"
                    position="center"
                    :title="$t('pagination.btnRight')"
                >
                    <ChevronRightIcon />
                </AppButtonTypeIcon>
            </template>
        </AppSlider>
    </div>
</template>

<script setup>
import AppSlider from '~/shared/ui/AppSlider/AppSlider.vue'

import BlockSeparator from '~/shared/ui/Separators/BlockSeparator.vue'

import ChevronLeftIcon from '~/shared/assets/icons/chevron-left.svg'
import ChevronRightIcon from '~/shared/assets/icons/chevron-right.svg'
import BlogArticleCard from '~/entities/blog/ui/BlogArticleCard.vue'
import AppLink from '~/shared/ui/Links/AppLink.vue'

const AppButtonTypeIcon = defineAsyncComponent(() => import('~/shared/ui/Buttons/AppButtonTypeIcon.vue'))

const props = defineProps({
    data: {
        type: Object,
        required: true
    }
})

const localePath = useLocalePath()

const itemsLength = computed(() => props.data?.items?.length)
const options = computed(() => {

    const navigation = {
        prevEl: `.articles__arrow-left--${ props.data.id }`,
        nextEl: `.articles__arrow-right--${ props.data.id }`
    }

    return {
        data: props.data?.items,
        sliderClass: `articles-slider--${ props.data.id }`,
        navigation: itemsLength.value > 1 ? navigation : null,
        overflowHidden: true,
        scrollBarClass: `articles__scrollbar--${ props.data.id }`,
        breakpoints: {
            1920: {
                spaceBetween: '48px'
            },
            1280: {
                spaceBetween: '40px'
            },
            720: {
                spaceBetween: '30px'
            },
            320: {
                spaceBetween: '20px'
            }
        }
    }
})
</script>

<style lang="scss" scoped>
.articles-paragraph {
    padding: 20px;
    margin: 40px 0;
    background-color: $light;
    border-radius: 15px;

    @media (min-width: $tablet-breakpoint) {
        padding: 30px;
        margin: 60px 0;
        border-radius: 20px;
    }

    @media (min-width: $desktop-breakpoint) {
        padding: 40px;
        margin: 80px 0;
        border-radius: 25px;
    }

    @media (min-width: $lg-desktop-breakpoint) {
        padding: 48px;
        margin: 96px 0;
        border-radius: 30px;
    }

    &__heading {
        display: flex;
        flex-direction: column;
        gap: 20px;

        @media (min-width: $tablet-breakpoint) {
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
            gap: 30px;
        }

        @media (min-width: $desktop-breakpoint) {
            gap: 40px;
        }

        @media (min-width: $lg-desktop-breakpoint) {
            gap: 48px;
        }
    }

    &__title {
        font-size: 24px;
        font-style: normal;
        font-weight: 700;
        line-height: 120%;

        @media (min-width: $tablet-breakpoint) {
            font-size: 28px;
        }

        @media (min-width: $desktop-breakpoint) {
            font-size: 32px;
        }

        @media (min-width: $lg-desktop-breakpoint) {
            font-size: 48px;
        }
    }

    &__separator {
        margin: 20px 0;

        @media (min-width: $tablet-breakpoint) {
            margin: 30px 0;
        }

        @media (min-width: $desktop-breakpoint) {
            margin: 40px 0;
        }

        @media (min-width: $lg-desktop-breakpoint) {
            margin: 48px 0;
        }
    }
}
</style>