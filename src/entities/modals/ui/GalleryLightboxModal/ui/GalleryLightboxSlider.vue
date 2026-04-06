<template>
    <div class="app-slider">
        <div class="app-slider__heading">
            <AppContainer>
                <div class="app-slider__heading-inner">
                    <slot name="heading" />
                </div>
            </AppContainer>
        </div>
        <div class="slider">
            <div class="slider__body">
                <AppContainer>
                    <div :class="sliderClass">
                        <div class="swiper-wrapper">
                            <div
                                v-for="(item, index) in data"
                                :key="index"
                                class="swiper-slide"
                            >
                                <slot name="slide" :item="item" :index="index" />
                            </div>
                            <div
                                v-if="slots['last-slide']"
                                class="swiper-slide swiper-slide-last"
                            >
                                <slot name="last-slide" />
                            </div>
                        </div>
                    </div>
                </AppContainer>
            </div>
            <div v-if="!props.hideScrollBar" class="slider__bottom">
                <AppContainer>
                    <div :class="bottomClasses">
                        <div :class="scrollBarClass" />
                        <div :class="paginationClass" />
                        <div v-if="slots.link" class="slider__link">
                            <slot name="link" />
                        </div>
                    </div>
                </AppContainer>
            </div>
        </div>
    </div>
</template>

<script setup>
import AppContainer from '~/shared/ui/Containers/AppContainer'
import { Swiper } from 'swiper'
import { Scrollbar, Pagination } from 'swiper/modules'

const props = defineProps({
    data: {
        type: Object,
        required: true
    },
    scrollBarClass: {
        type: String,
        required: true
    },
    paginationClass: {
        type: String,
        required: false,
        default: 'slider__pagination'
    },
    sliderClass: {
        type: String,
        required: true
    },
    navigation: {
        type: [Object, null],
        required: false,
        default: null
    },
    spaceBetween: {
        type: [Number, String],
        required: false,
        default: 0
    },
    slidesPerView: {
        type: [Number, String],
        required: false,
        default: 'auto'
    },
    centeredSlides: {
        type: Boolean,
        required: false
    },
    hideScrollBar: {
        type: Boolean,
        required: false
    },
    hidePagination: {
        type: Boolean,
        required: false
    },
    renderBullet: {
        type: [Function, null],
        required: false,
        default: null
    },
    initialSlide: {
        type: Number,
        required: false,
        default: 0
    },
    recalculate: {
        type: [Number, Boolean],
        default: false
    },
    recalculateWait: {
        type: Number,
        default: 0
    }
})

let swiper = null

const slots = useSlots()

const swiperOptions = computed(() => ({
    modules: [Scrollbar, Pagination],
    initialSlide: props.initialSlide,
    slidesPerView: props.slidesPerView,
    spaceBetween: props.spaceBetween,
    centeredSlides: props.centeredSlides,
    observer: true,
    touchEventsTarget: 'container',
    grabCursor: true,
    navigation: props.navigation ? props.navigation : false,
    scrollbar: {
        hide: props.hideScrollBar,
        el: `.${ props.scrollBarClass }`,
        dragClass: 'slider__track'
    },
    pagination: {
        hide: props.hidePagination,
        el: `.${ props.paginationClass }`,
        clickable: true,
        renderBullet: props.renderBullet
    },
}))
const sliderClass = computed(() => [
    'swiper',
    props.sliderClass ? `${ props.sliderClass }` : ''
])
const scrollBarClass = computed(() => [
    'slider__scrollbar',
    props.scrollBarClass ? `${ props.scrollBarClass }` : ''
])
const paginationClass = computed(() => [
    'slider__pagination',
    props.paginationClass ? `${ props.paginationClass }` : ''
])
const bottomClasses = computed(() => [
    'slider__bottom-inner'
])

async function updateSwiper() {
    await nextTick()
    if (props.recalculateWait) {
        setTimeout(() => {
            swiper.update()
        }, props.recalculateWait)
    } else {
        swiper.update()
    }
}

watch(() => props.recalculate, (currentValue, prev) => {
    if (currentValue !== prev && swiper) {
        updateSwiper()
    }
})

onMounted(() => {
    try {
        swiper = new Swiper(`.${ props.sliderClass }`, swiperOptions.value)

        swiper.on('slideChange', (item) => {
            console.log('item')
        })
    } catch (error) {
        console.warn('Error init swiper: ', error)
    }
})
</script>

<style scoped lang="scss">
.app-slider {
    display: flex;
    flex-direction: column;
    height: 100%;

    &__heading-inner {
        width: 100%;
    }
}

.slider {
    display: flex;
    flex: 1;
    justify-content: center;
    flex-direction: column;

    @media (min-width: $desktop-breakpoint) {
        justify-content: flex-start;
    }

    &__bottom {
        margin-top: auto;
    }

    &__bottom-inner {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 30px 30px 0;
    }

    &__scrollbar {
        width: 100px;
        height: 6px;
        background-color: $dark-500;
        border-radius: 3px;
    }

    :deep(.slider__track) {
        height: 6px;
        background-color: $primary-400;
        border-radius: 3px;
    }
}
</style>
