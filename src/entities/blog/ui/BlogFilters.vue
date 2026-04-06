<template>
    <div class="blog-filters">
        <div v-if="categoryItems?.length" class="blog-filters__item">
            <AppDropdown 
                :label="$t('blog.filters.categories')"
                :selected-count="selectedCategoriesCount"
                position="left"
                swap-on-mobile
            >
                <template #heading-icon>
                    <AngleDownIcon class="is-desktop-only" />
                    <SelectIcon class="is-desktop-hide" />
                </template>
                <template #list>
                    <template v-for="item in categoryItems" :key="item.value">
                        <div v-if="item.is_noindex" @click="forceChangeLocation(item.alias)">
                            <AppCheckbox
                                :id="item.value"
                                :is-checked="item.is_active"
                                :label="item.label"
                                :value="item.value"
                            >
                                <template #count>
                                    {{ item.count }}
                                </template>
                            </AppCheckbox>
                        </div>
                        <NuxtLink v-else :to="{ path: localePath(item.alias), force: true }">
                            <AppCheckbox
                                :id="item.value"
                                :is-checked="item.is_active"
                                :label="item.label"
                                :value="item.value"
                            >
                                <template #count>
                                    {{ item.count }}
                                </template>
                            </AppCheckbox>
                        </NuxtLink>
                    </template>
                    <div
                        v-if="categories?.reset_facet_alias && categories?.reset_facet_is_noindex"
                        class="blog-filters__reset"
                        @click="forceChangeLocation(categories?.reset_facet_alias)"
                    >
                        {{ $t('blog.filters.reset') }}
                    </div>
                    <AppLink
                        v-else-if="categories?.reset_facet_alias"
                        :to="localePath(categories?.reset_facet_alias)"
                        variant="primary"
                        class="blog-filters__reset"
                    >
                        {{ $t('blog.filters.reset') }}
                    </AppLink>
                </template>
            </AppDropdown>
        </div>
        <div v-if="problemItems?.length" class="blog-filters__item">
            <AppDropdown
                :selected-count="selectedProblemsCount"
                :label="$t('blog.filters.problems')"
                position="right"
                swap-on-mobile
            >
                <template #heading-icon>
                    <AngleDownIcon class="is-desktop-only" />
                    <SelectIcon class="is-desktop-hide" />
                </template>
                <template #list>
                    <template v-for="item in problemItems" :key="item.value">
                        <div v-if="item.is_noindex" @click="forceChangeLocation(item.alias)">
                            <AppCheckbox
                                :id="item.value"
                                :is-checked="item.is_active"
                                :label="item.label"
                                :value="item.value"
                            >
                                <template #count>
                                    {{ item.count }}
                                </template>
                            </AppCheckbox>
                        </div>
                        <NuxtLink v-else :to="localePath(item.alias)">
                            <AppCheckbox
                                :id="item.value"
                                :is-checked="item.is_active"
                                :label="item.label"
                                :value="item.value"
                            >
                                <template #count>
                                    {{ item.count }}
                                </template>
                            </AppCheckbox>
                        </NuxtLink>
                    </template>
                    <div
                        v-if="problems?.reset_facet_alias && problems?.reset_facet_is_noindex"
                        class="blog-filters__reset"
                        @click="forceChangeLocation(problems?.reset_facet_alias)"
                    >
                        {{ $t('blog.filters.reset') }}
                    </div>
                    <AppLink 
                        v-else-if="problems?.reset_facet_alias"
                        :to="localePath(problems?.reset_facet_alias)"
                        variant="primary"
                        class="blog-filters__reset"
                    >
                        {{ $t('blog.filters.reset') }}
                    </AppLink>
                </template>
            </AppDropdown>
        </div>
    </div>
</template>

<script setup>
import AppLink from '~/shared/ui/Links/AppLink.vue'
import AppCheckbox from '~/shared/ui/Form/AppCheckbox.vue'
import AppDropdown from '~/shared/ui/Dropdown/AppDropdown.vue'

import { getItemsObjectByType, transformFiltersArray } from '../utils'

import AngleDownIcon from '@/shared/assets/icons/angle-down.svg'
import SelectIcon from '@/shared/assets/icons/select-icon.svg'

const props = defineProps({
    items: {
        type: Array,
        required: true
    }
})

const FACET_TYPES = {
    CATEGORY: 'katehoriya',
    PROBLEMS: 'problemy'
}

const localePath = useLocalePath()

const categories = computed(() => getItemsObjectByType(props.items, FACET_TYPES.CATEGORY))
const problems = computed(() => getItemsObjectByType(props.items, FACET_TYPES.PROBLEMS))
const categoryItems = computed(() => transformFiltersArray(categories.value?.facet_values))
const problemItems = computed(() => transformFiltersArray(problems.value?.facet_values))

const selectedCategoriesCount = computed(
    () => categoryItems.value?.filter((item) => item.is_active)?.length
) 
const selectedProblemsCount = computed(
    () => problemItems.value?.filter((item) => item.is_active)?.length
)

const forceChangeLocation = (url) => {
    navigateTo(localePath(url))
}
</script>

<style lang="scss" scoped>
.blog-filters {
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
    
    @media (min-width: $desktop-breakpoint) {
        position: static;
        width: 50%;
        padding: 0;
        padding-bottom: 40px;
        background: none;
    }

    @media (min-width: $lg-desktop-breakpoint) {
        gap: 6px;
        padding-bottom: 48px;
    }

    &__item {
        width: 50%;

        @media (min-width: $tablet-breakpoint) {
            max-width: 33.33%;
            min-width: 220px;
        }

        @media (min-width: $desktop-breakpoint) {
            max-width: none;
            min-width: auto;
        }
    }

    &__reset {
        position: relative;
        display: inline-block;
        margin: 8px 0;
        font-family: $main-font, Arial, Helvetica, sans-serif;
        font-size: 14px;
        font-style: normal;
        font-weight: 700;
        line-height: 140%;
        cursor: pointer;
        background-color: transparent;
        border: none;
        margin-top: 40px;
        color: $primary-500;

        position: relative;
        color: $primary-500;

        @media (min-width: $tablet-breakpoint) {
            font-size: 16px;
        }

        @media (min-width: $desktop-breakpoint) {
            font-size: 18px;
        }

        @media (min-width: $lg-desktop-breakpoint) {
            font-size: 20px;
        }

        @media (any-hover: hover) {
            &:hover {
                color: $primary-600;

                &::after {
                    visibility: hidden;
                    opacity: 0;
                }
            }
        }

        &::after {
            content: '';
            position: absolute;
            bottom: -2px;
            left: 0;
            width: 100%;
            height: 1px;
            visibility: visible;
            background-color: $primary-500;
            opacity: 1;
            transition: $base-ui-transition ease;
        }
    }
}
</style>