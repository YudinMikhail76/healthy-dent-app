<template>
    <div class="doctor-card">
        <div class="doctor-card__hero">
            <NuxtLink :to="localePath(data.link?.url)">
                <div class="doctor-card__hero-background">
                    <div class="doctor-card__img-wrap">
                        <AppImage
                            :urls="data?.photo?.urls"
                            class="doctor-card__img"
                            fit="contain"
                            :alt="data?.photo?.alt"
                            :title="data?.photo?.title"
                            loading="lazy"
                        />
                    </div>
                    <div class="doctor-card__hero-text" :hidden="!data?.perk">
                        {{ data?.perk }}
                    </div>
                </div>
            </NuxtLink>
        </div>
        <div class="doctor-card__content">
            <div class="doctor-card__main-content">
                <div :hidden="noOverview">
                    <NuxtLink :to="localePath(data.link?.url)" class="doctor-card__full-name">
                        {{ data?.last_name }} {{ data?.name }} {{ data?.middle_name }}
                    </NuxtLink>
                    <div class="doctor-card__description" :hidden="!data?.description">
                        {{ data?.description }}
                    </div>
                </div>
                <div class="doctor-card__experience">
                    <div class="doctor-card__experience-text">
                        {{ experience }}
                    </div>
                    <div class="doctor-card__stats">
                        <div class="doctor-card__reviews">
                            <div class="doctor-card__stat-icon">
                                <MessageIcon class="doctor-card__icon" />
                            </div>
                            {{ data.reviews.count }}
                        </div>
                        <div class="doctor-card__cases">
                            <div class="doctor-card__stat-icon">
                                <FolderIcon class="doctor-card__icon" />
                            </div>
                            {{ data.cases_count.count }}
                        </div>
                    </div>
                </div>
                <BlockSeparator class="doctor-card__separator" />
                <div class="doctor-card__inline-description">
                    {{ data?.description_list }}
                </div>
                <AppButton
                    :to="localePath(data.link?.url)"
                    class="doctor-card__link"
                >
                    {{ data.link.title }}
                </AppButton>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import AppImage from '~/shared/ui/Media/AppImage.vue'
import BlockSeparator from '~/shared/ui/Separators/BlockSeparator.vue'

import MessageIcon from '~/shared/assets/icons/message.svg'
import FolderIcon from '~/shared/assets/icons/folder.svg'
import AppButton from '~/shared/ui/Buttons/AppButton.vue'
import { getDeclination } from '~/shared/utils/helpers'
import type { IDoctor } from '../interfaces'

const props = defineProps<{ data: IDoctor }>()

const { t } = useI18n()
const localePath = useLocalePath()

const translationYears = [t('doctor.years1'), t('doctor.years2'), t('doctor.years3')]

const experience = computed(() => {
    const translate = getDeclination(props.data.experience, translationYears)

    return `${ props.data.experience } ${ translate }`
})
const noOverview = computed(() => !props.data?.description && !props.data?.name && !props.data?.last_name)
</script>

