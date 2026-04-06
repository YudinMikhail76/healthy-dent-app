<template>
    <div class="contacts-map">
        <ClientOnly>
            <GMapMap
                :center="coordinates"
                :zoom="options.zoom"
                :options="options.root"
            >
                <GMapMarker
                    :position="coordinates"
                    :icon="options.marker"
                    :draggable="false"
                    clickable
                />
            </GMapMap>
        </ClientOnly>
    </div>
</template>

<script setup>
import VueGoogleMaps from '@fawmi/vue-google-maps'
import { options } from '../utils/google-map'
import { useNuxtApp } from '#app'

import { useStaticDataStore } from '~/entities/root/store/static-data-store'

const nuxtApp = useNuxtApp()

const staticDataStore = useStaticDataStore()
const { address } = toRefs(staticDataStore)

nuxtApp.vueApp.use(VueGoogleMaps, {
    load: {
        key: 'AIzaSyC6uEcKxKdmbeAlveWouhu58TYhJepHOkg'
    }
})

const coordinates = computed(() => ({
    lat: Number(address.value.values[0].map_lat),
    lng: Number(address.value.values[0].map_lng)
}))
</script>

<style lang="scss" scoped>
.contacts-map {
    position: relative;
    width: 100% !important;
    height: 100% !important;
}

.vue-map-container {
    width: 100%;
    height: 100%;
}
</style>