<template>
    <div :class="['price-packages-filters', { 'price-packages-filters--increase-z-index': !!openedDropdown }]">
        <AppSlider
            v-bind="options"
            class="price-packages-filters__slider"
            :toggle-reinit="toggleSwiperReinit"
        >
            <template #slide="{ item }">
                <PriceDropdownMultiselect
                    :key="item.value"
                    :dropdown-list="item.values"
                    :set-opened-dropdown="setOpenedDropdown"
                    :is-dropdown-opened="openedDropdown === item.name"
                    :title="item.name"
                >
                    <template #dropdown-item="{ data }">
                        <div
                            class="price-packages__checkbox-item"
                            @click.prevent.stop="handleSelectItem(item.id, data.key)"
                        >
                            <AppCheckbox
                                :id="data.key"
                                class="price-packages__checkbox"
                                :is-checked="isActive(item.id, data.key)"
                                :label="data.label"
                                :value="data.key"
                            />
                        </div>
                    </template>
                </PriceDropdownMultiselect>
            </template>
            <template #end-block>
                <div class="price-packages-filters__link">
                    <AppLink @on-click="resetFilters">
                        {{ $t('filter.reset') }}
                    </AppLink>
                </div>
            </template>
        </AppSlider>
    </div>
</template>

<script setup>
import AppLink from '~/shared/ui/Links/AppLink.vue'
import PriceDropdownMultiselect from './PriceDropdownMultiselect.vue'
import AppCheckbox from '~/shared/ui/Form/AppCheckbox.vue'
import AppSlider from '~/shared/ui/AppSlider/AppSlider.vue'

import { useAccordionControls } from '~/shared/composables/useAccordionControls'
import { useClickOutsideWithClasses } from '~/shared/composables/useClickOutsideWithClasses'
import { itemsClasses } from '../constants/filter-elements-classes'

const emit = defineEmits(['filtersChanged'])

const props = defineProps({
    items: {
        type: Object,
        required: true
    },
    id: {
        type: Number,
        required: true
    },
    toggleSwiperReinit: {
        type: Boolean
    }
})

const [openedDropdown, setOpenedDropdown] = useAccordionControls()

const closeDropdown = () => setOpenedDropdown('')

useClickOutsideWithClasses({
    classesToCheck: itemsClasses,
    callback: closeDropdown,
    propCheckRef: openedDropdown
})

const activeFilters = ref([])

const itemsWithValues = computed(() => props.items.filter((arr) => !!arr.values.length))

const options = computed(() => {
    return {
        data: itemsWithValues.value,
        sliderClass: `filters-slider-${ props.id }`,
        breakpoints: {
            320: {
                spaceBetween: '6px'
            }
        }
    }
})

const isActive = (id, value) => {
    return !!activeFilters.value.find((filter) => filter.id === id && filter.value === value)
}

const removeActive = (item) => {
    activeFilters.value = activeFilters.value.filter(
        (activeFilter) => !(activeFilter.id === item.id && activeFilter.value === item.value)
    )
}
const addActive = (item) => activeFilters.value = [...activeFilters.value, item]

const handleSelectItem = (id, value) => {
    const item = { id, value }

    if (isActive(id, value)) {
        removeActive(item)
    } else {
        addActive(item)
    }

    emit('filtersChanged', activeFilters.value)
}

const resetFilters = () => {
    activeFilters.value = []
    emit('filtersChanged', activeFilters.value)
}
</script>

<style lang="scss" scoped>
.price-packages-filters {
    position: relative;
    z-index: 1;
    display: flex;
    align-items: center;
    gap: 20px;

    &--increase-z-index {
        z-index: 5;
    }

    @media (min-width: $tablet-breakpoint) {
        gap: 30px;
    }

    @media (min-width: $desktop-breakpoint) {
        justify-content: space-between;
    }

    &__slider {
        :deep(.swiper-slide) {
            &:last-child {
                margin-left: auto;
            }
        }
    }

    &__select {
        display: flex;
        flex-wrap: wrap;
        gap: 3px;

        &::-webkit-scrollbar {
            display: none;
        }

        @media (min-width: $tablet-breakpoint) {
            gap: 4px;
        }

        @media (min-width: $desktop-breakpoint) {
            gap: 5px;
            overflow: initial;
        }

        @media (min-width: $lg-desktop-breakpoint) {
            gap: 6px;
        }
    }

    &__link {
        display: flex;
        align-items: center;
        height: 100%;
        flex-shrink: 0;
    }
}
</style>