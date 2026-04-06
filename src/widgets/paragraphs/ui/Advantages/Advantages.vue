<template>
    <div class="advantages">
        <div class="advantages__heading">
            <h2 v-if="data?.title" class="advantages__title">
                {{ data.title }}
            </h2>
            <AppLink
                :to="data.link.url"
                variant="primary"
                class="advantages__link"
            >
                {{ data.link.title }}
            </AppLink>
        </div>
        <div class="advantages__row">
            <div class="advantages__item advantages__item--main">
                <div class="advantages__item-head">
                    <div class="advantages__main-item-title">
                        {{ main.title }}
                    </div>
                    <div class="advantages__main-item-img-container">
                        <AppImage
                            v-if="main.image?.urls?.desktop_webp"
                            :urls="main.image?.urls"
                            class="advantages__main-item-img"
                            :alt="main.image?.alt"
                            :title="main.image?.title"
                            loading="lazy"
                            fit="contain"
                        />
                    </div>
                </div>
                <div class="advantages__item-body">
                    <div class="advantages__item-description">
                        {{ main.short_description }}
                    </div>
                    <AppLink
                        :to="main.link.url"
                        variant="primary"
                        class="advantages__main-item-link"
                    >
                        {{ main.link.title }}
                    </AppLink>
                </div>
            </div>
            <div class="advantages__grid">
                <div
                    v-for="item in halfItems"
                    :key="item.title"
                    class="advantages__item advantages__item--with_icon"
                >
                    <div class="advantages__with-icon-image">
                        <AppImage
                            :urls="item.image?.urls"
                            width="48"
                            height="48"
                            class="advantages__img"
                            :alt="item.image?.alt"
                            :title="item.image?.title"
                            loading="lazy"
                        />
                    </div>
                    <div class="advantages__with-icon-title">
                        {{ item.title }}
                    </div>
                    <div class="advantages__item-description advantages__with-icon-description">
                        {{ item.short_description }}
                    </div>
                    <AppLink
                        :to="item.link.url"
                        variant="primary"
                        class="advantages__with-icon-link"
                    >
                        {{ item.link.title }}
                    </AppLink>
                </div>
                <div class="advantages__item advantages__item--short">
                    <div class="advantages__short-item-title">
                        {{ shortItem.title }}
                    </div>
                    <div class="advantages__short-item-img">
                        <AppImage
                            :urls="shortItem?.image?.urls"
                            :alt="shortItem?.image?.alt"
                            :title="shortItem?.image?.title"
                            loading="lazy"
                        />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import AppLink from '~/shared/ui/Links/AppLink.vue'
import AppImage from '~/shared/ui/Media/AppImage.vue'

const props = defineProps({
    data: {
        type: Object,
        required: true
    }
})

const main = computed(() => props.data?.items.find((item) => item.type === 'main'))
const halfItems = computed(() => props.data?.items.filter((item) => item.type === 'with_icon'))
const shortItem = computed(() => props.data?.items.find((item) => item.type === 'short'))
</script>

