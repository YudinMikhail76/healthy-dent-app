<template>
    <div class="price-advantages">
        <div class="price-advantages__item">
            <div class="price-advantages__item-part">
                <div class="price-advantages__item-icon-wrap">
                    <AppImage
                        fit="contain"
                        :src="data.fields?.image1?.urls?.original"
                        :alt="data.fields?.image1?.alt"
                        :title="data.fields?.image1?.title"
                    />
                </div>
                <div class="price-advantages__item-title">
                    {{ data.fields?.string1 }}
                </div>
            </div>
            <CaretSeparator class="price-advantages__separator" />
            <div class="price-advantages__item-description">
                <div v-html="data.fields?.text1" />
                <AppLink
                    v-if="data.fields?.link1?.url"
                    :to="localePath(data.fields?.link1?.url)"
                    class="price-advantages__link"
                >
                    {{ data.fields?.link1?.title }}
                </AppLink>
            </div>
        </div>
        <div class="price-advantages__item">
            <div class="price-advantages__item-part">
                <div class="price-advantages__item-icon-wrap">
                    <AppImage
                        fit="contain"
                        :src="data.fields?.image2?.urls?.original"
                        :alt="data.fields?.image2?.alt"
                        :title="data.fields?.image2?.title"
                    />
                </div>
                <div class="price-advantages__item-title">
                    {{ data.fields?.string2 }}
                </div>
            </div>
            <CaretSeparator class="price-advantages__separator" />
            <div class="price-advantages__item-description">
                <div v-html="data.fields?.text2" />
                <AppLink
                    v-if="data.fields?.link2?.url"
                    :to="localePath(data.fields?.link2?.url)"
                    class="price-advantages__link"
                >
                    {{ data.fields?.link2?.title }}
                </AppLink>
            </div>
        </div>
        <div class="price-advantages__item">
            <div class="price-advantages__item-part">
                <div class="price-advantages__item-icon-wrap">
                    <AppImage
                        fit="contain"
                        :src="data.fields?.image3?.urls?.original"
                        :alt="data.fields?.image3?.alt"
                        :title="data.fields?.image3?.title"
                    />
                </div>
                <div class="price-advantages__item-title">
                    {{ data.fields?.string3 }}
                </div>
            </div>
            <CaretSeparator class="price-advantages__separator" />
            <div class="price-advantages__item-description">
                <div v-html="data.fields?.text3" />
                <AppLink
                    v-if="data.fields?.link3?.url"
                    :to="localePath(data.fields?.link3?.url)"
                    class="price-advantages__link"
                >
                    {{ data.fields?.link3?.title }}
                </AppLink>
            </div>
        </div>
        <div class="price-advantages__item">
            <div class="price-advantages__item-part">
                <div class="price-advantages__item-icon-wrap">
                    <AppImage
                        fit="contain"
                        :src="data.fields?.image4?.urls?.original"
                        :alt="data.fields?.image4?.alt"
                        :title="data.fields?.image4?.title"
                    />
                </div>
                <div class="price-advantages__item-title">
                    {{ data.fields?.string4 }}
                </div>
            </div>
            <CaretSeparator class="price-advantages__separator" />
            <div class="price-advantages__item-description">
                <div v-html="data.fields?.text4" />
                <AppLink
                    v-if="data.fields?.link4?.url"
                    :to="localePath(data.fields?.link4?.url)"
                    class="price-advantages__link"
                >
                    {{ data.fields?.link4?.title }}
                </AppLink>
            </div>
        </div>
    </div>
</template>

<script setup>
import AppLink from '~/shared/ui/Links/AppLink.vue'
import AppImage from '~/shared/ui/Media/AppImage.vue'
import CaretSeparator from '~/shared/ui/Separators/CaretSeparator.vue'

defineProps({
    data: {
        type: Object,
        required: true
    }
})

const localePath = useLocalePath()
</script>

<style lang="scss" scoped>
.price-advantages {
    display: flex;
    gap: 8px;
    margin: 20px 0;
    overflow-x: auto;

    @media (min-width: $desktop-breakpoint) {
        gap: 10px;
        margin: 40px 0;
        overflow: initial;
    }

    @media (min-width: $lg-desktop-breakpoint) {
        gap: 12px;
        margin: 48px 0;
    }

    &::-webkit-scrollbar {
        height: 3px;
        margin: 20px 0;
    }

    &::-webkit-scrollbar-track {
        border-radius: 10px;
    }

    &__item {
        display: flex;
        flex-direction: column;
        max-width: 300px;
        min-width: 300px;
        min-height: 220px;
        background: $dark-100;
        border-radius: 15px;

        @media (min-width: $tablet-breakpoint) {
            min-height: 320px;
        }

        @media (min-width: $desktop-breakpoint) {
            width: calc(33.33% - 5px);
            max-width: none;
            min-width: auto;
            min-height: 400px;
        }

        @media (min-width: $lg-desktop-breakpoint) {
            min-height: 416px;
        }
    }

    &__item-part {
        padding: 10px;

        @media (min-width: $tablet-breakpoint) {
            padding: 15px;
        }

        @media (min-width: $desktop-breakpoint) {
            padding: 20px;
        }

        @media (min-width: $lg-desktop-breakpoint) {
            padding: 24px;
        }
    }

    &__item-title {
        font-size: 20px;
        font-style: normal;
        font-weight: 700;
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
            padding: 20px;
            font-size: 18px;
        }

        @media (min-width: $lg-desktop-breakpoint) {
            padding: 24px;
            font-size: 20px;
        }

        :deep(.item) {
            display: flex;
            gap: 10px;
            margin-top: 10px;

            @media (min-width: $tablet-breakpoint) {
                gap: 15px;
                margin-top: 15px;
            }

            @media (min-width: $desktop-breakpoint) {
                gap: 20px;
                margin-top: 20px;
            }

            @media (min-width: $lg-desktop-breakpoint) {
                gap: 24px;
                margin-top: 24px;
            }

            span {
                width: 50%;
                font-size: 14px;
                font-style: normal;
                font-weight: 700;
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
    }

    &__link {
        margin-top: 10px;
        
        @media (min-width: $tablet-breakpoint) {
            margin-top: 15px;
        }

        @media (min-width: $desktop-breakpoint) {
            margin-top: 20px;
        }

        @media (min-width: $lg-desktop-breakpoint) {
            margin-top: 24px;
        }
    }

    &__item-icon-wrap {
        width: 30px;
        height: 30px;
        margin-bottom: 8px;

        @media (min-width: $tablet-breakpoint) {
            width: 36px;
            height: 36px;
            margin-bottom: 12px;
        }

        @media (min-width: $desktop-breakpoint) {
            width: 40px;
            height: 40px;
            margin-bottom: 14px;
        }

        @media (min-width: $lg-desktop-breakpoint) {
            width: 48px;
            height: 48px;
            margin-bottom: 16px;
        }

        :deep(img) {
            width: 100%;
            height: 100%;
            stroke: $dark-300;
        }
    }

    &__separator {
        margin-top: auto;
    }
}
</style>