<template>
    <footer class="simplified-footer">
        <AppContainer>
            <SimplifiedFooterMainBlock />
            <FooterBottom />
        </AppContainer>
    </footer>
</template>

<script setup>
import AppContainer from '~/shared/ui/Containers/AppContainer.vue'
import FooterBottom from '~/shared/ui/Footer/FooterBottom.vue'
import SimplifiedFooterMainBlock from './ui/SimplifiedFooterMainBlock.vue'
</script>

<style lang="scss" scoped>
.simplified-footer {
    padding-bottom: 80px;
    margin-top: auto;

    @media (min-width: $tablet-breakpoint) {
        padding-bottom: 108px;
    }

    @media (min-width: $desktop-breakpoint) {
        padding-bottom: 0;
    }
}
</style>