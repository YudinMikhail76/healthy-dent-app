<template>
    <div class="page-navigation">
        <AppDropdown
            swap-on-mobile
            class="page-navigation__dropdown"
            :label="$t('global.navigation')"
            position="center"
        >
            <template #heading-icon>
                <NavigationIcon />
            </template>
            <template #list>
                <PageNavigationItem 
                    v-for="item in items"
                    :key="item.page_menu_name"
                    :item="{ title: item.page_menu_name, id: item.id }"
                    :is-active="activeItem == item.id"
                    @on-click="handleClick(item.id)"
                >
                    {{ item.page_menu_name }}
                </PageNavigationItem>
            </template>
        </AppDropdown>
        <div class="page-navigation__sidebar">
            <PageNavigationItem 
                v-for="item in items"
                :key="item.page_menu_name"
                :item="{ title: item.page_menu_name, id: item.id }"
                :is-active="activeItem == item.id"
                @on-click="handleClick(item.id)"
            >
                {{ item.page_menu_name }}
            </PageNavigationItem>
        </div>
    </div>
</template>

<script setup>
import AppDropdown from '~/shared/ui/Dropdown/AppDropdown.vue'
import PageNavigationItem from './PageNavigationItem.vue'
import NavigationIcon from '~/shared/assets/icons/navigation.svg'

let observer = null

const props = defineProps({
    items: {
        type: Array,
        default: () => []
    }
})

const activeItem = ref(null)

const setActive = (id) => activeItem.value = id

const scrollToSection = (id) => {
    if (!id) return

    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}

const handleClick = (id) => {
    scrollToSection(id)
}

const observeSections = () => {
    const options = {
        root: null,
        rootMargin: '0px 0px -50% 0px',
        threshold: 0.1
    }

    observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                setActive(entry.target.id)
            }
        })
    }, options)

    props.items.forEach((item) => {
        const section = document.getElementById(item.id)
        if (section) {
            observer.observe(section)
        }
    })
}

const unsubscribeObserver = () => {
    if (observer) {
        observer.disconnect()
        observer = null
    }
}

onMounted(() => {
    observeSections()
})

onBeforeUnmount(() => {
    unsubscribeObserver()
})
</script>

<style scoped lang="scss">
.page-navigation {
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 5;
    width: 100%;
    padding: 20px;
    background-image: linear-gradient(180deg, transparent 0%, #CFCFD7 100%);

    @media (min-width: $tablet-breakpoint) {
        padding: 30px;
    }

    @media (min-width: $desktop-breakpoint) {
        position: static;
        padding: 0;
        background-image: none;
    }

    &__dropdown {
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

    &__sidebar {
        display: none;

        @media (min-width: $desktop-breakpoint) {
            display: block;
            padding: 40px 0;
        }

        @media (min-width: $lg-desktop-breakpoint) {
            padding: 48px 0;
        }
    }
}
</style>