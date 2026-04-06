<template>
    <div class="facts">
        <div
            v-for="item in data.items"
            :key="item.title"
            :class="classesItem"
        >
            <div class="facts__item-content">
                <div class="facts__item-title">
                    {{ item.title }}
                </div>
                <div class="facts__item-subtitle">
                    {{ item.subtitle }}
                </div>
            </div>
            <div class="facts__item-bottom">
                <a
                    v-if="item?.link"
                    :href="localePath(item.link)"
                    class="facts__item-link"
                >
                    {{ item.link_title }}
                </a>
            </div>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    data: {
        type: Object,
        required: true
    },
    fullWidth: {
        type: Boolean,
        default: false
    }
})

const localePath = useLocalePath()

const classesItem = computed(() => [
    'facts__item',
    { 'facts__item--full-width': props.fullWidth }
])
</script>

<style lang="scss" scoped>
.facts {
    display: flex;
    flex-wrap: wrap;
    gap: 3px;
    margin: 40px 0;
    color: $dark-500;
    counter-reset: counter;

    @media (min-width: $desktop-breakpoint) {
        gap: 5px;
        margin: 80px 0;
    }

    @media (min-width: $lg-desktop-breakpoint) {
        gap: 6px;
        margin: 96px 0;
    }

    &__item {
        width: calc(50% - 1.5px);
        counter-increment: counter;
        background-color: $dark-100;
        border-radius: 7px;

        @media (min-width: $desktop-breakpoint) {
            width: calc(33.33% - 3.33px);
            border-radius: 12px;
        }

        @media (min-width: $lg-desktop-breakpoint) {
            width: calc(33.33% - 4px);
            border-radius: 15px;
        }

        &--full-width {
            width: 100%;
        }
    }

    &__item-content {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        min-height: 103px;
        padding: 10px;

        @media (min-width: $desktop-breakpoint) {
            min-height: 140px;
            padding: 20px;
        }

        @media (min-width: $lg-desktop-breakpoint) {
            min-height: 129px;
            padding: 24px;
        }
    }

    &__item-title {
        margin-bottom: 5px;
        font-size: 20px;
        font-style: normal;
        font-weight: 700;
        line-height: 120%;
        word-break: break-word;

        @media (min-width: $desktop-breakpoint) {
            font-size: 24px;
        }

        @media (min-width: $lg-desktop-breakpoint) {
            margin-bottom: 20px;
            font-size: 32px;
        }
    }

    &__item-subtitle {
        font-size: 14px;
        font-style: normal;
        font-weight: 400;
        line-height: 140%;
        word-break: break-word;
    
        @media (min-width: $desktop-breakpoint) {
            font-size: 18px;
        }

        @media (min-width: $lg-desktop-breakpoint) {
            font-size: 20px;
        }
    }

    &__item-bottom {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 10px;
        height: 45px;
        padding: 15px 10px 10px;
        background: url('./assets/background/caret-left.svg') left top no-repeat, url('./assets/background/caret-right.svg') right top no-repeat, url('./assets/background/line.svg') left 5px repeat-x;

        @media (min-width: $desktop-breakpoint) {
            height: 72px;
            padding: 30px 20px 20px;
            background-position: left top, right top, left 10px;
            background-size: 10px 20px, 10px 20px, auto;
        }

        @media (min-width: $lg-desktop-breakpoint) {
            height: 83px;
            padding: 30px 24px 24px;
            background-size: 10px 20px, 10px 20px, auto;
        }

        &::before {
            content: counter(counter, decimal-leading-zero);
            display: inline-block;
            font-size: 12px;
            font-style: normal;
            font-weight: 700;
            line-height: 140%;
            color: $dark-200;

            @media (min-width: $desktop-breakpoint) {
                font-size: 16px;
            }

            @media (min-width: $lg-desktop-breakpoint) {
                font-size: 18px;
            }
        }
    }

    &__item-link {
        font-size: 14px;
        font-style: normal;
        font-weight: 400;
        line-height: 140%;

        @media (min-width: $desktop-breakpoint) {
            font-size: 16px;
        }

        @media (min-width: $lg-desktop-breakpoint) {
            font-size: 18px;
        }
    }
}
</style>