<template>
    <div class="services-alternative-item">
        <div class="services-alternative-item__title">
            {{ data.title }}
        </div>
        <div class="services-alternative-item__services">
            <AppTag
                v-for="item in data.services"
                :key="item.title"
                :to="localePath(item.url)"
            >
                <div class="services-alternative-item__tag">
                    {{ item.title }}
                    <span v-if="item.promotion" class="services-alternative-item__promo">{{ $t('global.promo') }}</span>
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
.services-alternative-item {
    display: flex;
    flex-direction: column;
    gap: 12px;

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

    &__services {
        display: flex;
        flex-wrap: wrap;
        gap: 4px;
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

    :deep(.app-tag) {
        &:hover {
            border-color: $primary-500;
            background-color: $primary-500;
        }
    }
}
</style>