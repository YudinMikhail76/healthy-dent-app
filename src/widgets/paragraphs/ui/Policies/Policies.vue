<template>
    <div class="policies">
        <div class="policies__content">
            <div class="policies__title">
                {{ data.fields.string1 }}
            </div>
            <AppLink :to="localePath(data.fields.link1?.url)" variant="primary">
                {{ data.fields.link1?.title }}
            </AppLink>
        </div>
        <div class="policies__companies">
            <div 
                v-for="(item, index) in data.fields.images" 
                :key="item.subtitle"
                class="policies__company"
            >
                <AppImage
                    :urls="item?.urls"
                    class="policies__company-img"
                    :alt="`${ item.title } ${ index + 1 }`"
                    :title="`${ item.title } ${ index + 1 }`"
                />
            </div>
        </div>
    </div>
</template>

<script setup>
import AppLink from '~/shared/ui/Links/AppLink.vue'
import AppImage from '~/shared/ui/Media/AppImage.vue'

defineProps({
    data: {
        type: Object,
        required: true
    }
})

const localePath = useLocalePath()
</script>

<style lang="scss" scoped>
.policies {
    padding: 20px;
    margin: 5px 0;
    background-color: $dark-100;
    border-radius: 15px;

    @media (min-width: $tablet-breakpoint) {
        display: flex;
        padding: 30px;
        margin: 8px 0;
        border-radius: 20px;
    }

    @media (min-width: $desktop-breakpoint) {
        display: flex;
        gap: 40px;
        padding: 40px;
        margin: 10px 0;
        border-radius: 25px;
    }

    @media (min-width: $lg-desktop-breakpoint) {
        padding: 48px;
        margin: 12px 0;
        border-radius: 30px;
    }

    &__title {
        margin-bottom: 10px;
        font-size: 20px;
        font-style: normal;
        font-weight: 700;
        line-height: 120%;

        @media (min-width: $tablet-breakpoint) {
            max-width: 285px;
        }

        @media (min-width: $desktop-breakpoint) {
            max-width: none;
            margin-bottom: 20px;
            font-size: 24px;
        }

        @media (min-width: $lg-desktop-breakpoint) {
            margin-bottom: 24px;
            font-size: 32px;
        }
    }

    &__content {
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        gap: 40px;
        margin-bottom: 20px;

        @media (min-width: $tablet-breakpoint) {
            flex-direction: column;
            width: 50%;
            margin-bottom: 0;
        }

        @media (min-width: $desktop-breakpoint) {
            gap: 0;
        }
    }

    &__companies {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        gap: 6px;
        padding: 0 23px;

        @media (min-width: $tablet-breakpoint) {
            width: 50%;
            padding: 0 28.5px;
        }

        @media (min-width: $desktop-breakpoint) {
            padding: 0;
        }
    }

    &__company {
        width: 64px;
        height: 42.667px;
        background-color: $light;
        border-radius: 12px;
        padding: 8px 0;

        @media (min-width: $tablet-breakpoint) {
            width: 72px;
            height: 48px;
            padding: 9px 0;
        }

        @media (min-width: $desktop-breakpoint) {
            width: 80px;
            height: 53.33px;
            padding: 10px 0;
        }

        @media (min-width: $lg-desktop-breakpoint) {
            width: 96px;
            height: 64px;
            padding: 12px 0;
        }
    }

    &__company-img {
        object-fit: contain;
    }
}
</style>