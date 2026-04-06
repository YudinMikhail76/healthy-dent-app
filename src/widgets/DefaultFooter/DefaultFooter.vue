<template>
    <footer class="footer">
        <AppContainer>
            <FooterMainBlock />
            <FooterBottom />
        </AppContainer>
    </footer>
</template>

<script setup>
import AppContainer from '~/shared/ui/Containers/AppContainer.vue'
import FooterMainBlock from './ui/FooterMainBlock.vue'
import FooterBottom from './ui/FooterBottom.vue'
</script>

<style lang="scss" scoped>
.footer {
    padding-bottom: 80px;
    margin-top: auto;

    @media (min-width: $tablet-breakpoint) {
        padding-bottom: 108px;
    }

    @media (min-width: $desktop-breakpoint) {
        padding-bottom: 0;
    }

    &__logos {
        display: flex;
    }
}
</style>