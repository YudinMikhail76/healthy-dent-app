<template>
    <picture v-if="hasUrls" class="app-image">
        <source
            v-if="mobileSrc"
            :srcset="mobileSrc"
            media="(max-width: 1279px)"
        >
        <source
            v-if="desktopSrc"
            :srcset="desktopSrc"
            media="(min-width: 1280px)"
        >
        <img
            :src="desktopSrc || mobileSrc || generatedUrl"
            class="app-image__img"
            :loading="loading"
            :fetchpriority="fetchPriority"
            :title="title"
            :alt="alt"
        >
    </picture>

    <img
        v-else
        :src="generatedUrl"
        class="app-image__img"
        :loading="loading"
        :fetchpriority="fetchPriority"
        :title="title"
        :alt="alt"
    >
</template>

<script setup>
import { useConfig } from '~/shared/composables/useConfig'
import noImageSrc from '~/shared/assets/images/no-image.png'

const props = defineProps({
    src: {
        type: String,
        required: false,
        default: ''
    },
    urls: {
        type: Object,
        required: false,
        default: () => ({})
    },
    fit: {
        type: String,
        default: 'cover',
        validator: (value) => ['cover', 'contain', 'fill'].includes(value)
    },
    loading: {
        type: [String, null],
        default: null,
        validator: (value) => [null, 'eager', 'lazy'].includes(value),
        required: false
    },
    preload: {
        type: Boolean,
        default: false
    },
    fetchPriority: {
        type: String,
        default: 'auto',
        validator: (value) => ['high', 'low', 'auto'].includes(value)
    },
    title: {
        type: [String, null],
        default: null
    },
    alt: {
        type: [String, null],
        default: null
    }
})

const { getFullUrl } = useConfig()

const hasUrls = computed(() => props.urls && Object.keys(props.urls).length > 0)
const desktopSrc = computed(() => props.urls?.desktop_webp || props.urls?.desktop)
const mobileSrc = computed(() => props.urls?.mobile_webp || props.urls?.mobile)

function generateUrl() {
    if (hasUrls.value && props.urls.original) return props.urls.original

    return !props?.src
        ? noImageSrc
        : props?.src?.startsWith('/')
            ? getFullUrl(props.src) : props.src
}

const generatedUrl = computed(() => generateUrl())

if (props.preload) {
    const linkTags = []

    if (hasUrls.value) {
        if (desktopSrc.value) {
            linkTags.push({
                rel: 'preload',
                as: 'image',
                href: desktopSrc.value,
                media: '(min-width: 1280px)',
                fetchpriority: props.fetchPriority
            })
        }

        if (mobileSrc.value) {
            linkTags.push({
                rel: 'preload',
                as: 'image',
                href: mobileSrc.value,
                media: '(max-width: 1279px)',
                fetchpriority: props.fetchPriority
            })
        }
    } else if (generatedUrl.value) {
        linkTags.push({
            rel: 'preload',
            as: 'image',
            href: generatedUrl.value,
            fetchpriority: props.fetchPriority
        })
    }

    useHead({
        link: linkTags
    })
}
</script>

<style lang="scss" scoped>
.image-container {
    width: 100%;
    height: 100%;
}

.app-image {
    display: block;
    width: 100%;
    height: 100%;

    &__img {
        width: 100%;
        height: 100%;
        object-fit: v-bind(fit);
    }
}
</style>