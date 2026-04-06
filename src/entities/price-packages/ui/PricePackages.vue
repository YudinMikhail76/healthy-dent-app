<template>
    <ParagraphItemContainer
        background="#E9E8EE"
        :with-padding="false"
        class="price-packages"
        :id="`price-package-${ props.data.tid }`"
    >
        <div class="price-packages__inner">
            <h2 v-if="title" class="price-packages__title">
                {{ title }}
            </h2>
            <PricePackagesFilters
                :id="props.data.tid"
                :items="filters"
                :toggle-swiper-reinit="toggleSwiperReinit"
                @filters-changed="applyFilters"
            />
            <div v-if="hasNoFilteredData" class="price-packages__no-data">
                {{ $t('filter.noItems') }}
            </div>
            <PricePackagesSlider
                v-else
                :data="props.data"
                :items="filteredPackages"
                type="price-packages"
            />
        </div>
    </ParagraphItemContainer>
</template>

<script setup>
import ParagraphItemContainer from '~/shared/ui/Containers/ParagraphItemContainer.vue'
import PricePackagesFilters from './PricePackagesFilters.vue'
import PricePackagesSlider from './PricePackagesSlider.vue'

const props = defineProps({
    data: {
        type: Object,
        required: true
    },
    title: {
        type: String,
        required: true
    }
})

const filters = computed(() => props.data.filters.map((item) => ({ 
    ...item,
    values: item.values.map((val) => ({ 
        key: val,
        label: val
    }))
})))

const activeFilters = ref([])

const toggleSwiperReinit = ref(false)

const filteredPackages = computed(() => {
    if (activeFilters.value.length === 0) {
        return props.data.price_packages
    }

    return props.data.price_packages.filter((pkg) => {
        return activeFilters.value.every((filterGroup) => {
            // eslint-disable-next-line max-nested-callbacks
            const filterValues = activeFilters.value.filter((filter) => filter.id === filterGroup.id).map((filter) => filter.value)
            // eslint-disable-next-line max-nested-callbacks
            return filterValues.some((value) => pkg.active_filters[filterGroup.id]?.includes(value))
        })
    })
})

const hasNoFilteredData = computed(() => activeFilters.value.length > 0 && filteredPackages.value.length === 0)

const reinitSwiper = () => toggleSwiperReinit.value = !toggleSwiperReinit.value

const applyFilters = (filters) => {
    activeFilters.value = filters

    reinitSwiper()
}
</script>

<style lang="scss" scoped>
.price-packages {
    border-radius: 0;

    &__inner {
        display: flex;
        flex-direction: column;
        gap: 20px;

        @media (min-width: $tablet-breakpoint) {
            gap: 30px;
        }

        @media (min-width: $desktop-breakpoint) {
            gap: 40px;
        }

        @media (min-width: $lg-desktop-breakpoint) {
            gap: 48px;
        }
    }

    &__title {
        font-size: 24px;
        font-weight: 700;
        line-height: 120%;

        @media (min-width: $tablet-breakpoint) {
            font-size: 28px;
        }

        @media (min-width: $desktop-breakpoint) {
            font-size: 32px;
        }

        @media (min-width: $lg-desktop-breakpoint) {
            font-size: 48px;
        }
    }

    &__no-data {
        font-size: 20px;
        font-weight: 700;
        line-height: 1.5;

        @media (min-width: $desktop-breakpoint) {
            font-size: 28px;
        }
    }
}
</style>