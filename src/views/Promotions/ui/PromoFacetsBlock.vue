<template>
    <div class="facets-block">
        <div class="facets-block--desktop">
            <template v-for="facet in facets" :key="facet.id">
                <NuxtLink 
                    v-for="item in facet.facet_values"
                    :key="item.id"
                    :to="{ path: localePath(item.alias), force: true }"
                    :rel="item.is_noindex ? 'nofollow' : null"
                >
                    <AppCheckbox
                        :id="item.machine_name"
                        :is-checked="item.is_active"
                        :label="item.name"
                        :value="item.machine_name"
                    >
                        <template #count>
                            {{ item.count }}
                        </template>
                    </AppCheckbox>
                </NuxtLink>
                <AppLink
                    :to="localePath(facet.reset_facet_alias)"
                    class="facets-block__reset"
                    :rel="facet.reset_facet_is_noindex ? 'nofollow' : null"
                >
                    {{ $t('blog.filters.reset') }}
                </AppLink>
            </template>
        </div>
        <AppDropdown
            swap-on-mobile
            class="facets-block__mobile-dropdown"
            :label="$t('filter.title')"
            position="center"
            is-row-reverse
        >
            <template #heading-icon>
                <FilterIcon />
            </template>
            <template #list>
                <template v-for="facet in facets" :key="facet.id">
                    <NuxtLink 
                        v-for="item in facet.facet_values"
                        :key="item.id"
                        :to="{ path: localePath(item.alias), force: true }"
                        :rel="item.is_noindex ? 'nofollow' : null"
                    >
                        <AppCheckbox
                            :id="item.machine_name"
                            :is-checked="item.is_active"
                            :label="item.name"
                            :value="item.machine_name"
                        >
                            <template #count>
                                {{ item.count }}
                            </template>
                        </AppCheckbox>
                    </NuxtLink>
                    <AppLink
                        :to="localePath(facet.reset_facet_alias)"
                        class="facets-block__reset"
                        :rel="facet.reset_facet_is_noindex ? 'nofollow' : null"
                    >
                        {{ $t('blog.filters.reset') }}
                    </AppLink>
                </template>
            </template>
        </AppDropdown>
    </div>
</template>

<script setup>
import AppDropdown from '~/shared/ui/Dropdown/AppDropdown.vue'
import AppCheckbox from '~/shared/ui/Form/AppCheckbox.vue'
import AppLink from '~/shared/ui/Links/AppLink.vue'

import FilterIcon from '~/shared/assets/icons/filter.svg'

const props = defineProps({
    facets: {
        type: Array,
        default: () => []
    }
})

const localePath = useLocalePath()
</script>

<style lang="scss" scoped>
.facets-block {
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 5;
    display: flex;
    gap: 5px;
    width: 100%;
    padding: 20px;
    background: linear-gradient(180deg, rgba(233, 232, 238, 0) 0%, #CFCFD7 100%);

    @media (min-width: $tablet-breakpoint) {
        justify-content: space-between;
        padding: 30px;
    }

    @media (min-width: $lg-desktop-breakpoint) {
        gap: 6px;
        padding-bottom: 48px;
    }

    @media (min-width: $desktop-breakpoint) {
        position: static;
        width: 100%;
        padding: 48px 0;
        background: none;
    }

    &--desktop {
        display: none;

        @media (min-width: $desktop-breakpoint) {
            display: block;
            width: 100%;
            padding: 24px;
            background-color: $dark-100;
            border-radius: 15px;
        }
    }

    &__reset {
        margin-top: 24px;
    }

    &__mobile-dropdown {
        width: 126px;
        margin: 0 auto;

        @media (min-width: $tablet-breakpoint) {
            width: 156px;
        }

        @media (min-width: $desktop-breakpoint) {
            display: none;
        }

        :deep(.dropdown__icon-container svg) {
            stroke: $light;
            stroke-width: .01px;
            width: 20px;
            height: 20px;
            fill: $dark-500;
        }
    }
}
</style>