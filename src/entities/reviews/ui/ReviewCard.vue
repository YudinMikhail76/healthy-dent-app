<template>
    <div class="reviews__card">
        <AppRating
            :mark="data?.rating"
            size="small"
            variant="primary"
            is-disabled
        />
        <div :class="textClasses" v-html="data?.text" />
        <div class="reviews__links">
            <AppLink :to="localePath(data.link?.url?.url)" variant="primary" target="_blank">
                {{ data.link?.title }}
            </AppLink>
            <div class="reviews__tags">
                <AppTag
                    v-for="item in data.categories"
                    :key="item.title"
                    :to="localePath(item.link)"
                >
                    {{ item.title }}
                </AppTag>
            </div>
        </div>
        <BlockSeparator class="reviews__separator" />
        <div class="reviews__people">
            <div class="reviews__patient reviews__person">
                <div class="reviews__patient-img-wrap">
                    <AppImage
                        v-if="!isEmptyImageUrls(data?.author?.icon)"
                        :urls="data?.author?.icon?.urls"
                        :alt="data?.author?.icon?.alt"
                        :title="data?.author?.icon?.title"
                        class="reviews__person-img"
                        :loading="lazyImg ? 'lazy' : null"
                    />
                    <NoAvatar v-else class="reviews__person-img" />
                </div>
                <div class="reviews__patient-content">
                    <div class="reviews__patient-date">
                        {{ data.date }}
                    </div>
                    <div class="reviews__person-name">
                        {{ data.author?.full_name }}
                    </div>
                </div>
            </div>
            <div v-if="data.doctors?.length" class="reviews__doctors">
                <template v-if="data.doctors?.length === 1">
                    <div
                        v-for="item in data.doctors"
                        :key="item.last_name"
                        class="reviews__doctor reviews__person"
                    >
                        <div class="reviews__doctor-img-wrap">
                            <AppImage
                                v-if="!isEmptyImageUrls(item?.picture?.urls)"
                                :urls="item?.picture?.urls"
                                :alt="item?.picture?.alt"
                                :title="item?.picture?.title"
                                class="reviews__person-img"
                                :loading="lazyImg ? 'lazy' : null"
                            />
                            <NoAvatar v-else class="reviews__person-img" />
                        </div>
                        <div class="reviews__doctor-content">
                            <div class="reviews__doctor-title">
                                {{ $t('doctors.curedByTitle') }}
                            </div>
                            <div class="reviews__person-name">
                                {{ item?.first_name }} {{ item?.last_name }}
                            </div>
                        </div>
                    </div>
                </template>
                <template v-if="data.doctors?.length > 1">
                    <div class="reviews__doctor-title reviews__doctor-title--list">
                        {{ $t('doctors.curedByTitle1') }}
                    </div>
                    <div
                        v-for="item in data.doctors"
                        :key="item.last_name"
                        class="reviews__doctor reviews__person"
                    >
                        <div class="reviews__doctor-img-wrap">
                            <AppImage
                                v-if="!isEmptyImageUrls(item?.picture?.urls)"
                                :urls="item?.picture?.urls"
                                :alt="item?.picture?.alt"
                                :title="item?.picture?.title"
                                class="reviews__person-img"
                                :loading="lazyImg ? 'lazy' : null"
                            />
                            <NoAvatar v-else class="reviews__person-img" />
                        </div>
                        <div class="reviews__person-name">
                            {{ item?.first_name }} {{ item?.last_name }}
                        </div>
                    </div>
                </template>
            </div>
        </div>
    </div>
</template>

<script setup>
import AppRating from '~/shared/ui/Info/AppRating.vue'
import AppLink from '~/shared/ui/Links/AppLink.vue'
import AppTag from '~/shared/ui/Tags/AppTag.vue'
import AppImage from '~/shared/ui/Media/AppImage.vue'
import BlockSeparator from '~/shared/ui/Separators/BlockSeparator.vue'
import { isEmptyImageUrls } from '~/shared/utils/helpers'
import NoAvatar from '~/shared/assets/images/no-user.svg'

