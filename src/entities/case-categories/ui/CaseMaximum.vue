<template>
    <NuxtLink
        :to="localePath(data?.link?.url)"
        class="case-maximum"
        :title="data?.link?.title"
    >
        <CaseItemTitle class="case-maximum__title">
            {{ data.title }}
        </CaseItemTitle>
        <div class="case-maximum__parameters">
            <div v-for="item in data.parameters" :key="item.name" class="case-maximum__row">
                <ParametersItem :data="item" />
            </div>
        </div>
        <BlockSeparator />
        <div class="case-maximum__fullwidth-img-wrap">
            <AppImage
                :urls="data.image?.urls"
                :alt="data.image?.alt"
                :title="data.image?.title"
                class="case-maximum__fullwidth-img"
                :loading="lazy ? 'lazy' : null"
            />
        </div>
        <div class="case-maximum__items">
            <div class="case-maximum__item">
                <div class="case-maximum__item-img-wrap">
                    <AppImage
                        :urls="issue?.image?.urls"
                        :alt="issue?.image?.alt"
                        :title="issue?.image?.title"
                        class="case-maximum__item-img"
                        :loading="lazy ? 'lazy' : null"
                    />
                    <div class="case-maximum__item-label">
                        {{ $t('caseCategories.problem') }}
                    </div>
                </div>
                <div class="case-maximum__item-text">
                    {{ issue?.description }}
                </div>
            </div>
            <div class="case-maximum__item">
                <div class="case-maximum__item-img-wrap">
                    <AppImage
                        :urls="solution?.image?.urls"
                        class="case-maximum__item-img"
                        :alt="solution?.image?.alt"
                        :title="solution?.image?.title"
                        :loading="lazy ? 'lazy' : null"
                    />
                    <span class="case-maximum__item-label">{{ $t('caseCategories.solution') }}</span>
                </div>
                <div class="case-maximum__item-text">
                    {{ solution?.description }}
                </div>
            </div>
        </div>
    </NuxtLink>
</template>

<script setup>
import BlockSeparator from '~/shared/ui/Separators/BlockSeparator.vue'
import AppImage from '~/shared/ui/Media/AppImage.vue'
import CaseItemTitle from './CaseItemTitle.vue'
import ParametersItem from '~/entities/parameters/ui/ParametersItem.vue'

const props = defineProps({
    data: {
        type: Object,
        required: true
    },
    lazy: {
        type: Boolean,
        default: false,
    }
})

const localePath = useLocalePath()

const solution = computed(() => props.data?.clinical_picture?.solutions[0])
const issue = computed(() => props.data?.clinical_picture?.issues[0])
</script>

<style lang="scss" scoped>
.case-maximum {
    display: flex;
    flex-direction: column;
    gap: 20px;
    color: $dark-500;

    @media (any-hover: hover) {
        &:hover {
            .case-maximum__title {
                color: $primary-500;
            }
        }
    }

    @media (min-width: $tablet-breakpoint) {
        gap: 30px;
    }

    @media (min-width: $desktop-breakpoint) {
        flex-direction: row;
        flex-wrap: wrap;
        gap: 40px;
    }

    @media (min-width: $lg-desktop-breakpoint) {
        gap: 48px;
    }

    &__title {
        transition: color $base-ui-transition;

        @media (min-width: $desktop-breakpoint) {
            width: calc(50% - 20px);
        }

        @media (min-width: $lg-desktop-breakpoint) {
            width: calc(50% - 24px);
        }
    }

    &__row {
        display: flex;
        flex-direction: column;
        gap: 5px;

        @media (min-width: $tablet-breakpoint) {
            gap: 8px;
        }

        @media (min-width: $desktop-breakpoint) {
            gap: 10px;
        }

        @media (min-width: $lg-desktop-breakpoint) {
            gap: 12px;
        }
    }

    &__parameters {
        display: flex;
        flex-direction: column;
        gap: 5px;

        @media (min-width: $tablet-breakpoint) {
            gap: 8px;
        }

        @media (min-width: $desktop-breakpoint) {
            gap: 10px;
            width: calc(50% - 20px);
        }

        @media (min-width: $lg-desktop-breakpoint) {
            gap: 12px;
            width: calc(50% - 24px);
        }
    }

    &__parameter-label,
    &__parameter-value {
        font-size: 14px;
        font-style: normal;
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

    &__parameter-label {
        font-weight: 400;
    }

    &__parameter-value {
        font-weight: 700;
    }

    &__fullwidth-img-wrap {
        width: 100%;
        height: 160px;
        overflow: hidden;
        border-radius: 7px;

        @media (min-width: $tablet-breakpoint) {
            height: 300px;
            border-radius: 10px;
        }

        @media (min-width: $desktop-breakpoint) {
            height: 384px;
            border-radius: 12px;
        }

        @media (min-width: $lg-desktop-breakpoint) {
            width: calc(50% - 24px);
            height: 408px;
            border-radius: 15px;
        }
    }

    &__fullwidth-img {
        object-fit: cover;
    }

    &__items {
        display: flex;
        gap: 20px;
        width: 100%;

        @media (min-width: $tablet-breakpoint) {
            gap: 40px;
        }

        @media (min-width: $lg-desktop-breakpoint) {
            width: calc(50% - 24px);
        }
    }

    &__item {
        width: 50%;
    }

    &__item-img-wrap {
        position: relative;
        height: 150px;
        margin-bottom: 10px;
        overflow: hidden;
        border: none;

        @media (min-width: $tablet-breakpoint) {
            height: 276px;
            margin-bottom: 15px;
        }

        @media (min-width: $desktop-breakpoint) {
            margin-bottom: 20px;
        }

        :deep(img) {
            object-fit: cover;
            border-radius: 7px;

            @media (min-width: $tablet-breakpoint) {
                border-radius: 10px;
            }

            @media (min-width: $desktop-breakpoint) {
                border-radius: 15px;
            }
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

        @media (min-width: $desktop-breakpoint) {
            padding: 10px 15px 10px 0;
            font-size: 16px;
            border-radius: 0 0 15px;
        }

        @media (min-width: $lg-desktop-breakpoint) {
            font-size: 16px;
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