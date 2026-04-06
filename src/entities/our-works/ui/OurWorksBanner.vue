<template>
    <article class="article-banner">
        <AppContainer>
            <AppBreadcrumbs class="article-banner__breadcrumbs" :breadcrumbs="breadcrumbs" />
            <div class="article-banner__inner">
                <div class="article-banner__img-container">
                    <AppImage
                        class="article-banner__img"
                    />
                </div>
                <div class="article-banner__content">
                    <h1 class="article-banner__title">
                        All-on-2 за три чотири п’ять шість місяців
                    </h1>
                    <div class="article-banner__desc">
                        Пацієнт 55 років звернувся в центр імплантації і протезування Хелсі Дент з метою заміни знімних акрилових протезів верхньої і нижньої щелеп на незнімну конструкцію з опорою на імплантати методом все на 4-6 ти. 
                    </div>
                    <div class="article-banner__button-container">
                        <!-- full-width -->
                        <AppButton
                            background-color="#E9E8EE"
                            border-color="#494A52"
                            class="article-banner__button"
                        >
                            {{ t('global.buttons.similarCase') }}
                        </AppButton>
                    </div>
                </div>
            </div>
        </AppContainer>
    </article>
</template>

<script setup>
import AppContainer from '~/shared/ui/Containers/AppContainer.vue'
import AppImage from '~/shared/ui/Media/AppImage.vue'
import AppBreadcrumbs from '~/shared/ui/Navigation/AppBreadcrumbs.vue'
import AppButton from '~/shared/ui/Buttons/AppButton.vue'

// const props = defineProps({
//     tags: {
//         type: Array,
//         default: () => []
//     },
//     image: {
//         type: Object,
//         required: true
//     },
//     breadcrumbs: {
//         type: Array,
//         default: () => []
//     },
//     title: {
//         type: String,
//         required: true
//     }
// })
const { t } = useI18n()

const breadcrumbs = [
    {
        title: 'Наші роботи',
        to: '/'
    }
]
</script>

<style lang="scss" scoped>
.article-banner {
    margin-bottom: 40px;

    &__inner {
        @media (min-width: $desktop-breakpoint) {
            display: flex;
            flex-direction: row-reverse;
            align-items: center;
            gap: 64px;
        }

        @media (min-width: $lg-desktop-breakpoint) {
            gap: 96px;
        }
    }

    @media (min-width: $desktop-breakpoint) {
        margin-bottom: 80px;
    }

    @media (min-width: $lg-desktop-breakpoint) {
        margin-bottom: 96px;
    }

    &__breadcrumbs {
        margin-bottom: 6.5px;

        @media (min-width: $desktop-breakpoint) {
            margin-bottom: 12px;
        }

        @media (min-width: $lg-desktop-breakpoint) {
            margin-bottom: 16px;
        }
    }

    &__title {
        font-size: 32px;
        font-style: normal;
        font-weight: 700;
        line-height: 120%;

        @media (min-width: $desktop-breakpoint) {
            font-size: 48px;
        }

        @media (min-width: $lg-desktop-breakpoint) {
            font-size: 64px;
        }
    }

    &__desc {
        font-size: 20px;
        font-style: normal;
        font-weight: 400;
        line-height: 120%;

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

    &__img-container {
        position: relative;
        height: 200px;
        margin-bottom: 20px;
        overflow: hidden;
        border-radius: 15px;

        @media (min-width: $desktop-breakpoint) {
            width: 50%;
            height: 436px;
            border-radius: 25px;
        }

        @media (min-width: $lg-desktop-breakpoint) {
            height: 620px;
            border-radius: 30px;
        }

        &::after {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(0deg, rgba(45, 194, 187, .2) 0%, rgba(45, 194, 187, .2) 100%), linear-gradient(0deg, rgba(145, 147, 161, .5) 0%, rgba(145, 147, 161, .5) 100%), rgba(73, 74, 82, .2);
            opacity: .6;
            background-blend-mode: screen, multiply, color;
        }
    }

    &__img {
        object-fit: cover;
    }

    &__content {
        display: flex;
        flex-direction: column;
        gap: 20px;

        @media (min-width: $tablet-breakpoint) {
            gap: 30px;
        }

        @media (min-width: $desktop-breakpoint) {
            gap: 40px;
            width: 50%;
        }

        @media (min-width: $lg-desktop-breakpoint) {
            gap: 4px;
        }
    }

    &__button-container {
        display: flex;
        justify-content: flex-end;
    }

    &__button {
        width: 50%;
    }
}
</style>