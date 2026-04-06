<template>
    <div class="app-video">
        <video
            v-if="type === 'regular'"
            class="app-video__video"
            autoplay 
            playsinline 
            loop
            muted
        >
            <slot />
        </video>
        <iframe 
            v-else-if="src" 
            :src="getYoutubeUrl(src)" 
            class="app-video__video" 
        />
    </div>
</template>

<script setup>
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