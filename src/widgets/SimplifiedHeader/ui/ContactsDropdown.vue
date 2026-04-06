<template>
    <div
        tabindex="0"
        class="contacts-dropdown__phone-btn-wrap"
        @click="toggleDropdown"
    >
        <button
            type="button"
            class="contacts-dropdown__phone-btn"
            :title="$t('header.contacts')"
        >
            <PhoneIcon class="contacts-dropdown__phone-icon" />
        </button>
    </div>
    <div :class="['contacts-dropdown', { 'contacts-dropdown--visible': isDropdownOpened }]">
        <NuxtLink :href="`tel:${ phoneUrl }`" class="contacts-dropdown__phone">
            {{ phone }}
        </NuxtLink>
        <div class="contacts-dropdown__messengers">
            <AppButtonSocial
                v-for="item in messengers"
                :key="item.url"
                :to="item.url"
                target="_blank"
            >
                <component :is="getSocialIconComponent(item.type)" />
            </AppButtonSocial>
        </div>
        <div v-if="telegramBot && telegramBot?.url" class="contacts-dropdown__telegram-bot">
            <span class="contacts-dropdown__telegram-bot-title">tgbot</span>
            <NuxtLink
                :href="toTelegramBotLink(telegramBot?.url)"
                class="contacts-dropdown__telegram-bot-link"
                target="_blank"
            >
                {{ telegramBot.url }}
            </NuxtLink>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useStaticDataStore } from '~/entities/root/store/static-data-store'
import AppButtonSocial from '~/shared/ui/Buttons/AppButtonSocial.vue'

import { getSocialIconComponent, toTelegramBotLink } from '~/shared/utils/socials'
import { removeSpaces } from '~/shared/utils/helpers'
import PhoneIcon from '~/shared/assets/icons/phone-icon.svg'
import type { IStaticData } from '~/shared/interfaces/staticData'

const staticData = useStaticDataStore() as IStaticData

const isDropdownOpened = ref(false)

const phone = computed(() => staticData.phones?.values[0])
const phoneUrl = computed(() => removeSpaces(phone.value))
const messengers = computed(() => staticData.messengers?.values?.filter((item) => item.type !== 'telegram_bot'))
const telegramBot = computed(() => staticData.messengers?.values?.find((item) => item.type === 'telegram_bot'))

const toggleDropdown = () => isDropdownOpened.value = !isDropdownOpened.value
const close = () => isDropdownOpened.value = false 

const handleDocumetClick = (event: MouseEvent) => {
    const target = event.target as HTMLElement

    if (!isDropdownOpened.value) {
        return
    }
    const allowedClasses = [
        'contacts-dropdown__phone-btn-wrap',
        'contacts-dropdown__messengers',
        'contacts-dropdown__phone',
        'contacts-dropdown',
        'contacts-dropdown__telegram-bot'
    ]
    const hasMatchingClass = allowedClasses.some((className) => target.classList.contains(className))

    if (!hasMatchingClass) {
        close()
    }
}

onMounted(() => {
    document.addEventListener('click', handleDocumetClick)
})

onBeforeUnmount(() => {
    document.removeEventListener('click', handleDocumetClick)
})
</script>

<style lang="scss" scoped>
.contacts-dropdown {
    position: absolute;
    top: calc(100% + 5px);
    right: 0;
    z-index: 5;
    display: none;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 15px;
    width: 209px;
    min-height: 50px;
    padding: 15px;
    cursor: initial;
    background: $light;
    border-radius: 6px;
    box-shadow: 0 3px 10px 0 rgba(145, 147, 161, .25);

    @media (min-width: $tablet-breakpoint) {
        gap: 20px;
        width: 244px;
        padding: 20px;
        border-radius: 8px;
    }

    @media (min-width: $desktop-breakpoint) {
        top: calc(100% + 8px);
        gap: 25px;
        width: 282px;
        padding: 25px;
        border-radius: 10px;
    }

    @media (min-width: $lg-desktop-breakpoint) {
        gap: 32px;
        width: 324px;
        padding: 32px;
        border-radius: 12px;
    }

    &--visible {
        display: flex;
    }

    &__phone-btn-wrap {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 48px;
        max-width: 48px;
        min-width: 48px;
        cursor: pointer;
        background-color: $primary-500;
        border-radius: 6px;
        transition: background-color $base-ui-transition;

        @media (any-hover: hover) {
            &:hover {
                background-color: $primary-400;
            }
        }

        @media (min-width: $desktop-breakpoint) {
            height: 56px;
            max-width: 56px;
            min-width: 56px;
            border-radius: 10px;
        }

        @media (min-width: $lg-desktop-breakpoint) {
            height: 72px;
            max-width: 72px;
            min-width: 72px;
            border-radius: 12px;
        }
    }

    &__phone-btn {
        display: flex;
        align-items: center;
        pointer-events: none;
        cursor: pointer;
        background: transparent;
        border: none;
    }

    &__phone {
        position: relative;
        display: block;
        font-size: 16px;
        font-style: normal;
        font-weight: 700;
        line-height: 120%;
        color: $dark-500;
        text-align: center;

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

    &__messengers {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        gap: 3px;

        @media (min-width: $tablet-breakpoint) {
            gap: 4px;
        }

        @media (min-width: $desktop-breakpoint) {
            gap: 5px;
        }

        @media (min-width: $lg-desktop-breakpoint) {
            gap: 6px;
        }
    }

    &__telegram-bot {
        display: flex;
        align-items: center;
        font-size: 14px;
        font-style: normal;
        font-weight: 400;
        line-height: 140%;

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

    &__telegram-bot-title {
        position: relative;
        display: flex;
        align-items: center;
        color: $primary-300;
        pointer-events: none;

        &::after {
            content: '';
            display: inline-block;
            width: 5px;
            height: 2px;
            margin: 0 5px;
            background-image: url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNyIgaGVpZ2h0PSIyIiB2aWV3Qm94PSIwIDAgNyAyIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8cGF0aCBpZD0iTGluZSA2MDIiIGQ9Ik0xIDFINiIgc3Ryb2tlPSIjMURCMEE5IiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPgo8L3N2Zz4K');
            background-repeat: no-repeat;
            background-size: contain;

            @media (min-width: $tablet-breakpoint) {
                width: 8px;
                margin: 0 8px;
            }

            @media (min-width: $desktop-breakpoint) {
                width: 10px;
                margin: 0 10px;
            }

            @media (min-width: $lg-desktop-breakpoint) {
                width: 12px;
                margin: 0 12px;
            }
        }
    }

    &__telegram-bot-link {
        color: $dark-500;
        white-space: nowrap;
    }

    &__phone-icon {
        display: inline-block;
        width: 16px;
        height: 16px;
        fill: $light;

        @media (min-width: $tablet-breakpoint) {
            width: 18px;
            height: 18px;
        }

        @media (min-width: $desktop-breakpoint) {
            width: 20px;
            height: 20px;
        }

        @media (min-width: $lg-desktop-breakpoint) {
            width: 22px;
            height: 22px;
        }
    }
}
</style>