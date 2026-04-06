<template>
    <ParagraphItemContainer class="stages-list">
        <div class="stages-list__intro">
            <h2 v-if="data?.title" class="stages-list__title">
                {{ data.title }}
            </h2>
            <div class="stages-list__description" v-html="data?.description" />
        </div>
        <div class="stages-list__items">
            <div v-for="item in data?.items" :key="item.title" class="stages-list__item">
                <div class="stages-list__item-heading">
                    <div class="stages-list__item-title">
                        {{ item.title }}
                    </div>
                </div>
                <CaretSeparator color="#ffffff" class="is-desktop-hide" />
                <CaretSeparatorVertical color="#ffffff" class="is-desktop-only" />
                <div class="stages-list__item-description">
                    {{ item.description }}
                </div>
            </div>
        </div>
    </ParagraphItemContainer>
</template>

<script setup>
import ParagraphItemContainer from '~/shared/ui/Containers/ParagraphItemContainer.vue'
import CaretSeparator from '~/shared/ui/Separators/CaretSeparator.vue'
import CaretSeparatorVertical from '~/shared/ui/Separators/CaretSeparatorVertical.vue'

defineProps({
    data: {
        type: Object,
        required: true
    }
})
</script>

<style lang="scss" scoped>
.stages-list {
    counter-reset: counter-with-zero;

    &__intro {
        padding-bottom: 20px;
        margin-bottom: 20px;
        border-bottom: 1px solid $secondary-100;

        @media (min-width: $tablet-breakpoint) {
            display: flex;
            gap: 30px;
            padding-bottom: 30px;
            margin-bottom: 30px;
        }

        @media (min-width: $desktop-breakpoint) {
            gap: 40px;
            padding-bottom: 40px;
            margin-bottom: 40px;
        }

        @media (min-width: $lg-desktop-breakpoint) {
            gap: 48px;
            padding-bottom: 48px;
            margin-bottom: 48px;
        }
    }

    &__title {
        margin-bottom: 20px;
        font-size: 24px;
        font-style: normal;
        font-weight: 700;
        line-height: 120%;

        @media (min-width: $tablet-breakpoint) {
            width: 50%;
            margin-bottom: 0;
            font-size: 28px;
        }

        @media (min-width: $desktop-breakpoint) {
            font-size: 32px;
        }

        @media (min-width: $lg-desktop-breakpoint) {
            font-size: 48px;
        }
    }

    &__description {
        font-size: 14px;
        font-style: normal;
        font-weight: 400;
        line-height: 140%;

        :deep(strong) {
            display: block;
            margin-bottom: 15px;

            @media (min-width: $tablet-breakpoint) {
                margin-bottom: 20px;
            }

            @media (min-width: $desktop-breakpoint) {
                margin-bottom: 25px;
            }

            @media (min-width: $lg-desktop-breakpoint) {
                margin-bottom: 32px;
            }
        }

        @media (min-width: $tablet-breakpoint) {
            width: 50%;
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
        gap: 8px;

        @media (min-width: $desktop-breakpoint) {
            gap: 10px;
        }
        
        @media (min-width: $lg-desktop-breakpoint) {
            gap: 12px;
        }
    }

    &__item {
        background-color: $dark-100;
        border-radius: 7px;

        @media (min-width: $desktop-breakpoint) {
            display: flex;
            border-radius: 12px;
        }

        @media (min-width: $lg-desktop-breakpoint) {
            border-radius: 15px;
        }
    }

    &__item-heading {
        position: relative;
        padding: 10px;
        font-size: 14px;
        font-style: normal;
        font-weight: 400;
        line-height: 140%;
        counter-increment: counter-with-zero;

        @media (min-width: $tablet-breakpoint) {
            padding: 15px;
            font-size: 16px;
        }

        @media (min-width: $desktop-breakpoint) {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            width: calc(50% - 9px);
            padding: 20px;
            font-size: 18px;
        }

        @media (min-width: $lg-desktop-breakpoint) {
            width: calc(50% - 10px);
            padding: 24px;
            font-size: 24px;
        }

        &::before {
            content: '/';
            display: inline-block;
            width: fit-content;
            margin-bottom: 10px;
            color: $dark-200;

            @media (min-width: $desktop-breakpoint) {
                margin-bottom: 20px;
            }

            @media (min-width: $lg-desktop-breakpoint) {
                margin-bottom: 24px;
            }
        }

        &::after {
            content: counter(counter-with-zero, decimal-leading-zero);
            position: absolute;
            top: 10px;
            left: 21px;

            @media (min-width: $tablet-breakpoint) {
                top: 15px;
                left: 26px;
            }

            @media (min-width: $desktop-breakpoint) {
                top: 20px;
                left: 32px;
            }

            @media (min-width: $lg-desktop-breakpoint) {
                top: 24px;
                left: 37px;
            }
        }
    }

    &__item-title {
        font-size: 16px;
        font-style: normal;
        font-weight: 700;
        line-height: 120%;

        @media (min-width: $tablet-breakpoint) {
            font-size: 18px;
        }

        @media (min-width: $desktop-breakpoint) {
            font-size: 20px;
        }

        @media (min-width: $lg-desktop-breakpoint) {
            font-size: 24px;
        }
    }

    &__item-description {
        padding: 10px;
        font-size: 14px;
        font-style: normal;
        font-weight: 400;
        line-height: 140%;
        
        @media (min-width: $tablet-breakpoint) {
            padding: 15px;
            font-size: 16px;
        }
        
        @media (min-width: $desktop-breakpoint) {
            width: calc(50% - 9px);
            padding: 20px;
            font-size: 18px;
        }

        @media (min-width: $lg-desktop-breakpoint) {
            width: calc(50% - 10px);
            padding: 20px;
            font-size: 20px;
        }
    }
}
</style>