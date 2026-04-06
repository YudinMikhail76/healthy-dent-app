<template>
    <div class="app-slider">
        <div v-if="slots.heading || slots.link" class="app-slider__heading">
            <h2 v-if="slots?.heading" class="app-slider__heading-title">
                <slot name="heading" />
            </h2>
            <div v-if="slots.link" class="app-slider__link">
                <slot name="link" />
            </div>
        </div>
        <div :class="['slider', { 'slider--overflow-hidden': overflowHidden }]">
            <div class="slider__body">
                <div :class="sliderClass">
                    <div class="swiper-wrapper">
                        <div
                            v-for="(item, index) in data"
                            :key="index"
                            class="swiper-slide"
                        >
                            <slot
                                name="slide"
                                :item="item"
                                :index="index"
                                :items-length="data.length"
                            />
                        </div>
                        <div v-if="slots['end-block']" class="swiper-slide">
                            <slot name="end-block" />
                        </div>
                    </div>
                </div>
            </div>
            <div v-if="showBottomSlot" class="slider__bottom">
                <div v-if="props.pagination" class="slider__pagination" />
                <div v-if="props.scrollBarClass" :class="scrollBarClass" />
                <div :class="bottomClasses">
                    <div v-if="slots.arrows" class="slider__arrows">
                        <slot name="arrows" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { Swiper } from 'swiper'
import { Scrollbar, Navigation, Pagination } from 'swiper/modules'

const props = defineProps({
    data: {
        type: Object,
        required: true
    },
    scrollBarClass: {
        type: [String, null],
        required: false,
        default: null
    },
    sliderClass: {
        type: String,
        required: true
    },
    centered: {
        type: Boolean
    },
    navigation: {
        type: [Object, null],
        required: false,
        default: null
    },
    pagination: {
        type: [Object, null],
        default: null,
        required: false
    },
    overflowHidden: {
        type: Boolean
    },
    hasScrollbar: {
        type: Boolean,
        default: true
    },
    slideWidth: {
        type: String,
        default: 'fit-content'
    },
    breakpoints: {
        type: Object,
        default: null
    },
    toggleReinit: {
        type: Boolean
    }
})

let swiper

const slots = useSlots()

const breakpoints = computed(() => props.breakpoints
    ? props.breakpoints
    : {
        1280: {
            centeredSlides: props.centered
        }
    })

const swiperOptions = computed(() => {
    const modules = [Scrollbar]

    if (props.navigation) {
        modules.push(Navigation)
    }

    if (props.pagination) {
        modules.push(Pagination)
    }

    if (props.hasScrollbar) {
        modules.push(Scrollbar)
    }

    return {
        modules,
        slidesPerView: 'auto',
        observer: true,
        touchEventsTarget: 'container',
        grabCursor: true,
        navigation: props.navigation ? props.navigation : false,
        pagination: props.pagination ? props.pagination : false,
        spaceBetween: props.spaceBetween,
        scrollbar: props.scrollBarClass
            ? {
                hide: false,
                el: `.${ props.scrollBarClass }`,
                dragClass: 'slider__track'
            }
            : false,
        breakpoints: breakpoints.value,
        createElements: true
    }
})

const sliderClass = computed(() => [
    'swiper',
    `${ props.sliderClass }`
])
const scrollBarClass = computed(() => [
    'slider__scrollbar',
    `${ props.scrollBarClass }`
])
const bottomClasses = computed(() => [
    'slider__bottom-inner',
    { 'slider__bottom-inner--centered': props.centered }
])

const showBottomSlot = computed(() => props.pagination || props.scrollBarClass || slots.arrows)

const unsubscribeSwiper = () => {
    if (swiper) {
        swiper.destroy()
    }
}

watch(() => props.toggleReinit, () => {
    if (swiper) {
        nextTick(() => swiper.update())
    }
})

onMounted(() => {
    swiper = new Swiper(`.${ props.sliderClass }`, swiperOptions.value)
})

