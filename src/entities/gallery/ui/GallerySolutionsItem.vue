<template>
    <div class="solution">
        <div class="solution__intro">
            <div class="solution__logo">
                <AppImage 
                    :urls="data.logo?.urls"
                    :alt="data.logo?.alt"
                    :title="data.logo?.title"
                    class="solution__logo-img"
                    width="96"
                    height="48"
                />
            </div>
            <div v-if="data?.country" class="solution__country">
                <div v-if="data.country?.code" class="solution__country-flag">
                    <component :is="getFlagIcon(data.country.code)" class="solution__flag-icon" />
                </div>
                <div class="solution__country-name">
                    {{ data.country.label }}
                </div>
            </div>
        </div>
        <div class="solution__features">
            <div
                v-for="feat in data.features"
                :key="feat"
                class="solution__feature"
            >
                {{ feat }}
            </div>
        </div>
        <AppLink :to="localePath(data?.link?.url)" variant="primary">
            {{ data?.link?.title }}
        </AppLink>
    </div>
</template>

<script setup>
import AppLink from '~/shared/ui/Links/AppLink.vue'
import AppImage from '~/shared/ui/Media/AppImage.vue'
import { getFlagIcon } from '~/shared/utils/iconsHelpers'

defineProps({
    data: {
        type: Object,
        required: true
    }
})

const localePath = useLocalePath()
</script>

<style lang="scss" scoped>
.solution {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 20px;
    width: 260px;

    @media (min-width: $tablet-breakpoint) {
        gap: 30px;
    }
    
    @media (min-width: $desktop-breakpoint) {
        gap: 40px;
        width: 320px;
    }

    @media (min-width: $lg-desktop-breakpoint) {
        gap: 48px;
        width: 340px;
    }

    &__logo {
        margin-bottom: 5px;

        @media (min-width: $tablet-breakpoint) {
            width: 128px;
            height: 64px;
            margin-bottom: 8px;
        }

        @media (min-width: $desktop-breakpoint) {
            width: 160px;
            height: 80px;
            margin-bottom: 10px;
        }

        @media (min-width: $lg-desktop-breakpoint) {
            width: 192px;
            height: 96px;
            margin-bottom: 12px;
        }
    }

    &__logo-img {
        object-fit: contain;
    }

    &__features {
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

    &__feature {
        padding: 5px;
        border-radius: 6px;

        @media (min-width: $tablet-breakpoint) {
            padding: 8px;
            border-radius: 8px;
        }
        
        @media (min-width: $desktop-breakpoint) {
            padding: 10px;
            border-radius: 10px;
        }

        @media (min-width: $lg-desktop-breakpoint) {
            padding: 12px;
            border-radius: 12px;
        }

        &:nth-child(even) {
            background-color: $dark-100;
        }
    }
    
    &__country {
        display: flex;
        align-items: center;
        gap: 12px;

        &-flag {
            width: 22.5px;
            height: 18px;
            overflow: hidden;
            border-radius: 5px;

            @media (min-width: $desktop-breakpoint) {
                width: 27.5px;
                height: 22px;
            }

            @media (min-width: $lg-desktop-breakpoint) {
                width: 30px;
                height: 24px;
            }

            :deep(svg) {
                width: 100%;
                height: 100%;
            }
        }
    }

    &__country-name {
        font-size: 14px;
        font-style: normal;
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