<template>
    <ul
        class="breadcrumbs"
        itemscope
        itemtype="http://schema.org/BreadcrumbList"
    >
        <li
            class="breadcrumbs__item"
            itemprop="itemListElement"
            itemtype="https://schema.org/ListItem"
            itemscope
        >
            <NuxtLink
                :to="localePath('/')"
                class="breadcrumbs__link"
                itemprop="item"
            >
                <span class="breadcrumbs__icon">
                    <HomeIcon class="breadcrumbs__icon-home" />
                </span>
            </NuxtLink>
            <span hidden itemprop="name">Healthy Dent</span>
            <meta itemprop="position" content="1">
        </li>
        <li
            v-for="(item, index) in breadcrumbs"
            :key="index"
            class="breadcrumbs__item"
            itemprop="itemListElement"
            itemtype="https://schema.org/ListItem"
            itemscope
        >
            <span 
                v-if="isItemDisabled(item.alias)" 
                class="breadcrumbs__link breadcrumbs__link--disabled"
            >
                {{ item.title }}
            </span>
            <NuxtLink
                v-else
                :key="item.alias"
                :to="localePath(item.alias)"
                class="breadcrumbs__link"
                itemprop="item"
            >
                {{ item.title }}
            </NuxtLink>
            <template v-if="isItemLast(index)">
                <span class="breadcrumbs__icon breadcrumbs__icon-down">
                    <ChevronBottom />
                </span>
            </template>
            <span hidden itemprop="name">{{ item.title }}</span>
            <meta itemprop="position" :content="index + 2">
        </li>
    </ul>
</template>

<script setup>
import HomeIcon from '@/shared/assets/icons/breadcrumb-home.svg'
import ChevronBottom from '@/shared/assets/icons/angle-down.svg'

const props = defineProps({
    breadcrumbs: {
        type: Array,
        required: true
    }
})

const localePath = useLocalePath()
const config = useRuntimeConfig()
const route = useRoute()

const isItemDisabled = (url) => !url
const isItemLast = (index) => props.breadcrumbs.length === index + 1

const breadcrumbJsonLd = computed(() => {
    const siteUrl = config.public.SITE_URL
    const items = [
        {
            '@type': 'ListItem',
            position: 1,
            name: 'Healthy Dent',
            item: siteUrl + localePath('/')
        }
    ]

    props.breadcrumbs.forEach((crumb, index) => {
        items.push({
            '@type': 'ListItem',
            position: index + 2,
            name: crumb.title,
            ...(crumb.alias ? { item: siteUrl + localePath(crumb.alias) } : {})
        })
    })

    return JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: items
    })
})

useHead({
    script: [
        {
            type: 'application/ld+json',
            children: breadcrumbJsonLd
        }
    ]
})
</script>

<style scoped lang="scss">
.breadcrumbs {
    display: flex;
    align-items: center;

    &__item {
        display: flex;
        align-items: center;
        font-size: 14px;
        font-style: normal;
        font-weight: 700;
        line-height: 140%;
    }

    &__icon {
        display: flex;
        align-content: center;

        :deep(svg) {
            width: 20px;
            height: 20px;
            vertical-align: top;
            transition: stroke $base-ui-transition;
        }
    }

    &__link {
        display: block;
        padding: 6px;
        color: $primary-300;
        transition: color $base-ui-transition, background-color $base-ui-transition;

        @media (min-width: $desktop-breakpoint) {
            padding: 8px;
            border-radius: 10px;
        }

        @media (any-hover: hover) {
            &:hover {
                color: $primary-500;
                background-color: $light;

                .breadcrumbs__icon:deep(svg) {
                    stroke: $primary-500;
                }
            }
        }

        &--disabled {
            pointer-events: none;
        }
    }

    &__icon-home {
        stroke: $dark-300;
    }

    &__icon-down {
        padding: 6px;

        @media (min-width: $desktop-breakpoint) {
            padding: 8px;
        }

        :deep(svg) {
            stroke: $dark-200;
        }
    }
}
</style>
