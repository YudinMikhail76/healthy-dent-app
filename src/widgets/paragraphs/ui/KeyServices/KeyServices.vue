<template>
    <div class="key-services">
        <div class="key-services__body">
            <div class="key-services__top">
                <h2 class="key-services__title">
                    {{ data.title || $t('keyServices.title') }}
                </h2>
                <AppLink :to="localePath(data.all_services_link)" variant="primary" class="key-services__link">
                    {{ $t('global.allServices') }}
                </AppLink>
            </div>
            <div class="key-services__content">
                <KeyServiceItem v-for="item in data.key_services" :key="item.link" :data="item" /> 
            </div>
            <div
                v-if="data.popular_services"
                class="key-services__footer"
            >
                <p class="key-services__footer-title">
                    {{ data.popular_services.title || $t('keyServices.popular_services_title') }}
                </p>
                <div class="key-services__footer-content">
                    <template v-for="item in data.popular_services.items">
                        <AppPickButton
                            v-if="item.link"
                            :key="item.link"
                            :to="item.link ? localePath(item.link) : null"
                        >
                            {{ item.title }}
                        </AppPickButton>
                    </template>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import AppLink from '~/shared/ui/Links/AppLink.vue'
import AppPickButton from '~/shared/ui/Buttons/AppPickButton.vue'
import KeyServiceItem from './ui/KeyServiceItem.vue'

defineProps({
    data: {
        type: Object,
        required: true
    }
})

const localePath = useLocalePath()
</script>

<style lang="scss" scoped>
.key-services {
    padding: 20px;
    margin: 40px 0;
    background-color: rgba($light, .5);
    border-radius: 30px;

    @media (min-width: $tablet-breakpoint) {
        padding: 30px;
        margin: 60px 0;
    }
    
    @media (min-width: $desktop-breakpoint) {
        padding: 40px;
        margin: 80px 0;
    }

    @media (min-width: $lg-desktop-breakpoint) {
        padding: 48px;
        margin: 96px 0;
    }

    &__body {
        display: flex;
        flex-direction: column;
        gap: 20px;

        @media (min-width: $tablet-breakpoint) {
            gap: 30px;
        }

        @media (min-width: $desktop-breakpoint) {
            gap: 40px;
        }

        @media (min-width: $lg-desktop-breakpoint) {
            gap: 48px;
        }
    }

    &__top {
        display: flex;
        align-items: center;
    }

    &__title {
        font-size: 24px;
        font-weight: 700;
        line-height: 120%;
        color: $dark-500;

        @media (min-width: $tablet-breakpoint) {
            font-size: 28px;
        }

        @media (min-width: $desktop-breakpoint) {
            font-size: 32px;
        }

        @media (min-width: $lg-desktop-breakpoint) {
            font-size: 48px;
        }
    }

    &__link {
        margin-left: auto;
    }

    &__content {
        display: flex;
        flex-direction: column;
        flex-wrap: wrap;

        @media (min-width: $tablet-breakpoint) {
            flex-direction: row;
        }
    }

    &__footer {
        display: flex;
        flex-direction: column;
        gap: 10px;

        @media (min-width: $tablet-breakpoint) {
            gap: 15px;
        }

        @media (min-width: $desktop-breakpoint) {
            gap: 20px;
        }

        @media (min-width: $lg-desktop-breakpoint) {
            gap: 24px;
        }
    }

    &__footer-title {
        font-size: 16px;
        font-weight: 700;
        line-height: 120%; 
        color: $dark-500;

        @media (min-width: $tablet-breakpoint) {
            font-size: 18px;
        }

        @media (min-width: $desktop-breakpoint) {
            font-size: 20px;
        }

        @media (min-width: $lg-desktop-breakpoint) {
            font-size: 24px;
        }
    }

    &__footer-content {
        display: flex;
        flex-wrap: wrap;
        gap: 6px;
    }
}
</style>