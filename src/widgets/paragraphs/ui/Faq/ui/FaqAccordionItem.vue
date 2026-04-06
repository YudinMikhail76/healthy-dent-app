<template>
    <div
        :class="classes"
        itemscope
        itemprop="mainEntity"
        itemtype="https://schema.org/Question"
    >
        <div class="faq-accordion-item__heading" @click="handleToggle">
            <div class="faq-accordion-item__title" itemprop="name">
                <slot name="title" />
            </div>
            <AppButtonTypeIcon class="faq-accordion-item__icon-btn" position="center">
                <AngleDownIcon class="faq-accordion-item__icon" />
            </AppButtonTypeIcon>
        </div>
        <div
            class="faq-accordion-item__content"
            itemprop="suggestedAnswer acceptedAnswer"
            itemscope
            itemtype="https://schema.org/Answer"
        >
            <div class="faq-accordion-item__text" itemprop="text" v-html="content" />
        </div>
    </div>
</template>

<script setup>
import AppButtonTypeIcon from '~/shared/ui/Buttons/AppButtonTypeIcon.vue'

import AngleDownIcon from '~/shared/assets/icons/angle-down.svg'

const props = defineProps({
    isInitialOpen: {
        type: Boolean,
        required: false
    },
    content: {
        type: String,
        required: true
    }
})

const isOpen = ref(false)
const classes = computed(() => [
    'faq-accordion-item',
    { 'faq-accordion-item--open': isOpen.value }
])

const handleToggle = () => isOpen.value = !isOpen.value
const init = () => isOpen.value = props.isInitialOpen

init()
</script>

<style scoped lang="scss">
@import '~/app/styles/ckeditor/mixins';
@import '~/app/styles/ckeditor/style-elements';
@import '~/app/styles/ckeditor/basic-elements';

.faq-accordion-item {
    &:first-child {
        .faq-accordion-item__heading {
            padding-top: 0;
        }
    }
    &:last-child {
        .faq-accordion-item__heading {
            padding-bottom: 0;
        }
    }

    &--open {
        .faq-accordion-item__content {
            max-height: 1000px;
            visibility: visible;
            opacity: 1;
            transition: transform $base-ui-transition ease;
        }

        .faq-accordion-item__icon {
            transform: rotate(180deg);
        }

        .faq-accordion-item__heading {
            margin-bottom: 0;
        }
    }

    &__heading {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 10px;
        padding-bottom: 10px;
        padding-top: 10px;
        cursor: pointer;

        // some Android devices dosn't support any-hover: hover + new iPad can have min-width greater than 1280px so remain min-width
        @media (any-hover: hover) and (min-width: $desktop-breakpoint) {
            &:hover {
                .faq-accordion-item__title {
                    color: $primary-500;
                }
            }
        }

        @media (min-width: $tablet-breakpoint) {
            gap: 20px;
            padding-bottom: 15px;
            padding-top: 15px;
        }

        @media (min-width: $desktop-breakpoint) {
            gap: 30px;
            padding-bottom: 20px;
            padding-top: 20px;
        }

        @media (min-width: $lg-desktop-breakpoint) {
            gap: 48px;
            padding-bottom: 24px;
            padding-top: 24px;
        }

        &::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 1px;
            background-color: $secondary-100;
        }
    }

    &:first-child {
        .faq-accordion-item__heading::before {
            display: none;
        }
    }

    &__title {
        font-size: 20px;
        font-style: normal;
        font-weight: 400;
        line-height: 120%;
        transition: $base-ui-transition;

        @media (min-width: $tablet-breakpoint) {
            font-size: 22px;
        }

        @media (min-width: $desktop-breakpoint) {
            font-size: 24px;
        }

        @media (min-width: $lg-desktop-breakpoint) {
            font-size: 32px;
        }
    }

    &__icon {
        transition: $base-ui-transition;
    }

    &__content {
        max-height: 0;
        overflow: hidden;
        visibility: hidden;
        opacity: 0;
        transition: $base-ui-transition ease;
    }

    &__text {
        margin: 20px 0;

        @media (min-width: $desktop-breakpoint) {
            padding-left: 56px;
        }

        @media (min-width: $lg-desktop-breakpoint) {
            padding-left: 72px;
            margin-top: 24px;
        }
    }
}
</style>
