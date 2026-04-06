<template>
    <div class="layout-default">
        <DefaultHeader />
        <main>
            <slot />
        </main>
        <DefaultFooter />
        <Transition name="opacity">
            <AppToTopButton v-if="showToTop" />
        </Transition>
    </div>
</template>

<script setup>
import DefaultHeader from '~/widgets/DefaultHeader/DefaultHeader.vue'
import DefaultFooter from '~/widgets/DefaultFooter/DefaultFooter.vue'

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