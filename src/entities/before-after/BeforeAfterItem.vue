<template>
    <div class="before-after-item">
        <div class="before-after-item__content">
            <h2 v-if="data?.title" class="before-after-item__title">
                {{ data?.title }}
            </h2>
            <div class="before-after-item__desc">
                {{ data?.description }}
            </div>
        </div>
        <div class="before-after-item__divider" />
        <div class="before-after-item__items">
            <div class="before-after-item__item">
                <div class="before-after-item__item-img-wrap">
                    <AppImage
                        :urls="issues?.image?.urls"
                        :alt="issues?.image?.alt"
                        :title="issues?.image?.title"
                        class="before-after-item__item-img"
                    />
                    <div class="before-after-item__item-label">
                        {{ $t('caseCategories.problem') }}
                    </div>
                </div>
                <div class="before-after-item__item-text">
                    {{ issues?.description }}
                </div>
            </div>
            <div class="before-after-item__item">
                <div class="before-after-item__item-img-wrap">
                    <AppImage
                        :urls="solutions?.image?.urls"
                        :alt="solutions?.image?.alt"
                        :title="solutions?.image?.title"
                        class="before-after-item__item-img"
                    />
                    <span class="before-after-item__item-label">{{ $t('caseCategories.solution') }}</span>
                </div>
                <div class="before-after-item__item-text">
                    {{ solutions?.description }}
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import AppImage from '~/shared/ui/Media/AppImage.vue'

const props = defineProps({
    data: {
        type: Object,
        required: true
    }
})

const issues = computed(() => props.data?.issues?.[0])
const solutions = computed(() => props.data?.solutions?.[0])
</script>

<style lang="scss" scoped>
.before-after-item {
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding: 20px;
    background-color: $light;
    border-radius: 15px;

    @media (min-width: $tablet-breakpoint) {
        gap: 30px;
        padding: 30px;
        border-radius: 20px;
    }

    @media (min-width: $desktop-breakpoint) {
        gap: 40px;
        padding: 40px;
        border-radius: 25px;
    }

    @media (min-width: $lg-desktop-breakpoint) {
        gap: 48px;
        padding: 48px;
        border-radius: 30px;
    }

    &__divider {
        width: 100%;
        height: 1px;
        background-color: $secondary-100;
    }

    &__content {
        display: flex;
        flex-direction: column;
        gap: 30px;

        @media (min-width: $tablet-breakpoint) {
            flex-direction: row;
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
        font-weight: 700;
        line-height: 120%;

        @media (min-width: $tablet-breakpoint) {
            width: 100%;
            font-size: 28px;
        }

        @media (min-width: $desktop-breakpoint) {
            font-size: 32px;
        }

        @media (min-width: $lg-desktop-breakpoint) {
            font-size: 48px;
        }
    }

    &__desc {
        font-size: 14px;
        font-weight: 400;
        line-height: 140%;

        @media (min-width: $tablet-breakpoint) {
            width: 100%;
            font-size: 16px;
        }

        @media (min-width: $desktop-breakpoint) {
            font-size: 18px;
        }

        @media (min-width: $lg-desktop-breakpoint) {
            font-size: 20px;
        }
    }

    &__items {
        display: flex;
        flex-direction: column;
        gap: 10px;

        @media (min-width: $tablet-breakpoint) {
            flex-direction: row;
            gap: 15px;
        }

        @media (min-width: $desktop-breakpoint) {
            gap: 20px;
        }

        @media (min-width: $lg-desktop-breakpoint) {
            gap: 24px;
        }
    }

    &__item {
        width: 100%;
    }

    &__item-img-wrap {
        position: relative;
        height: 306px;
        margin-bottom: 20px;
        overflow: hidden;
        border: none;

        @media (min-width: $tablet-breakpoint) {
            margin-bottom: 15px;
        }

        @media (min-width: $desktop-breakpoint) {
            margin-bottom: 20px;
        }

        :deep(img) {
            object-fit: cover;
            border-radius: 15px;
        }
    }

    &__item-label {
        position: absolute;
        top: 0;
        left: 0;
        padding: 5px 10px 5px 0;
        font-size: 14px;
        font-style: normal;
        font-weight: 700;
        line-height: 140%;
        background-color: $light;
        border-radius: 0 0 10px;

        @media (min-width: $tablet-breakpoint) {
            padding: 10px 15px 10px 0;
            font-size: 16px;
            border-radius: 0 0 15px;
        }

        @media (min-width: $desktop-breakpoint) {
            font-size: 18px;
        }

        @media (min-width: $lg-desktop-breakpoint) {
            font-size: 20px;
        }
    }

    &__item-text {
        font-size: 14px;
        font-style: normal;
        font-weight: 400;
        line-height: 140%;

        @media (min-width: $tablet-breakpoint) {
            font-size: 16px;
        }

        @media (min-width: $desktop-breakpoint) {
            font-size: 18px;
        }

        @media (min-width: $lg-desktop-breakpoint) {
            font-size: 20px;
        }
    }
}
</style>