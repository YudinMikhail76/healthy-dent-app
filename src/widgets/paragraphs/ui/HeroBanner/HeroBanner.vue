<template>
    <section :class="heroClasses">
        <div class="hero-banner__inner">
            <div v-if="data.text" class="hero-banner__description" v-html="data.text" />
            <div class="hero-banner__main-content">
                <div class="hero-banner__title">
                    <span
                        v-for="item in data.title"
                        :key="item"
                        class="hero-banner__title-item"
                    >
                        {{ item }}
                    </span>
                </div>
                <div class="hero-banner__subtitle">
                    {{ data.subtitle }}
                </div>
            </div>
        </div>
        <div class="hero-banner__video-container">
            <AppVideo v-if="hasVideos" type="regular">
                <source v-if="webmVideo" :src="webmVideo" type="video/webm">
                <source v-if="mp4Video" :src="mp4Video" type="video/mp4">
            </AppVideo>
        </div>
    </section>
</template>

<script setup>
import AppVideo from '~/shared/ui/Media/AppVideo.vue'

const props = defineProps({
    data: {
        type: Object,
        required: true
    }
})

const heroClasses = computed(() => ['hero-banner', { 'hero-banner--basic': !!props.data.text }, { 'hero-banner--secondary': !props.data.text }])
const hasVideos = computed(() => !!props.data?.videos && Object.keys(props.data.videos)?.length)
const webmVideo = computed(() => props.data.videos?.field_media_video_file_webm)
const mp4Video = computed(() => props.data.videos?.field_media_video_file)
</script>

<style lang="scss" scoped>
.hero-banner {
    position: relative;
    display: flex;
    margin-bottom: 40px;
    color: $dark-500;
    min-height: 624px;

    @media (min-width: $tablet-breakpoint) {
        margin-bottom: 60px;
        min-height: 720px;
    }

    @media (min-width: $desktop-breakpoint) {
        margin-bottom: 80px;
        min-height: 552px;
    }

    @media (min-width: $lg-desktop-breakpoint) {
        margin-bottom: 96px;
        min-height: 720px;
    }

    &::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        z-index: 3;
        display: block;
        width: 100%;
        height: 100%;
        background: $primary-400;
        filter: opacity(.2);
        mix-blend-mode: multiply;
        border-radius: 10px;

        @media (min-width: $desktop-breakpoint) {
            border-radius: 15px;
        }
    }

    &--secondary {
        .hero-banner__inner {
            justify-content: flex-end;
        
            @media (min-width: $desktop-breakpoint) {
                padding-top: 52px;
            }

            @media (min-width: $lg-desktop-breakpoint) {
                padding-top: 60px;
            }
        }

        .hero-banner__main-content {
            margin-right: auto;
        }
    }

    &__inner {
        position: relative;
        top: 0;
        left: 0;
        z-index: 4;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        gap: 100px;
        width: 100%;
        min-height: 100%;
        padding: 20px;

        @media (min-width: $desktop-breakpoint) {
            flex-direction: row-reverse;
            align-items: flex-end;
            padding: 40px;
        }

        @media (min-width: $lg-desktop-breakpoint) {
            padding: 48px;
        }
    }

    &__title {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        width: auto;
        max-width: 450px;
        font-size: 32px;
        font-style: normal;
        font-weight: 700;
        line-height: 120%;

        @media (min-width: $desktop-breakpoint) {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            max-width: none;
            font-size: 48px;
        }

        @media (min-width: $lg-desktop-breakpoint) {
            font-size: 64px;
        }
    }

    &__title-item {
        display: inline-block;
        margin-top: -5px;
        padding: 4px 10px;
        font-size: 29px;
        background-color: $light;
        word-break: break-all;
        border-radius: 0 10px 10px 0;

        &:first-of-type {
            border-radius: 10px 10px 10px 0;
        }

        @media (min-width: $mobile-breakpoint) {
            padding: 5px 15px;
            font-size: 32px;
        }

        @media (min-width: $desktop-breakpoint) {
            padding: 12px 20px;
            margin-top: -10px;
            font-size: 48px;
        }

        @media (min-width: $lg-desktop-breakpoint) {
            padding: 12px 24px;
            margin-top: -12px;
            font-size: 64px;
        }
    }

    &__subtitle {
        max-width: 70%;
        padding: 10px 15px 15px;
        margin-top: -10px;
        font-size: 16px;
        font-style: normal;
        font-weight: 400;
        line-height: 140%;
        background-color: $light;
        border-radius: 0 10px 10px 10px;

        @media (min-width: $mobile-breakpoint) {
            width: 62.5%;
            max-width: 200px;
        }

        @media (min-width: $tablet-breakpoint) {
            max-width: 240px;
            padding: 15px 20px 20px;
            margin-top: -15px;
            border-radius: 0 15px 15px 15px;
        }

        @media (min-width: $desktop-breakpoint) {
            max-width: 320px;
            padding: 15px 24px 24px;
            font-size: 18px;
        }

        @media (min-width: $lg-desktop-breakpoint) {
            width: 480px;
            max-width: 480px;
            font-size: 20px;
        }
    }

    &__description {
        max-width: 70.55%;
        padding: 15px;
        margin-left: auto;
        background: rgba($light, .6);
        backdrop-filter: blur(20px);
        border-radius: 10px;

        @media (min-width: $mobile-breakpoint) {
            max-width: 55.55%;
        }

        @media (min-width: $tablet-breakpoint) {
            max-width: 319px;
        }
        
        @media (min-width: $desktop-breakpoint) {
            max-width: 329px;
            padding: 20px;
            border-radius: 15px;
        }

        @media (min-width: $lg-desktop-breakpoint) {
            max-width: 337px;
            padding: 25px;
        }
    }

    &__video-container {
        position: absolute;
        top: 0;
        left: 0;
        z-index: 2;
        width: 100%;
        height: 100%;
        overflow: hidden;
        border-radius: 15px;
    }
}
</style>