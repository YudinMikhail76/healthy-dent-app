<template>
    <ParagraphItemContainer class="gallery">
        <h2 v-if="data?.title" class="gallery__title">
            {{ data?.title }}
        </h2>
        <div class="gallery__description">
            {{ data?.text }}
        </div>
        <BlockSeparator />
        <AppSlider v-bind="options">
            <template #slide="{ item }">
                <GalleryTreatmentItem v-if="data.paragraph_type === GALLERY_TYPES.TREATMENT" :data="item" />
                <GalleryCareTeamItem
                    v-else-if="data.paragraph_type === GALLERY_TYPES.CARE_TEAM"
                    :data="item"
                    :lazyImg="lazyImages"
                />
                <GallerySolutionsItem v-else-if="data.paragraph_type === GALLERY_TYPES.SOLUTIONS" :data="item" />
                <GalleryToolsItem v-else-if="data.paragraph_type === GALLERY_TYPES.TOOLS" :data="item" />
            </template>
            <template v-if="itemsLength > 1" #arrows>
                <AppButtonTypeIcon
                    :class="`gallery__arrow-left--${ data.id }`"
                    position="center"
                    :title="$t('pagination.btnLeft')"
                >
                    <ChevronLeftIcon />
                </AppButtonTypeIcon>
                <AppButtonTypeIcon
                    :class="`gallery__arrow-right--${ data.id }`"
                    position="center"
                    :title="$t('pagination.btnRight')"
                >
                    <ChevronRightIcon />
                </AppButtonTypeIcon>
            </template>
        </AppSlider>
    </ParagraphItemContainer>
</template>

<script setup>
import { GALLERY_TYPES } from './constants'

import AppSlider from '~/shared/ui/AppSlider/AppSlider.vue'
import BlockSeparator from '~/shared/ui/Separators/BlockSeparator.vue'
import ParagraphItemContainer from '~/shared/ui/Containers/ParagraphItemContainer.vue'

import ChevronLeftIcon from '~/shared/assets/icons/chevron-left.svg'
import ChevronRightIcon from '~/shared/assets/icons/chevron-right.svg'

const AppButtonTypeIcon = defineAsyncComponent(() => import('~/shared/ui/Buttons/AppButtonTypeIcon.vue'))
const GalleryTreatmentItem = defineAsyncComponent(() => import('./ui/GalleryTreatmentItem.vue'))
const GalleryCareTeamItem = defineAsyncComponent(() => import('./ui/GalleryCareTeamItem.vue'))
const GallerySolutionsItem = defineAsyncComponent(() => import('./ui/GallerySolutionsItem.vue'))
const GalleryToolsItem = defineAsyncComponent(() => import('./ui/GalleryToolsItem.vue'))

const props = defineProps({
    data: {
        type: Object,
        required: true
    },
    lazyImages: {
        type: Boolean,
        default: false
    }
})

const itemsLength = computed(() => props.data?.items?.length)

const options = computed(() => {

    const navigation = {
        prevEl: `.gallery__arrow-left--${ props.data.id }`,
        nextEl: `.gallery__arrow-right--${ props.data.id }`
    }

    return {
        data: props.data?.items,
        sliderClass: `gallery-slider--${ props.data.id }`,
        navigation: itemsLength.value > 1 ? navigation : null,
        overflowHidden: true,
        scrollBarClass: `gallery__scrollbar--${ props.data.id }`,
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
.gallery {
    display: flex;
    flex-direction: column;
    gap: 20px;

    @media (min-width: $tablet-breakpoint) {
        flex-direction: row;
        flex-wrap: wrap;
        gap: 30px;
    }

    @media (min-width: $desktop-breakpoint) {
        gap: 40px;
    }

    @media (min-width: $lg-desktop-breakpoint) {
        gap: 48px;
    }

    &__title {
        flex-grow: 1;
        font-size: 24px;
        font-style: normal;
        font-weight: 700;
        line-height: 120%;

        @media (min-width: $tablet-breakpoint) {
            width: calc(50% - 15px);
            font-size: 28px;
        }

        @media (min-width: $desktop-breakpoint) {
            width: calc(50% - 20px);
            font-size: 32px;
        }

        @media (min-width: $lg-desktop-breakpoint) {
            width: calc(50% - 24px);
            font-size: 48px;
        }
    }

    &__description {
        flex-grow: 1;
        font-size: 14px;
        font-style: normal;
        font-weight: 400;
        line-height: 140%;

        @media (min-width: $tablet-breakpoint) {
            width: calc(50% - 15px);
            font-size: 16px;
        }

        @media (min-width: $desktop-breakpoint) {
            width: calc(50% - 20px);
            font-size: 18px;
        }

        @media (min-width: $lg-desktop-breakpoint) {
            width: calc(50% - 24px);
            font-size: 20px;
        }
    }
}
</style>