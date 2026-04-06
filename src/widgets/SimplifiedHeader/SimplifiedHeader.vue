<template>
    <header :class="['simplified-header', { 'simplified-header--sticky': isSticky }]">
        <AppContainer>
            <div class="simplified-header__inner">
                <HeaderCompany disable-locale-path />
                <HeaderInfo
                    :title="staticData.address?.title"
                    :description="staticData.address?.values[0]?.phone_desc"
                />
                <div class="simplified-header__contact-btn">
                    <ContactsDropdown />
                </div>
                <LangSwitcher />
            </div>
        </AppContainer>
    </header>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import AppContainer from '~/shared/ui/Containers/AppContainer.vue'
import HeaderCompany from '~/shared/ui/Header/HeaderCompany.vue'
import HeaderInfo from '~/shared/ui/Header/HeaderInfo.vue'
import ContactsDropdown from './ui/ContactsDropdown.vue'
import { useStaticDataStore } from '~/entities/root/store/static-data-store'
import LangSwitcher from './ui/LangSwitcher.vue'
import type { IStaticData } from '~/shared/interfaces/staticData'

const staticData = useStaticDataStore() as IStaticData
const isSticky = ref(false)

function handleScroll() {
    isSticky.value = window.scrollY > 50
}

onMounted(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })
})

onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll)
})
</script>

<style lang="scss" scoped>
.simplified-header {
    position: sticky;
    top: 0;
    z-index: 100;
    padding: 20px 0 10px;
    background-color: transparent;
    transition: padding .3s ease, background-color .3s ease, box-shadow .3s ease;

    @media (min-width: $tablet-breakpoint) {
        padding: 30px 0 15px;
    }

    @media (min-width: $desktop-breakpoint) {
        padding: 40px 0 20px;
    }

    @media (min-width: $lg-desktop-breakpoint) {
        padding: 48px 0 24px;
    }

    &--sticky {
        padding: 12px 0;
        background-color: rgba(255, 255, 255, .25);
        backdrop-filter: blur(12px);
        box-shadow: 0 2px 20px rgba(0, 0, 0, .08);

        @media (min-width: $tablet-breakpoint) {
            padding: 14px 0;
        }

        @media (min-width: $desktop-breakpoint) {
            padding: 16px 0;
        }

        @media (min-width: $lg-desktop-breakpoint) {
            padding: 18px 0;
        }
    }

    &__inner {
        display: flex;
        align-items: center;
        gap: 5px;
    }

    &__contact-btn {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    &__contact-dropdown {
        background-color: $primary-500;
    }

    :deep(.header__work-time) {
        @media (min-width: $desktop-breakpoint) {
            min-width: 92px;
        }
    }
}
</style>