<style lang="scss" scoped>
.doctor-card {
    background-color: $light;
    border-radius: 15px;

    @media (min-width: $tablet-breakpoint) {
        display: flex;
        border-radius: 20px;
    }

    @media (min-width: $desktop-breakpoint) {
        border-radius: 25px;
    }

    @media (min-width: $lg-desktop-breakpoint) {
        border-radius: 30px;
    }

    &__hero {
        padding: 20px;

        @media (min-width: $tablet-breakpoint) {
            width: 50%;
            padding: 30px;
        }

        @media (min-width: $desktop-breakpoint) {
            padding: 40px;
        }

        @media (min-width: $lg-desktop-breakpoint) {
            padding: 48px;
        }
    }

    &__hero-background {
        position: relative;
        display: flex;
        justify-content: center;
        height: 100%;
        background-color: $dark-200;
        border-radius: 7px;

        @media (min-width: $tablet-breakpoint) {
            align-items: flex-end;
            border-radius: 10px;
        }

        @media (min-width: $desktop-breakpoint) {
            border-radius: 12px;
        }
    }

    &__hero-text {
        position: absolute;
        bottom: 10px;
        left: 10px;
        width: 43.75%;
        max-height: calc(100% - 20px);
        padding: 12px;
        overflow-y: auto;
        font-size: 14px;
        font-style: normal;
        font-weight: 700;
        line-height: 140%;
        color: $dark-500;
        word-break: break-word;
        background: rgba($light, .25);
        border-radius: 7px;
        backdrop-filter: blur(5px);

        &::-webkit-scrollbar {
            width: 0;
        }

        @media (min-width: $tablet-breakpoint) {
            bottom: 15px;
            left: 15px;
            width: 105px;
            max-height: calc(100% - 30px);
            font-size: 16px;
        }

        @media (min-width: $desktop-breakpoint) {
            bottom: 20px;
            left: 20px;
            width: 132px;
            max-height: calc(100% - 40px);
            padding: 14px;
            font-size: 18px;
        }

        @media (min-width: $lg-desktop-breakpoint) {
            bottom: 24px;
            left: 24px;
            width: 240px;
            max-height: calc(100% - 48px);
            padding: 16px;
            font-size: 20px;
        }
    }

    &__img-wrap {
        width: 240px;
        height: 240px;

        @media (min-width: $tablet-breakpoint) {
            width: 100%;
            height: 270px;
        }

        @media (min-width: $desktop-breakpoint) {
            width: 93.02%;
            height: 320px;
        }

        @media (min-width: $lg-desktop-breakpoint) {
            width: 420px;
            height: 100%;
        }
    }

    &__img {
        :deep(img) {
            object-position: bottom;
        }
    }

    &__content {
        padding: 0 20px 20px;

        @media (min-width: $tablet-breakpoint) {
            width: 50%;
            padding: 30px 30px 30px 0;
        }

        @media (min-width: $desktop-breakpoint) {
            padding: 40px 40px 40px 0;
        }

        @media (min-width: $lg-desktop-breakpoint) {
            padding: 48px 48px 48px 0;
        }
    }
    
    &__main-content {
        display: flex;
        flex-direction: column;
        gap: 20px;

        @media (min-width: $tablet-breakpoint) {
            gap: 30px;
        }

        @media (min-width: $tablet-breakpoint) {
            gap: 40px;
        }

        @media (min-width: $lg-desktop-breakpoint) {
            gap: 48px;
        }
    }

    &__full-name {
        display: inline-block;
        margin-bottom: 10px;
        font-size: 20px;
        font-style: normal;
        font-weight: 700;
        line-height: 120%;
        color: $dark-500;

        @media (min-width: $tablet-breakpoint) {
            margin-bottom: 15px;
            font-size: 22px;
        }

        @media (min-width: $desktop-breakpoint) {
            margin-bottom: 20px;
            font-size: 24px;
        }

        @media (min-width: $lg-desktop-breakpoint) {
            margin-bottom: 24px;
            font-size: 32px;
        }
    }

    &__stats {
        display: flex;
        gap: 10px;

        @media (min-width: $tablet-breakpoint) {
            gap: 15px;
        }

        @media (min-width: $desktop-breakpoint) {
            gap: 20px;
        }

        @media (min-width: $lg-desktop-breakpoint) {
            gap: 24px;
        }
    }

    &__reviews,
    &__cases {
        display: flex;
        align-items: center;
        gap: 3px;
        font-size: 14px;
        font-style: normal;
        font-weight: 400;
        line-height: 140%;
        color: $primary-300;

        @media (min-width: $tablet-breakpoint) {
            gap: 4px;
            font-size: 16px;
        }

        @media (min-width: $desktop-breakpoint) {
            gap: 5px;
            font-size: 18px;
        }

        @media (min-width: $lg-desktop-breakpoint) {
            gap: 6px;
            font-size: 20px;
        }
    }

    &__experience {
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
    }

    &__experience-text {
        margin-bottom: 10px;
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

    &__stat-icon {
        width: 18px;
        height: 18px;

        @media (min-width: $tablet-breakpoint) {
            width: 20px;
            height: 20px;
        }

        @media (min-width: $desktop-breakpoint) {
            width: 22px;
            height: 22px;
        }

        @media (min-width: $desktop-breakpoint) {
            width: 22px;
            height: 22px;
        }

        @media (min-width: $lg-desktop-breakpoint) {
            width: 24px;
            height: 24px;
        }
    }

    &__icon {
        fill: $primary-300;
    }

    &__separator {
        // margin: 24px 0;
    }

    &__description,
    &__inline-description {
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

    &__link {
        width: 50%;
        margin-left: auto;
    }
}
</style>