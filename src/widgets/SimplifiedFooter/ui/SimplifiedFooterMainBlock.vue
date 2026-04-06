<template>
    <div class="footer__main">
        <div class="footer__content">
            <div class="footer__right-col">
                <FooterInfo
                    v-if="staticData?.address"
                    :address="staticData.address?.values[0]"
                    :work-hours="staticData.workSchedule?.values[0]?.title_hours"
                />
                <p class="license">{{ t('license') }}</p>
                <FooterCaution />
            </div>
        </div>
        <div class="footer__bottom-block">
            <div class="footer__company">
                <div class="footer__company-name">
                    <LogoIconDesktop class="footer__logo is-desktop-only" />
                    <LogoIconSmall class="footer__logo is-desktop-hide" />
                </div>
                <div class="footer__company-description">
                    {{ t('global.company.description') }}
                </div>
            </div>
            <picture>
                <source media="(min-width: 1920px)" srcset="/shared/assets/images/footer/footer-image-lg-desktop.webp">
                <source media="(min-width: 1920px)" srcset="/shared/assets/images/footer/footer-image-lg-desktop.png">
                <source media="(min-width: 1280px)" srcset="/shared/assets/images/footer/footer-image-desktop.webp">
                <source media="(min-width: 1280px)" srcset="/shared/assets/images/footer/footer-image-desktop.png">
                <source media="(min-width: 320px)" srcset="/shared/assets/images/footer/footer-image-sm.webp">
                <source media="(min-width: 320px)" srcset="/shared/assets/images/footer/footer-image-sm.png">
                <img 
                    src="/shared/assets/images/footer/footer-image-sm.png"
                    loading="lazy"
                    class="footer__image"
                    alt="Footer image"
                >
            </picture>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useStaticDataStore } from '~/entities/root/store/static-data-store'
import FooterInfo from '~/shared/ui/Footer/FooterInfo.vue'

import LogoIconSmall from '~/shared/assets/icons/logo-sm.svg'
import LogoIconDesktop from '~/shared/assets/icons/logo-desktop.svg'
import type { IStaticData } from '~/shared/interfaces/staticData'
import FooterCaution from '~/widgets/DefaultFooter/ui/FooterCaution.vue'

const { t } = useI18n()
const staticData = useStaticDataStore() as IStaticData
</script>

<style lang="scss" scoped>
.footer {
    &__main {
        overflow: hidden;
        color: $dark-500;
        background-color: $primary-350;
        border-radius: 15px;

        @media (min-width: $mobile-breakpoint) {
            overflow: initial;
        }

        @media (min-width: $desktop-breakpoint) {
            display: flex;
            flex-direction: row-reverse;
            min-height: 600px;
            border-radius: 25px;
        }
    }
    
    &__content {
        padding: 20px;

        @media (min-width: $desktop-breakpoint) {
            display: flex;
            gap: 40px;
            width: 50%;
            padding: 40px 40px 40px 0;
        }

        @media (min-width: $lg-desktop-breakpoint) {
            gap: 48px;
            padding: 48px 48px 48px 0;
        }
    }

    &__right-col {
        width: 100%;

        @media (min-width: $desktop-breakpoint) {
            padding-top: 12px;
        }
    }

    &__bottom-block {
        position: relative;

        @media (min-width: $desktop-breakpoint) {
            width: 50%;
        }
    }

    &__company {
        position: relative;
        z-index: 2;
        width: 190px;
        min-height: 280px;
        padding: 20px;

        @media (min-width: $desktop-breakpoint) {
            width: 230px;
            padding: 40px;
        }

        @media (min-width: $lg-desktop-breakpoint) {
            width: 246px;
            padding: 48px;
        }
    }

    &__logo {
        fill: $dark-500;
        margin-bottom: 16px;
    }

    &__company-description {
        width: 83%;
        font-size: 14px;
        font-style: normal;
        font-weight: 400;
        line-height: 140%;
        color: $dark-500;

        @media (min-width: $desktop-breakpoint) {
            width: 100%;
            font-size: 16px;
        }
    }

    &__image {
        position: absolute;
        right: -68px;
        bottom: 0;
        width: 280px;
        height: 100%;
        object-fit: contain;
        object-position: right bottom;

        @media (min-width: $mobile-breakpoint) {
            right: 0;
        }
        
        @media (min-width: $desktop-breakpoint) {
            width: 500px;
            height: 83.333%;
            max-height: 500px;
        }

        @media (min-width: $lg-desktop-breakpoint) {
            width: 600px;
            height: 100%;
            max-height: 600px;
        }
    }
}

.license {
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 140%;
    color: $dark-500;
    margin-bottom: 20px;

    @media (min-width: $desktop-breakpoint) {
        width: 100%;
        font-size: 16px;
    }
}
</style>