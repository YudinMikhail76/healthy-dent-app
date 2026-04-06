<template>
    <div class="layout-english">
        <SimplifiedHeader />
        <main>
            <slot />
        </main>
        <SimplifiedFooter />
        <Transition name="opacity">
            <AppToTopButton v-if="showToTop" />
        </Transition>
    </div>
</template>

<script setup>
import SimplifiedFooter from '~/widgets/SimplifiedFooter/SimplifiedFooter.vue'
import SimplifiedHeader from '~/widgets/SimplifiedHeader/SimplifiedHeader.vue'

const AppToTopButton = defineAsyncComponent(() => import('~/shared/ui/Buttons/AppToTopButton.vue'))

const showToTop = ref(false)

const handleScroll = () => showToTop.value = window.scrollY > 800

onMounted(() => {
    window.addEventListener('scroll', handleScroll)
})

onBeforeUnmount(() => {
    window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped lang="scss">
.layout-default {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
}
</style>