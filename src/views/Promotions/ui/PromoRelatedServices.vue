<template>
    <div :class="['related-services', { 'related-services--opened': isOpen }]">
        <div 
            class="related-services__heading"
            @click="handleToggle"
        >
            <div class="related-services__title">
                <span class="related-services__title-text">
                    {{ $t('promo.relatedServices.title') }}
                </span> <span class="related-services__bracket">(</span>
                <span class="related-services__count">{{ count }}</span>
                <span class="related-services__bracket">)</span>
            </div>
            <AppButtonTypeIcon position="center" class="related-services__arrow-btn">
                <AngleDownIcon class="related-services__icon" />
            </AppButtonTypeIcon>
        </div>
        <div class="related-services__content">
            <AppTag v-for="item in items" :key="item.tid" :to="localePath(item.alias)">
                {{ item.title }}
            </AppTag>
        </div>
    </div>
</template>

<script setup>
import AppButtonTypeIcon from '~/shared/ui/Buttons/AppButtonTypeIcon.vue'

import AngleDownIcon from '@/shared/assets/icons/angle-down.svg'
import AppTag from '~/shared/ui/Tags/AppTag.vue'

const props = defineProps({
    items: {
        type: Array,
        default: () => []
    }
})

const localePath = useLocalePath()

const isOpen = ref(false)
const count = computed(() => props.items.length)

const handleToggle = () => isOpen.value = !isOpen.value
</script>

<style lang="scss" scoped>
.related-services {
    cursor: pointer;

    &--opened {
        .related-services__content {
            max-height: 1000px;
            visibility: visible !important;
            opacity: 1;
            transition: .3s;
        }

        .related-services__icon {
            transform: rotate(180deg);
        }
    }

    &__heading {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    &__title {
        display: flex;
        align-items: center;
    }

    &__title-text {
        margin-right: 10px;
        font-size: 18px;
        font-style: normal;
        font-weight: 700;
        line-height: 120%;

        @media (min-width: $tablet-breakpoint) {
            font-size: 20px;
        }

        @media (min-width: $desktop-breakpoint) {
            font-size: 22px;
        }

        @media (min-width: $lg-desktop-breakpoint) {
            font-size: 24px;
        }
    }

    &__content {
        max-height: 0;
        padding-top: 10px;
        overflow: hidden;
        visibility: hidden;
        opacity: 0;
        transition: $base-ui-transition;

        @media (min-width: $desktop-breakpoint) {
            padding-top: 20px;
        }
    }

    &__bracket {
        font-size: 14px;
        font-style: normal;
        font-weight: 700;
        line-height: 140%;
        color: $primary-500;
    }

    &__count {
        margin: 0 5px;
        font-size: 14px;
        font-style: normal;
        font-weight: 400;
        line-height: 140%;
        color: $primary-300;
    }

    &__arrow-btn {
        max-width: 40px;
        min-width: 40px;
        min-height: 40px;
        border-radius: 6px;

        @media (min-width: $lg-desktop-breakpoint) {
            max-width: 48px;
            min-width: 48px;
            min-height: 48px;
            border-radius: 8px;
        }

        :deep(.related-services__icon) {
            width: 20px;
            height: 20px;

            @media (min-width: $lg-desktop-breakpoint) {
                width: 22px;
                height: 22px;
            }
        }
    }
}
</style>