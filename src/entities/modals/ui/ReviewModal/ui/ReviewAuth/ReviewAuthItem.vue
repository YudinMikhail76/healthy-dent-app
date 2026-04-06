<template>
    <NuxtLink :to="`${ data.url }?to=${ route.path }`" class="auth-social">
        <div class="auth-social__icon">
            <component :is="social.component" />
        </div>
        <div class="auth-social__title">
            {{ social.title }}
        </div>
    </NuxtLink>
</template>

<script setup>
import FacebookIcon from '~/shared/assets/icons/facebook.svg'
import GoogleIcon from '~/shared/assets/icons/google.svg'

const props = defineProps({
    data: {
        type: Object,
        required: true
    }
})

const route = useRoute()

const SOCIALS_ICONS = {
    facebook: {
        component: FacebookIcon,
        title: 'Facebook'
    },
    google: {
        component: GoogleIcon,
        title: 'Google'
    }
}
const social = computed(() => SOCIALS_ICONS[props.data.short_name])
</script>

<style lang="scss" scoped>
.auth-social {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 6px;
    width: 96px;
    height: 96px;
    cursor: pointer;
    border: 1.5px solid $dark-500;
    border-radius: 15px;
    transition: all .3s;

    @media (min-width: $tablet-breakpoint) {
        width: 126px;
        height: 126px;
        border-radius: 20px;
    }

    @media (min-width: $desktop-breakpoint) {
        width: 192px;
        height: 192px;
        border-radius: 25px;
    }

    @media (min-width: $lg-desktop-breakpoint) {
        width: 288px;
        height: 288px;
        border-radius: 30px;
    }

    @media (any-hover: hover) and (min-width: $desktop-breakpoint) {
        &:hover {
            background-color: $primary-500;
            border-color: $primary-500;

            .auth-social__title {
                color: $light;
            }

            .auth-social__icon {
                fill: $light;
            }
        }
    }

    &__icon {
        width: 32px;
        height: 32px;
        fill: $dark-500;

        @media (min-width: $tablet-breakpoint) {
            width: 36px;
            height: 36px;
        }

        @media (min-width: $desktop-breakpoint) {
            width: 40px;
            height: 40px;
        }

        @media (min-width: $lg-desktop-breakpoint) {
            width: 48px;
            height: 48px;
        }
    }

    &__title {
        font-size: 14px;
        font-weight: 700;
        line-height: 140%;
        color: $dark-500;

        @media (min-width: $tablet-breakpoint) {
            font-size: 16px;
        }

        @media (min-width: $desktop-breakpoint) {
            font-size: 18px;
        }

        @media (min-width: $lg-desktop-breakpoint) {
            font-size: 20px;
        }
    }
}
</style>