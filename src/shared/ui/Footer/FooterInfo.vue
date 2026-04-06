<template>
    <div class="footer__info">
        <div class="footer__address">
            <span class="footer__city">{{ address.city }}</span> 
            <span class="footer__dash" />
            <div class="footer__street">
                {{ address.value }}
            </div>
        </div>
        <div class="footer__contacts">
            <FooterLink :to="address.url" target="_blank">
                {{ $t('footer.route') }}
            </FooterLink>
            <FooterLink :to="`tel:${ removeSpaces(address.phone) }`">
                {{ address.phone }}
            </FooterLink>
        </div>
        <div class="footer__working-hours" v-html="workHours" />
    </div>
</template>

<script setup>
import { removeSpaces } from '~/shared/utils/helpers'

import FooterLink from './FooterLink.vue'

defineProps({
    address: {
        type: Object,
        required: true
    },
    workHours: {
        type: String,
        required: true
    }
})
</script>

<style lang="scss" scoped>
.footer {
    &__info {
        margin-bottom: 20px;

        @media (min-width: $desktop-breakpoint) {
            padding-bottom: 40px;
            margin-bottom: 40px;
            border-bottom: 1px solid rgba($light, .25);
        }

        @media (min-width: $lg-desktop-breakpoint) {
            padding-bottom: 48px;
            margin-bottom: 48px;
        }
    }

    &__address {
        display: flex;
        align-items: center;
    }

    &__contacts {
        display: flex;
        flex-wrap: wrap;
        gap: 5px;
        padding: 10px 0;

        @media (min-width: $desktop-breakpoint) {
            gap: 6px;
            padding: 20px 0;
        }

        @media (min-width: $lg-desktop-breakpoint) {
            padding: 24px 0;
        }
    }

    &__dash {
        width: 5px;
        height: 2px;
        margin: 0 5px;
        color: $primary-350;
        background-image: url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTQiIGhlaWdodD0iMiIgdmlld0JveD0iMCAwIDE0IDIiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIGlkPSJMaW5lIDYwMSIgZD0iTTEgMUgxMyIgc3Ryb2tlPSIjNTNEOUQzIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPgo8L3N2Zz4K');
        background-size: 100% 100%;
    
        @media (min-width: $desktop-breakpoint) {
            width: 10px;
            margin: 0 10px;
        }

        @media (min-width: $lg-desktop-breakpoint) {
            width: 12px;
            margin: 0 12px;
        }
    }

    &__city {
        font-size: 14px;
        font-style: normal;
        font-weight: 400;
        line-height: 140%;
        color: $dark-500;
        white-space: nowrap;

        @media (min-width: $desktop-breakpoint) {
            font-size: 18px;            
        }

        @media (min-width: $lg-desktop-breakpoint) {
            font-size: 20px;
        }
    }

    &__street {
        display: inline-block;
        font-size: 14px;
        font-style: normal;
        font-weight: 700;
        line-height: 140%;
        color: $dark-500;

        @media (min-width: $desktop-breakpoint) {
            font-size: 18px;            
        }

        @media (min-width: $lg-desktop-breakpoint) {
            font-size: 20px;
        }
    }

    &__working-hours {
        position: relative;
        display: flex;
        align-items: center;

        :deep(.light),
        :deep(.secondary) {
            font-size: 14px;
            font-style: normal;
            line-height: 140%;

            @media (min-width: $desktop-breakpoint) {
                font-size: 18px;            
            }

            @media (min-width: $lg-desktop-breakpoint) {
                font-size: 20px;
            }
        }

        :deep(.light) {
            margin-right: 5px;
            font-weight: 700;
            color: $dark-500;
        }

        :deep(.secondary) {
            font-weight: 400;
            color: $dark-500;
        }

        :deep(.dash) {
            display: flex;
            width: 5px;
            height: 2px;
            margin: 0 5px;
            background-image: url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTQiIGhlaWdodD0iMiIgdmlld0JveD0iMCAwIDE0IDIiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIGlkPSJMaW5lIDYwMSIgZD0iTTEgMUgxMyIgc3Ryb2tlPSIjNTNEOUQzIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPgo8L3N2Zz4K');
            background-size: 100% 100%;

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
}
</style>