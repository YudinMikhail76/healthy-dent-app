<template>
    <NuxtLink
        :to="localePath(data?.link?.url)"
        :title="data?.link?.title"
        class="case-video"
    >
        <CaseItemContainer>
            <CaseItemTitle class="case-video__title">
                {{ data.title }}
            </CaseItemTitle>
            <div class="case-video__img-wrap">
                <AppImage
                    :urls="data?.image?.urls"
                    class="case-video__img"
                    :alt="data?.image?.alt"
                    :title="data?.image?.title"
                    :loading="lazy ? 'lazy' : null"
                />
                <div v-if="data?.has_video" class="case-video__video-play">
                    <VideoPlayIcon :title="data?.link?.title" />
                </div>
            </div>
            <CaseBlockQuote :text="data.description" />
        </CaseItemContainer>
    </NuxtLink>
</template>

<script setup>
import AppImage from '~/shared/ui/Media/AppImage.vue'
import CaseItemTitle from './CaseItemTitle.vue'
import CaseItemContainer from './CaseItemContainer.vue'
import CaseBlockQuote from './CaseBlockQuote.vue'

import VideoPlayIcon from '~/entities/case-categories/assets/icons/video-play.svg'

defineProps({
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
</script>

<style lang="scss" scoped>
.case-video {
    @media (any-hover: hover) {
        &:hover {
            .case-video__title {
                color: $primary-500;
            }

            .case-video__video-play {
                background: rgba($primary-400, .5);
            }
        }
    }

    &__title {
        transition: color $base-ui-transition;
    }

    &__img-wrap {
        position: relative;
        height: 200px;
        overflow: hidden;
        border-radius: 7px;

        @media (min-width: $tablet-breakpoint) {
            border-radius: 10px;
        }

        @media (min-width: $desktop-breakpoint) {
            border-radius: 12px;
        }

        @media (min-width: $lg-desktop-breakpoint) {
            height: 336px;
            border-radius: 15px;
        }

        &::after {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            z-index: 2;
            width: 100%;
            height: 100%;
            background-color: rgba(233, 232, 238, .2);
        }
    }

    &__video-play {
        position: absolute;
        top: 50%;
        left: 50%;
        z-index: 3;
        display: flex;
        align-items: center;
        justify-content: center;
        overflow: hidden;
        background: rgba(45, 194, 187, .25);
        border-radius: 15px;
        transition: background $base-ui-transition;
        transform: translate(-50%, -50%);
        /* stylelint-disable-next-line property-no-vendor-prefix */
        -webkit-backdrop-filter: blur(5px);
        backdrop-filter: blur(5px);
    }
}
</style>