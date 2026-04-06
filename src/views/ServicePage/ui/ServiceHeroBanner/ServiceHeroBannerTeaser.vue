<template>
    <div class="service-teaser" @click="onClick">
        <div class="service-teaser__heading">
            <div v-if="title" class="service-teaser__title">
                {{ title }}
            </div>
            <div v-if="data.expire_date" class="service-teaser__date">
                {{ data.expire_date }}
            </div>
        </div>
        <div v-if="data.description" class="service-teaser__text">
            {{ data.description }}
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    data: {
        type: Object,
        required: true
    }
})

const emit = defineEmits(['on-click'])

const { t } = useI18n()

const title = computed(() => {
    if (props.data.type === 'hot_hour') {
        return t('promotion.hotHours')
    }

    if (props.data.amount) {
        return props.data.amount
    }

    return ''
})

const onClick = () => emit('on-click')
</script>

<style lang="scss" scoped>
.service-teaser {
    padding: 8px;
    cursor: pointer;
    background-color: $primary-200;
    border-radius: 6px;

    @media (min-width: $tablet-breakpoint) {
        padding: 10px;
        border-radius: 8px;
    }

    @media (min-width: $desktop-breakpoint) {
        padding: 12px;
        border-radius: 10px;
    }

    @media (min-width: $lg-desktop-breakpoint) {
        padding: 15px;
        border-radius: 12px;
    }

    &__heading {
        display: flex;
        align-items: center;
        gap: 6px;
        margin-bottom: 3px;

        @media (min-width: $tablet-breakpoint) {
            margin-bottom: 4px;
        }

        @media (min-width: $desktop-breakpoint) {
            margin-bottom: 5px;
        }

        @media (min-width: $lg-desktop-breakpoint) {
            margin-bottom: 6px;
        }
    }

    &__title {
        padding: 3px 5px;
        font-size: 14px;
        font-weight: 700;
        background-color: $light;
        border-radius: 3px;

        @media (min-width: $tablet-breakpoint) {
            font-size: 16px;
            border-radius: 4px;
        }

        @media (min-width: $desktop-breakpoint) {
            font-size: 18px;
            border-radius: 5px;
        }

        @media (min-width: $lg-desktop-breakpoint) {
            font-size: 20px;
            border-radius: 6px;
        }
    }

    &__date {
        font-size: 14px;
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

    &__text {
        font-size: 14px;
        font-weight: 700;
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
}
</style>