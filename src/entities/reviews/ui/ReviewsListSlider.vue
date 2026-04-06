<template>
    <div class="reviews">
        <div class="reviews__list"> 
            <AppSlider v-bind="options">
                <template #heading>
                    {{ data.title }}
                </template>
                <template #slide="{ item, index }">
                    <ReviewCard :data="item" is-slider :lazyImg="index > 0" />
                </template>
                <template v-if="itemsLength > 1" #arrows>
                    <AppButtonTypeIcon
                        :class="`reviews__arrow-left--${ data.id }`"
                        position="center"
                        :title="$t('pagination.btnLeft')"
                    >
                        <ChevronLeftIcon />
                    </AppButtonTypeIcon>
                    <AppButtonTypeIcon 
                        :class="`reviews__arrow-right--${ data.id }`"
                        position="center"
                        :title="$t('pagination.btnRight')"
                    >
                        <ChevronRightIcon />
                    </AppButtonTypeIcon>
                </template>
            </AppSlider>
        </div>
        <AppLoadMoreButton 
            :to="localePath(data?.all_reviews?.url)"
            class="reviews__load-more"
            align="center" 
            full-width
        >
            <template #label>
                {{ data?.all_reviews?.title }}
            </template>
            <template #count>
                {{ data?.all_reviews?.count }}
            </template>
        </AppLoadMoreButton>
    </div>
</template>

<script setup>
import AppLoadMoreButton from '~/shared/ui/Navigation/AppLoadMoreButton.vue'
import AppSlider from '~/shared/ui/AppSlider/AppSlider.vue'
import ReviewCard from './ReviewCard.vue'

import AppButtonTypeIcon from '~/shared/ui/Buttons/AppButtonTypeIcon.vue'

import ChevronLeftIcon from '~/shared/assets/icons/chevron-left.svg'
import ChevronRightIcon from '~/shared/assets/icons/chevron-right.svg'

const props = defineProps({
    data: {
        type: Object,
        required: true
    }
})

const localePath = useLocalePath()

const itemsLength = computed(() => props.data?.items?.length)

const options = computed(() => {
    const pagination = {
        el: '.slider__pagination',
        clickable: false
    }

    const navigation = {
        prevEl: `.reviews__arrow-left--${ props.data.id }`,
        nextEl: `.reviews__arrow-right--${ props.data.id }`
    }

    return {
        data: props.data?.items,
        sliderClass: 'reviews-slider',
        pagination: itemsLength.value > 1 ? pagination : null,
        navigation: itemsLength.value > 1 ? navigation : null,
        overflowHidden: true,
        slideWidth: '100%',
        breakpoints: {
            320: {
                spaceBetween: '20px'
            }
        }
    }
})
</script>

<style lang="scss" scoped>
.reviews {
    margin: 40px 0;

    @media (min-width: $tablet-breakpoint) {
        margin: 60px 0;
    }

    @media (min-width: $desktop-breakpoint) {
        margin: 80px 0;
    }

    @media (min-width: $lg-desktop-breakpoint) {
        margin: 96px 0;
    }

    &__load-more {
        margin-top: 10px;

        @media (min-width: $tablet-breakpoint) {
            margin-top: 15px;
        }

        @media (min-width: $desktop-breakpoint) {
            margin-top: 10px;
        }
    }
}
</style>