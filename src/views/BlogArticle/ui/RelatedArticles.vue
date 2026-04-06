<template>
    <div class="related-articles">
        <div class="related-articles__inner">
            <AppContainer>
                <AppSlider v-bind="options">
                    <template #heading>
                        {{ data?.title }}
                    </template>
                    <template #link>
                        <AppLink
                            :to="localePath(data?.link.alias)"
                            variant="primary"
                            :rel="data?.link?.is_noindex ? 'nofollow' : null"
                        >
                            {{ t('blog.related.allLink') }}
                        </AppLink>
                    </template>
                    <template #slide="{ item }">
                        <BlogArticleCard :data="item" />
                    </template>
                    <template v-if="data.items?.length > 1" #arrows>
                        <AppButtonTypeIcon 
                            :class="`related-articles__arrow-left--${ type }`"
                            position="center"
                            :title="$t('pagination.btnLeft')"
                        >
                            <ChevronLeftIcon />
                        </AppButtonTypeIcon>
                        <AppButtonTypeIcon
                            :class="`related-articles__arrow-right--${ type }`"
                            position="center"
                            :title="$t('pagination.btnRight')"
                        >
                            <ChevronRightIcon />
                        </AppButtonTypeIcon>
                    </template>
                </AppSlider>
            </AppContainer>
        </div>
    </div>
</template>

<script setup>
import AppSlider from '~/shared/ui/AppSlider/AppSlider.vue'
import AppLink from '~/shared/ui/Links/AppLink.vue'
import AppButtonTypeIcon from '~/shared/ui/Buttons/AppButtonTypeIcon.vue'

import ChevronLeftIcon from '~/shared/assets/icons/chevron-left.svg'
import ChevronRightIcon from '~/shared/assets/icons/chevron-right.svg'
import AppContainer from '~/shared/ui/Containers/AppContainer.vue'
import BlogArticleCard from '~/entities/blog/ui/BlogArticleCard.vue'

const props = defineProps({
    data: {
        type: Object,
        default: () => {}
    },
    type: {
        type: String,
        required: true
    }
})

const { t } = useI18n()
const localePath = useLocalePath()

const itemsLength = computed(() => props.data?.items?.length)
const options = computed(() => {
    const navigation = {
        prevEl: `.related-articles__arrow-left--${ props.type }`,
        nextEl: `.related-articles__arrow-right--${ props.type }`
    }

    return {
        data: props.data?.items,
        sliderClass: `${ props.type }-related-articles-slider`,
        navigation: itemsLength.value > 1 ? navigation : null,
        overflowHidden: true,
        scrollBarClass: `articles__scrollbar--${ props.type }`,
        breakpoints: {
            320: {
                spaceBetween: '0'
            }
        }
    }
})
</script>

<style lang="scss" scoped>
.related-articles {
    margin: 40px 0;
    overflow-x: hidden;

    @media (min-width: $tablet-breakpoint) {
        margin: 60px 0;
    }

    @media (min-width: $desktop-breakpoint) {
        margin: 80px 0;
    }

    @media (min-width: $lg-desktop-breakpoint) {
        margin: 96px 0;
    }
}
</style>