const props = defineProps({
    data: {
        type: Object,
        required: true
    },
    isSlider: {
        type: Boolean,
        default: false
    },
    lazyImg: {
        type: Boolean,
        default: false
    }
})

const localePath = useLocalePath()

const textClasses = computed(() => [
    'reviews__text',
    {
        'reviews__text--is-slider': props.isSlider
    }
])
</script>

<style lang="scss" scoped>
.reviews {
    &__card {
        display: flex;
        flex-direction: column;
        gap: 20px;
        height: 100%;
        padding: 20px;
        background: $light;
        border: 2px solid $secondary-100;
        border-radius: 20px;

        @media (min-width: $tablet-breakpoint) {
            gap: 30px;
            padding: 30px;
        }

        @media (min-width: $desktop-breakpoint) {
            gap: 40px;
            padding: 40px;
        }

        @media (min-width: $lg-desktop-breakpoint) {
            gap: 48px;
            padding: 48px;
        }
    }

    &__text {
        font-size: 16px;
        font-style: normal;
        font-weight: 400;
        line-height: 120%;

        // @include text-line-overflowed-multiple(3);

        @media (min-width: $desktop-breakpoint) {
            font-size: 20px;
        }

        @media (min-width: $lg-desktop-breakpoint) {
            font-size: 24px;
        }

        &--is-slider {
            @include text-line-overflowed-multiple(3);
        }
    }

    &__links {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: 10px;

        @media (min-width: $tablet-breakpoint) {
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
            gap: 30px;
        }
    }

    &__tags {
        display: flex;
        flex-wrap: wrap;
        gap: 3px;

        @media (min-width: $desktop-breakpoint) {
            gap: 5px;
        }

        @media (min-width: $lg-desktop-breakpoint) {
            gap: 6px;
        }
    }

    &__people {
        display: flex;
        flex-direction: column;
        gap: 20px;

        @media (min-width: $tablet-breakpoint) {
            flex-direction: row;
            justify-content: space-between;
            gap: 30px;
        }
    }

    &__doctors {
        display: flex;
        flex-direction: column;
        gap: 4px;

        @media (min-width: $desktop-breakpoint) {
            gap: 8px;
        }

        @media (min-width: $lg-desktop-breakpoint) {
            gap: 12px;
        }
    }

    &__person {
        display: flex;
        align-items: center;
        gap: 15px;
    }

    &__doctor {
        flex-direction: row-reverse;

        @media (min-width: $desktop-breakpoint) {
            flex-direction: row;
        }
    }

    &__patient-img-wrap,
    &__doctor-img-wrap {
        width: 40px;
        height: 40px;
        overflow: hidden;
        background: $secondary-100;

        @media (min-width: $desktop-breakpoint) {
            width: 56px;
            height: 56px;
        }
    }

    &__patient-img-wrap {
        border: 2px solid $secondary-100;
        border-radius: 10px;
    }

    &__doctor-img-wrap {
        border-radius: 50%;
    }

    &__person-img :deep(img) {
        object-fit: contain;
        object-position: top center;
    }

    &__patient-date,
    &__doctor-title {
        margin-bottom: 3px;
        font-size: 14px;
        font-style: normal;
        font-weight: 400;
        line-height: 140%;
        color: $primary-300;

        @media (min-width: $desktop-breakpoint) {
            margin-bottom: 5px;
            font-size: 16px;
        }

        @media (min-width: $lg-desktop-breakpoint) {
            margin-bottom: 6px;
        }
    }

    &__doctor-title {
        &--list {
            text-align: end;

            @media (min-width: $desktop-breakpoint) {
                text-align: start;
            }
        }
    }

    &__person-name {
        font-size: 14px;
        font-style: normal;
        font-weight: 700;
        line-height: 140%;

        @media (min-width: $desktop-breakpoint) {
            font-size: 18px;
        }

        @media (min-width: $lg-desktop-breakpoint) {
            font-size: 20px;
        }
    }

    &__separator {
        margin: auto 0;
    }
}
</style>