onBeforeUnmount(() => {
    unsubscribeSwiper()
})
</script>

<style scoped lang="scss">
.app-slider {
    width: 100%;

    &__heading {
        display: flex;
        flex-direction: column;
        gap: 20px;
        width: 100%;
        margin-bottom: 20px;

        @media (min-width: $desktop-breakpoint) {
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 40px;
        }

        @media (min-width: $lg-desktop-breakpoint) {
            margin-bottom: 48px;
        }
    }

    &__heading-title {
        font-size: 24px;
        font-style: normal;
        font-weight: 700;
        line-height: 120%;

        @media (min-width: $desktop-breakpoint) {
            font-size: 32px;
        }

        @media (min-width: $lg-desktop-breakpoint) {
            font-size: 48px;
        }
    }
}

.slider {
    display: flex;
    flex-direction: column;
    gap: 20px;

    @media (min-width: $tablet-breakpoint) {
        gap: 30px;
    }

    @media (min-width: $desktop-breakpoint) {
        gap: 40px;
    }
    
    @media (min-width: $lg-desktop-breakpoint) {
        gap: 48px;
    }

    &--overflow-hidden {
        overflow: hidden !important;
    }

    &__bottom-inner {
        display: flex;
        align-items: center;
        justify-content: space-between;

        &--centered {
            justify-content: center;
        }
    }

    &__scrollbar {
        width: 100%;
        height: 4px;
        background: $dark-100;
        border-radius: 100px;

        @media (min-width: $desktop-breakpoint) {
            width: 192px;
            height: 5px;
        }

        @media (min-width: $lg-desktop-breakpoint) {
            width: 312px;
            height: 6px;
        }
    }

    &__bottom {
        @media (min-width: $desktop-breakpoint) {
            display: flex;
            align-items: center;
            justify-content: space-between;
        }
    }
    
    &__arrows {
        display: none;

        @media (min-width: $desktop-breakpoint) {
            display: flex;
            gap: 10px;
        }

        @media (min-width: $lg-desktop-breakpoint) {
            gap: 12px;
        }
    }

    :deep(.slider__track) {
        width: 100px;
        height: 4px;
        background: $primary-400;
        border-radius: 100px;

        @media (min-width: $desktop-breakpoint) {
            width: 91px;
            height: 5px;
        }

        @media (min-width: $lg-desktop-breakpoint) {
            width: 151px;
            height: 6px;
        }
    }
}

.swiper {
    width: 100%;
    height: 100%;

    :deep(.swiper-slide) {
        /* stylelint-disable-next-line value-keyword-case */
        width: v-bind(slideWidth);
    }
}

.slider__pagination {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 4px;

    @media (min-width: $tablet-breakpoint) {
        gap: 6px;
    }

    @media (min-width: $desktop-breakpoint) {
        gap: 8px;
    }

    @media (min-width: $lg-desktop-breakpoint) {
        gap: 10px;
    }

    :deep(.swiper-pagination-bullet) {
        width: 4px;
        height: 4px;
        background-color: $primary-500;
        border-radius: 50%;
        opacity: .5;
        transition: $base-ui-transition;

        @media (min-width: $tablet-breakpoint) {
            width: 6px;
            height: 6px;
        }

        @media (min-width: $desktop-breakpoint) {
            width: 8px;
            height: 8px;
        }
        
        @media (min-width: $lg-desktop-breakpoint) {
            width: 10px;
            height: 10px;
        }
    }

    :deep(.swiper-pagination-bullet-active) {
        width: 20px;
        border-radius: 10px;
        opacity: 1;

        @media (min-width: $tablet-breakpoint) {
            width: 30px;
        }

        @media (min-width: $desktop-breakpoint) {
            width: 40px;
        }

        @media (min-width: $lg-desktop-breakpoint) {
            width: 48px;
        }
    }
}
</style>
