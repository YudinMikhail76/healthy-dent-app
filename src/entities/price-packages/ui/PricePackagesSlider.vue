<template>
    <div class="price-packages-list">
        <AppSlider v-bind="options">
            <template #slide="{ item, itemsLength, index }">
                <PricePackage
                    :data="item"
                    :is-last-element="index !== 0 && index === itemsLength - 1"
                />
            </template>
            <template v-if="items?.length > 1" #arrows>
                <AppButtonTypeIcon
                    :class="`price-packages-list__arrow-left--${ props.data.tid }`"
                    position="center"
                    :title="$t('pagination.btnLeft')"
                >
                    <ChevronLeftIcon />
                </AppButtonTypeIcon>
                <AppButtonTypeIcon
                    :class="`price-packages-list__arrow-right--${ props.data.tid }`"
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
import AppButtonTypeIcon from '~/shared/ui/Buttons/AppButtonTypeIcon.vue'
import PricePackage from '~/entities/price-packages/ui/PricePackage.vue'

import ChevronLeftIcon from '~/shared/assets/icons/chevron-left.svg'
import ChevronRightIcon from '~/shared/assets/icons/chevron-right.svg'

const props = defineProps({
    data: {
        type: Object,
        default: () => ({})
    },
    items: {
        type: Array,
        default: () => []
    }
})

const packageList = computed(() => props.items?.length)

const options = computed(() => {
    const navigation = {
        prevEl: `.price-packages-list__arrow-left--${ props.data.tid }`,
        nextEl: `.price-packages-list__arrow-right--${ props.data.tid }`
    }

    return {
        data: props.items.map((item) => ({ ...item, installment: props.data.installment })),
        sliderClass: `price-packages-list-slider-${ props.data.tid }`,
        navigation: packageList.value > 1 ? navigation : null,
        scrollBarClass: `price-packages__scrollbar--${ props.data.tid }`,
        breakpoints: {
            320: {
                spaceBetween: '0'
            }
        }
    }
})
</script>

<style lang="scss" scoped>
.price-packages-list {
    :deep(.swiper-backface-hidden .swiper-slide) {
        transform: none !important;
    }
}
</style>