<style lang="scss" scoped>
.advantages {
    margin: 40px 0;
    color: $dark-500;

    @media (min-width: $desktop-breakpoint) {
        margin: 80px 0;
    }

    @media (min-width: $lg-desktop-breakpoint) {
        margin: 96px 0;
    }

    &__heading {
        margin-bottom: 20px;

        @media (min-width: $desktop-breakpoint) {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 20px;
            margin-bottom: 40px;
        }

        @media (min-width: $lg-desktop-breakpoint) {
            margin-bottom: 48px;
        }
    }

    &__title {
        margin-bottom: 20px;
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

    &__row {
        display: flex;
        flex-wrap: wrap;
        gap: 10px;

        @media (min-width: $desktop-breakpoint) {
            align-items: stretch;
            gap: 20px;
            min-height: 612px;
        }

        @media (min-width: $lg-desktop-breakpoint) {
            gap: 24px;
        }
    }

    &__grid {
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
        width: 100%;

        @media (min-width: $desktop-breakpoint) {
            gap: 20px;
            width: calc(50% - 10px);
        }

        @media (min-width: $lg-desktop-breakpoint) {
            width: calc(50% - 12px);
        }
    }

    &__item {
        padding: 15px;
        border-radius: 15px;

        @media (min-width: $desktop-breakpoint) {
            padding: 25px;
            border-radius: 25px;
        }

        @media (min-width: $lg-desktop-breakpoint) {
            padding: 32px;
            border-radius: 30px;
        }
    }

    &__item--main {
        width: 100%;
        background-color: $light;

        @media (min-width: $desktop-breakpoint) {
            width: calc(50% - 10px);
        }

        @media (min-width: $lg-desktop-breakpoint) {
            width: calc(50% - 12px);
        }
    }

    &__item-head {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        margin-bottom: 15px;
        overflow: hidden;
        background-color: $primary-200;
        border-radius: 7px;

        @media (min-width: $tablet-breakpoint) {
            flex-direction: row;
        }

        @media (min-width: $desktop-breakpoint) {
            flex-direction: column;
            margin-bottom: 25px;
            border-radius: 12px;
        }

        @media (min-width: $lg-desktop-breakpoint) {
            margin-bottom: 32px;
            border-radius: 15px;
        }
    }

    &__main-item-title {
        min-height: 160px;
        padding: 20px;
        font-size: 24px;
        font-style: normal;
        font-weight: 400;
        line-height: 120%;
        word-break: break-word;

        @media (min-width: $tablet-breakpoint) {
            width: 50%;
        }

        @media (min-width: $desktop-breakpoint) {
            width: 100%;
            min-height: 182px;
            padding: 25px;
            font-size: 32px;
        }

        @media (min-width: $lg-desktop-breakpoint) {
            min-height: 298px;
            padding: 32px;
            font-size: 48px;
        }
    }

    &__item-description {
        margin-bottom: 16px;
        font-size: 14px;
        font-style: normal;
        font-weight: 400;
        line-height: 140%;

        @media (min-width: $desktop-breakpoint) {
            font-size: 18px;
        }

        @media (min-width: $lg-desktop-breakpoint) {
            font-size: 20px;
        }
    }

    &__main-item-img-container {
        width: 241px;
        height: 160px;
        margin-left: auto;

        @media (min-width: $tablet-breakpoint) {
            width: 50%;
            padding: 12px 0 0 39px;
        }

        @media (min-width: $desktop-breakpoint) {
            width: 271px;
            height: 182px;
            padding-top: 2px;
        }

        @media (min-width: $lg-desktop-breakpoint) {
            width: 456px;
            height: 304px;
        }
    }

    &__main-item-img {
        &:deep(img) {
            object-position: right bottom;
        }
    }

    &__item--with_icon {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        width: 100%;
        background-color: $light;

        @media (min-width: $mobile-breakpoint) {
            width: calc(50% - 5px);
        }

        @media (min-width: $desktop-breakpoint) {
            width: calc(50% - 10px);
            min-height: 414px;
        }

        @media (min-width: $lg-desktop-breakpoint) {
            min-height: 532px;
        }
    }

    &__item--short {
        display: flex;
        align-items: center;
        gap: 15px;
        width: 100%;
        background-color: $primary-400;

        @media (min-width: $desktop-breakpoint) {
            gap: 25px;
            min-height: 178px;
        }

        @media (min-width: $lg-desktop-breakpoint) {
            gap: 32px;
        }
    }

    &__short-item-title {
        font-size: 20px;
        font-style: normal;
        font-weight: 700;
        line-height: 120%;
        color: $light;

        @media (min-width: $desktop-breakpoint) {
            font-size: 24px;
        }

        @media (min-width: $lg-desktop-breakpoint) {
            font-size: 32px;
        }
    }

    &__short-item-img {
        height: 72px;
        max-width: 72px;
        min-width: 72px;

        @media (min-width: $desktop-breakpoint) {
            max-width: 124px;
            min-width: 124px;
            min-height: 124px;
        }

        @media (min-width: $lg-desktop-breakpoint) {
            height: 192px;
            max-width: 192px;
            min-width: 192px;
        }
    }

    &__with-icon-image {
        width: 48px;
        height: 48px;
        margin-bottom: 10px;
        overflow: hidden;
        background-color: $dark-200;
        border-radius: 50%;

        @media (min-width: $desktop-breakpoint) {
            width: 72px;
            height: 72px;
            margin-bottom: 20px;
        }

        @media (min-width: $lg-desktop-breakpoint) {
            width: 96px;
            height: 96px;
        }
    }

    &__img {
        object-fit: cover;
    }

    &__with-icon-title {
        margin-bottom: 10px;
        font-size: 20px;
        font-style: normal;
        font-weight: 700;
        line-height: 120%;

        @media (min-width: $desktop-breakpoint) {
            margin-bottom: 20px;
            font-size: 24px;
        }

        @media (min-width: $lg-desktop-breakpoint) {
            margin-bottom: 24px;
            font-size: 32px;
        }
    }

    &__with-icon-description {
        margin-bottom: 15px;

        @media (min-width: $desktop-breakpoint) {
            margin-bottom: 24px;
        }

        @media (min-width: $lg-desktop-breakpoint) {
            margin-bottom: 50px;
        }
    }

    &__with-icon-link {
        margin-top: auto;
    }
}
</style>