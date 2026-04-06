<template>
    <NuxtLink :to="localePath(item.alias)" class="special-item">
        <div class="special-item__content">
            <div class="special-item__col special-item__intro">
                <div>
                    <div class="special-item__topic-label">
                        Спецтема
                    </div>
                    <div class="special-item__read-time">
                        ~ {{ item.reading_time }} {{ $t('blog.readingTime') }}
                    </div>
                    <div class="special-item__date">
                        <time :datetime="createdFormatted" pubdate>{{ createdHumanized }}</time>
                    </div>
                </div>
                <div>
                    <div class="special-item__title">
                        {{ item.title }}
                    </div>
                    <BlogItemTags :characteristics="item.characteristics" />
                </div>
            </div>
            <div class="special-item__col special-item__description">
                <div class="special-item__overview-container">
                    <div class="special-item__overview" v-html="item.subtitle" />
                </div>
                <div class="special-item__author">
                    <div class="special-item__author-content">
                        <div class="special-item__author-name">
                            {{ item.author?.name }}
                        </div>
                        <div class="special-item__author-position">
                            {{ item.author?.short_description }}
                        </div>
                    </div>
                    <BlogItemAvatar :urls="item.author.photo.urls" />
                </div>
            </div>
        </div>
        <AppImage 
            v-if="hasImage" 
            :urls="item.image.urls"
            class="special-item__image"
            :title="item.image.alt"
            :alt="item.image.alt"
            :loading="lazyImg ? 'lazy' : null"
        />
    </NuxtLink>
</template>

<script setup>
import AppImage from '~/shared/ui/Media/AppImage.vue'
import BlogItemTags from './BlogItemTags.vue'
import BlogItemAvatar from './BlogItemAvatar.vue'

const props = defineProps({
    item: {
        type: Object,
        required: true
    },
    lazyImg: {
        type: Boolean,
        default: false
    }
})
const localePath = useLocalePath()

const hasImage = computed(() => props.item?.image && !!Object.keys(props.item.image)?.length)
const createdFormatted = computed(() => {
    return new Date(props.item.created * 1000).toISOString()
})

const createdHumanized = computed(() => {
    const date = new Date(props.item.created * 1000)
    const day = String(date.getDate()).padStart(2, '0')
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const year = date.getFullYear()
    return `${ day }.${ month }.${ year }`
})
</script>

<style lang="scss" scoped>
.special-item {
    position: relative;
    z-index: 1;
    width: 100%;
    min-height: 512px;
    overflow: hidden;
    color: $light;
    border: 3px solid $secondary-100;
    border-radius: 10px;

    @media (min-width: $desktop-breakpoint) {
        width: 50%;
        border-radius: 12px;
    }
    
    @media (min-width: $lg-desktop-breakpoint) {
        min-height: 640px;
        border-radius: 15px;
    }

    &__content {
        position: relative;
        z-index: 2;
        display: flex;
        flex-direction: column;
        height: 100%;
        background-color: rgba(73, 74, 82, .5);

        @media (min-width: $tablet-breakpoint) {
            flex-direction: row;
        }
    }

    &__col {
        display: flex;
        flex-direction: column;
        flex-grow: 1;
        justify-content: space-between;
        gap: 42px;
        padding: 20px;

        @media (min-width: $tablet-breakpoint) {
            width: 50%;
        }
    }

    &__intro {
        @media (min-width: $tablet-breakpoint) {
            padding: 30px 0 30px 30px;
        }

        @media (min-width: $desktop-breakpoint) {
            padding: 40px 0 40px 40px;
        }
    }

    &__description {
        padding: 30px 30px 30px 15px;

        @media (min-width: $desktop-breakpoint) {
            padding: 40px 40px 40px 0;
        }
    }

    &__topic-label {
        margin-bottom: 5px;
        font-size: 14px;
        font-style: normal;
        font-weight: 700;
        line-height: 140%;
        text-transform: uppercase;

        @media (min-width: $desktop-breakpoint) {
            margin-bottom: 10px;
            font-size: 16px;
        }

        @media (min-width: $lg-desktop-breakpoint) {
            margin-bottom: 12px;
        }
    }

    &__read-time {
        margin-bottom: 5px;
        font-size: 14px;
        font-style: normal;
        font-weight: 400;
        line-height: 140%;
        color: $light;

        @media (min-width: $desktop-breakpoint) {
            margin-bottom: 10px;
            font-size: 16px;
        }

        @media (min-width: $lg-desktop-breakpoint) {
            margin-bottom: 12px;
        }
    }

    &__title {
        margin-bottom: 20px;
        font-size: 20px;
        font-style: normal;
        font-weight: 700;
        line-height: 120%;

        @media (min-width: $desktop-breakpoint) {
            margin-bottom: 40px;
            font-size: 24px;
        }

        @media (min-width: $lg-desktop-breakpoint) {
            margin-bottom: 48px;
            font-size: 32px;
        }
    }

    &__overview-container {
        padding: 15px;
        background: rgba(207, 207, 215, .3);
        backdrop-filter: blur(7.5px);
        border-radius: 7px;

        @media (min-width: $tablet-breakpoint) {
            padding: 20px;
        }

        @media (min-width: $desktop-breakpoint) {
            border-radius: 12px;
        }

        @media (min-width: $lg-desktop-breakpoint) {
            padding: 24px;
            border-radius: 15px;
        }
    }

    &__overview {
        font-size: 14px;
        font-style: normal;
        font-weight: 700;
        line-height: 140%;

        @include text-line-overflowed-multiple(6);
    }

    &__author {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        gap: 20px;
        text-align: right;
    }

    &__author-name {
        margin-bottom: 4px;
        font-weight: 700;
    }

    &__author-name,
    &__author-position {
        font-size: 14px;
        font-style: normal;
        line-height: 140%;

        @media (min-width: $desktop-breakpoint) {
            font-size: 18px;
        }

        @media (min-width: $lg-desktop-breakpoint) {
            font-size: 20px;
        }
    }

    &__author-position {
        font-weight: 400;
    }

    &__image {
        position: absolute;
        top: 0;
        left: 0;
        z-index: 1;
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    &__date {
        margin-bottom: 5px;
        font-size: 14px;
        font-weight: 400;
        line-height: 1.4;
        color: $light;

        @media (min-width: $desktop-breakpoint) {
            margin-bottom: 10px;
            font-size: 16px;
        }

        @media (min-width: $lg-desktop-breakpoint) {
            margin-bottom: 12px;
        }
    }
}
</style>