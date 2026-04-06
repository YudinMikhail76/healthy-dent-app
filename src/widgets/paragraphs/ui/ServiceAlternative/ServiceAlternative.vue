<template>
    <ParagraphItemContainer background="#53D9D3" class="services-alternative">
        <div class="services-alternative__img">
            <AppImage
                :urls="data.photo?.urls"
                :title="data.photo?.title || data.photo?.alt"
                :alt="data.photo?.alt || data.photo?.title"
                loading="lazy"
            />
        </div>
        <div class="services-alternative__content">
            <h2 class="services-alternative__title">
                {{ data.title }}
            </h2>
            <div class="services-alternative__desc">
                {{ data.description }}
            </div>
            <div
                v-for="item in data.items"
                :key="item.title"
                class="services-problems__problems"
            >
                <ServiceAlternativeItem :data="item" />
            </div>
        </div>
    </ParagraphItemContainer>
</template>

<script setup>
import AppImage from '~/shared/ui/Media/AppImage.vue'
import ParagraphItemContainer from '~/shared/ui/Containers/ParagraphItemContainer.vue'
import ServiceAlternativeItem from './ui/ServiceAlternativeItem.vue'

defineProps({
    data: {
        type: Object,
        required: true
    }
})
</script>

<style lang="scss" scoped>
.services-alternative {
    display: flex;
    flex-direction: column-reverse;
    gap: 20px;
    padding: 20px 20px 0;

    @media (min-width: $tablet-breakpoint) {
        gap: 30px;
    }

    @media (min-width: $desktop-breakpoint) {
        flex-direction: row;
        gap: 0;
        padding: 0;
    }

    &__img {
        width: 320px;
        height: 320px;
        margin: 0 auto;

        @media (min-width: $tablet-breakpoint) {
            width: 330px;
            height: 330px;
        }

        @media (min-width: $desktop-breakpoint) {
            align-self: end;
            width: 55%;
            height: 424px;
            max-width: 424px;
        }

        @media (min-width: $lg-desktop-breakpoint) {
            width: 50%;
            height: 600px;
            max-width: 600px;
        }
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
            width: 45%;
            padding: 40px 40px 40px 0;
        }

        @media (min-width: $lg-desktop-breakpoint) {
            gap: 48px;
            width: 50%;
            padding: 48px 48px 48px 0;
        }
    }

    &__title {
        font-size: 24px;
        font-style: normal;
        font-weight: 700;
        line-height: 120%;
        color: $dark-500;

        @media (min-width: $tablet-breakpoint) {
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
        font-style: normal;
        font-weight: 400;
        line-height: 140%;
        color: $dark-500;

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

    &__problems {
        display: flex;
        flex-direction: column;
        gap: 24px;
    }
}
</style>