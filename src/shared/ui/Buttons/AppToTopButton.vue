<template>
    <button
        type="button"
        :class="['to-top-button', { 'active': showButton }]"
        @click="scrollToTop"
        aria-label="Scroll to top"
    >
        <CheveronBottom />
    </button>
</template>

<script setup>
import CheveronBottom from '@/shared/assets/icons/chevron-bottom-2.svg'

const showButton = ref(false)

const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })
</script>

<style lang="scss" scoped>
.to-top-button {
    display: none;
    position: fixed;
    right: 10px;
    bottom: 86px;
    z-index: 2;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 56px;
    height: 56px;
    background-color: $primary-binotel;
    box-shadow: 0 0 5px rgba(33, 37, 41, .18);
    border: none;

    @media (min-width: $desktop-breakpoint) {
        right: 30px;
        bottom: 30px;
        cursor: pointer;
    }

    &.active {
        display: flex;
    }

    svg {
        width: 28px;
        height: 28px;
        stroke: $primary-binotel-900;
        transform: rotate(180deg);
    }
}
</style>