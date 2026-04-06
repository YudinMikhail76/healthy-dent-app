<template>
    <div class="contacts-bottom">
        <div class="contacts-bottom__img">
            <img
                :src="data?.main_image?.url"
                loading="lazy"
                :title="data?.main_image?.title"
                :alt="data?.main_image?.alt"
            >
            <div class="contacts-bottom__triangle" />
        </div>
        <div class="contacts-bottom__content">
            <div class="contacts-bottom__heading">
                {{ title }}
            </div>
            <div class="contacts-bottom__block">
                <div
                    v-for="item in data?.items"
                    :key="item.icon"
                    class="contacts-bottom__item"
                >
                    <div class="contacts-bottom__item-img">
                        <img
                            :src="item.icon"
                            loading="lazy"
                            title="metro icon"
                            alt="metro icon"
                        >
                    </div>
                    <div class="contacts-bottom__info">
                        <div class="contacts-bottom__text contacts-bottom__text--bold">
                            {{ setTitle(item.title) }}
                        </div>
                        <div class="contacts-bottom__text">
                            {{ setTitle(item.subtitle) }}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useContactsPageStore } from '~/views/ContactsPage/store/contacts-store'

const contactsPageStore = useContactsPageStore()
const { contactsPageData } = toRefs(contactsPageStore)

const { locale } = useI18n()

const data = computed(() => contactsPageData.value?.dynamic_data?.paragraphs.find((item) => item.id === 936)?.json_code)
const title = computed(() => locale.value === 'uk' ? data.value?.title?.uk : data.value?.title?.ru)

const setTitle = (payload) => {
    return locale.value === 'uk' ? payload?.uk : payload?.ru
}
</script>

<style lang="scss" scoped>
.contacts-bottom {
    margin: 40px 0;
    background: $light;
    border-radius: 15px;

    @media (min-width: $tablet-breakpoint) {
        margin: 60px 0;
        border-radius: 20px;
    }

    @media (min-width: $desktop-breakpoint) {
        display: flex;
        margin: 80px 0;
        border-radius: 25px;
    }

    @media (min-width: $lg-desktop-breakpoint) {
        margin: 96px 0;
        border-radius: 30px;
    }

    &__img {
        position: relative;
        height: 250px;
        padding: 20px;

        @media (min-width: $tablet-breakpoint) {
            height: 275px;
            padding: 30px;
        }

        @media (min-width: $desktop-breakpoint) {
            width: 100%;
            height: 345px;
            padding: 40px;
        }

        @media (min-width: $lg-desktop-breakpoint) {
            height: 412px;
            padding: 48px;
        }

        img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            overflow: hidden;
            border-radius: 7px;

            @media (min-width: $tablet-breakpoint) {
                border-radius: 10px;
            }

            @media (min-width: $desktop-breakpoint) {
                border-radius: 12px;
            }

            @media (min-width: $lg-desktop-breakpoint) {
                border-radius: 15px;
            }
        }
    }

    &__triangle {
        position: absolute;
        bottom: 20px;
        left: 50%;
        width: 0;
        height: 0;
        border-right: 20px solid transparent;
        border-bottom: 20px solid $light;
        border-left: 20px solid transparent;
        transform: translateX(-50%);

        @media (min-width: $tablet-breakpoint) {
            bottom: 30px;
        }

        @media (min-width: $desktop-breakpoint) {
            right: 40px;
            bottom: 50%;
            left: auto;
            border-top: 24px solid transparent;
            border-right: 24px solid $light;
            border-bottom: 24px solid transparent;
            transform: translateY(50%);
        }

        @media (min-width: $lg-desktop-breakpoint) {
            right: 48px;
        }
    }

    &__content {
        display: flex;
        flex-direction: column;
        gap: 20px;
        padding: 0 20px 20px;

        @media (min-width: $tablet-breakpoint) {
            gap: 30px;
            padding: 0 30px 30px;
        }

        @media (min-width: $desktop-breakpoint) {
            justify-content: space-between;
            gap: 40px;
            width: 100%;
            padding: 40px;
        }

        @media (min-width: $lg-desktop-breakpoint) {
            gap: 48px;
            padding: 48px;
        }
    }

    &__heading {
        font-size: 20px;
        font-weight: 700;
        line-height: 120%;
        text-align: center;

        @media (min-width: $tablet-breakpoint) {
            font-size: 22px;
        }

        @media (min-width: $desktop-breakpoint) {
            font-size: 24px;
            text-align: left;
        }

        @media (min-width: $lg-desktop-breakpoint) {
            font-size: 32px;
        }
    }

    &__block {
        display: flex;
        gap: 20px;

        @media (min-width: $tablet-breakpoint) {
            gap: 0;
        }

        @media (min-width: $desktop-breakpoint) {
            gap: 40px;
        }

        @media (min-width: $lg-desktop-breakpoint) {
            gap: 48px;
        }
    }

    &__item {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 10px;
        width: 100%;

        @media (min-width: $tablet-breakpoint) {
            gap: 15px;
        }

        @media (min-width: $desktop-breakpoint) {
            align-items: flex-start;
            gap: 20px;
        }

        @media (min-width: $lg-desktop-breakpoint) {
            gap: 24px;
        }
    }

    &__item-img {
        width: 48px;
        height: 48px;
        overflow: hidden;
        border-radius: 15px;

        @media (min-width: $tablet-breakpoint) {
            width: 56px;
            height: 56px;
        }

        @media (min-width: $desktop-breakpoint) {
            width: 72px;
            height: 72px;
        }

        @media (min-width: $lg-desktop-breakpoint) {
            width: 96px;
            height: 96px;
        }

        img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            overflow: hidden;
        }
    }

    &__info {
        display: flex;
        flex-direction: column;
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

    &__text {
        font-size: 14px;
        font-weight: 400;
        line-height: 140%;
        text-align: center;

        @media (min-width: $tablet-breakpoint) {
            font-size: 16px;
        }

        @media (min-width: $desktop-breakpoint) {
            font-size: 18px;
            text-align: left;
        }

        @media (min-width: $lg-desktop-breakpoint) {
            font-size: 20px;
        }

        &--bold {
            font-weight: 700;
        }
    }
}
</style>