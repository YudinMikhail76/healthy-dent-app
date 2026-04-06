<template>
    <div class="services-problems-item">
        <div class="services-problems-item__content">
            <div class="services-problems-item__title">
                {{ data.title }}
            </div>
            <div class="services-problems-item__desc">
                {{ data.description }}
            </div>
        </div>
        <div class="services-problems-item__services">
            <AppTag
                v-for="item in data.services"
                :key="item.title"
                :to="localePath(item.url)"
                class="services-problems-item__service"
            >
                <div class="services-problems-item__tag">
                    {{ item.title }}
                    <span v-if="item.promotion" class="services-problems-item__promo">{{ $t('global.promo') }}</span>
                </div>
            </AppTag>
        </div>
    </div>
</template>

<script setup>
import AppTag from '~/shared/ui/Tags/AppTag.vue'

defineProps({
    data: {
        type: Object,
        required: true
    }
})

const localePath = useLocalePath()
</script>

<style lang="scss" scoped>
.services-problems-item {
    display: flex;
    flex-direction: column;
    gap: 20px;

    @media (min-width: $tablet-breakpoint) {
        gap: 30px;
    }

    @media (min-width: $desktop-breakpoint) {
        flex-direction: row;
        gap: 40px;
    }

    @media (min-width: $lg-desktop-breakpoint) {
        gap: 48px;
    }

    &__content {
        display: flex;
        flex-direction: column;
        gap: 10px;

        @media (min-width: $tablet-breakpoint) {
            gap: 15px;
        }

        @media (min-width: $desktop-breakpoint) {
            gap: 20px;
            width: 100%;
        }

        @media (min-width: $lg-desktop-breakpoint) {
            gap: 24px;
        }
    }

    &__title {
        font-size: 16px;
        font-style: normal;
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

    &__desc {
        font-size: 14px;
        font-style: normal;
        font-weight: 400;
        line-height: 120%;
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

    &__services {
        display: flex;
        flex-wrap: wrap;

        @media (min-width: $desktop-breakpoint) {
            width: 100%;
        }
    }

    &__service {
        height: fit-content;
    }

    &__promo {
        padding: 2px 4px;
        margin-left: 12px;
        font-size: 12px;
        font-weight: 700;
        line-height: 100%;
        background-color: $primary-200;
        border-radius: 3px;
    }
}
</style>