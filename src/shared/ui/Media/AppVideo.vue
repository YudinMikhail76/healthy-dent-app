<template>
    <div ref="videoContainer" class="app-video">
        <video
            v-if="type === 'regular'"
            ref="videoEl"
            class="app-video__video"
            playsinline
            loop
            muted
            preload="none"
        >
            <template v-if="isVisible">
                <slot />
            </template>
        </video>
        <iframe
            v-else-if="src"
            :src="getYoutubeUrl(src)"
            class="app-video__video"
            loading="lazy"
        />
    </div>
</template>

<script setup>
const videoContainer = ref(null)
const videoEl = ref(null)
const isVisible = ref(false)

const props = defineProps({
    type: {
        type: String,
        required: false,
        default: 'regular',
        validator: (value) => ['regular', 'youtube'].includes(value)
    },
    src: {
        type: String,
        required: false,
        default: ''
    }
})

onMounted(() => {
    if (!videoContainer.value || props.type !== 'regular') return

    const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
            isVisible.value = true
            nextTick(() => {
                videoEl.value?.load()
                videoEl.value?.play().catch(() => {})
            })
            observer.disconnect()
        }
    }, { rootMargin: '200px' })

    observer.observe(videoContainer.value)
})

function getYoutubeUrl(url) {
    const isYoutubeShorts = url.includes('/shorts/')
    const youTubeBase = 'https://www.youtube.com/embed/'
    const id = isYoutubeShorts ? getYouTubeShortsID(url) : url.split('?v=')[1]
    const params = `?controls=0&autoplay=1&loop=1&mute=1&loop=1&playlist=${ id }`

    return youTubeBase + id + params
}

function getYouTubeShortsID(url) {
    const shortsRegexp = /youtube\.com\/shorts\/([a-zA-Z0-9_-]+)/
    const match = url.match(shortsRegexp)

    return match ? match[1] : null
}
</script>

<style lang="scss" scoped>
.app-video {
    width: 100%;
    height: 100%;
    pointer-events: none;

    video, iframe {
        width: 100%;
        height: 100%;
        vertical-align: top;
        object-fit: cover;
    }
}
</style>