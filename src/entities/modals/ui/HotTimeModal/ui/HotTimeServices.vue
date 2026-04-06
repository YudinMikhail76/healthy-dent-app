<template>
    <div class="services">
        <div class="services__inner">
            <div class="services__heading">
                <div class="services__title">
                    {{ $t('hotTimeModal.serviceTitle') }}
                </div>
            </div>
            <div class="services__content">
                <div
                    v-for="section in groupedItems"
                    :key="section"
                    class="services__section"
                >
                    <div
                        v-for="item in section"
                        :key="item"
                        class="services__item"
                    >
                        <AppTag
                            :variant="getTagVariant(item)"
                            :disabled="isDisabled(item)"
                            class="services__tag"
                            @click="handleSelect(item)"
                        >
                            {{ item.name }}
                        </AppTag>
                    </div>
                </div>
            </div>
        </div>
        <div class="services__bottom">
            <div class="services__actions">
                <AppButton
                    class="services__btn"
                    full-width
                    :disabled="!selectedService"
                    @on-click="handleClick"
                >
                    {{ $t('hotTimeModal.nextBtn') }}
                </AppButton>
            </div>
        </div>
    </div>
</template>

<script setup>
import AppTag from '~/shared/ui/Tags/AppTag.vue'
import AppButton from '~/shared/ui/Buttons/AppButton.vue'
import { steps } from '../constants/index.js'
import { groupItemsBy } from '~/shared/utils/helpers.js'
import { storeToRefs } from 'pinia'
import { useHotTimeModalStore } from '../store/store.js'

const hotTimeModalStore = useHotTimeModalStore()
const {
    services,
    schedule,
    selectedService
} = storeToRefs(hotTimeModalStore)

const groupedItems = computed(() => groupItemsBy(services.value, 'group'))
const isDisabled = ({ tid }) => !schedule.value[tid]
const getTagVariant = ({ tid }) => selectedService.value?.tid === tid ? 'primary' : 'light'
const handleClick = () => hotTimeModalStore.SELECT_STEP(steps.DATE_TIME_PICKER)
const handleSelect = (item) => hotTimeModalStore.SELECT_SERVICE(item)
</script>

<style scoped lang="scss">
.services {
    height: 100%;

    @media (min-width: $desktop-breakpoint) {
        display: flex;
        gap: 64px;
    }

    @media (min-width: $lg-desktop-breakpoint) {
        gap: 48px;
    }

    &__inner {
        height: calc(100% - 60px);
        margin-bottom: 20px;

        @media (min-width: $tablet-breakpoint) {
            height: calc(100% - 30px - 49px);
            margin-bottom: 30px;
        }

        @media (min-width: $desktop-breakpoint) {
            display: flex;
            flex-direction: column;
            flex-grow: 1;
            gap: 80px;
            height: 100%;
            margin: 0;
        }

        @media (min-width: $lg-desktop-breakpoint) {
            gap: 96px;
        }
    }

    &__heading {
        margin-bottom: 20px;

        @media (min-width: $tablet-breakpoint) {
            margin-bottom: 30px;
        }

        @media (min-width: $desktop-breakpoint) {
            margin-bottom: auto;
        }
    }

    &__title {
        font-size: 16px;
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

    &__content {
        height: 100%;
        max-height: calc(100% - 19px - 20px);
        overflow-y: auto;

        @include hide-scrollbar;

        @media (min-width: $tablet-breakpoint) {
            height: calc(100% - 22px - 30px);
        }

        @media (min-width: $desktop-breakpoint) {
            display: flex;
            gap: 48px;
            height: max-content;
            max-height: unset;
            overflow: initial;
        }
    }

    &__section {
        @media (min-width: $mobile-breakpoint) {
            column-count: 2;
        }
        
        + .services__section {
            margin-top: 6px;

            @media (min-width: $tablet-breakpoint) {
                margin-top: 8px;
            }

            @media (min-width: $desktop-breakpoint) {
                margin-top: 0;
            }
        }
    }

    &__item {
        + .services__item {
            margin-top: 6px;

            @media (min-width: $tablet-breakpoint) {
                margin-top: 8px;
            }

            @media (min-width: $desktop-breakpoint) {
                margin-top: 10px;
            }

            @media (min-width: $lg-desktop-breakpoint) {
                margin-top: 12px;
            }
        }
    }

    &__tag {
        cursor: pointer;
    }

    &__bottom {
        display: flex;
        justify-content: flex-end;

        @media (min-width: $desktop-breakpoint) {
            align-items: flex-end;
            width: 192px;
            flex-shrink: 0;
        }

        @media (min-width: $lg-desktop-breakpoint) {
            width: 288px;
        }
    }

    &__actions {
        width: 50%;
        white-space: nowrap;
    }

    &__btn,
    &__btn:hover {
        @media (min-width: $desktop-breakpoint) {
            min-width: unset;
        }
    }
}
</style>