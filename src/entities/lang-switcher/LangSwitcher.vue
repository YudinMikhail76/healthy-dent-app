<template>
    <div class="lang-switcher">
        <AppSelect
            :items="mockSelectItems"
            :active-item="activeLocale"
            @on-select="onChangeLang"
        >
            <template #heading-icon>
                <AngleDownIcon />
            </template>
        </AppSelect>
    </div>
</template>

<script setup>
import { useRootStore } from '~/entities/root/store/root-store'
import AngleDownIcon from '@/shared/assets/icons/angle-down.svg'
import AppSelect from '~/shared/ui/Form/AppSelect.vue'

const rootStore = useRootStore()
const { locales, locale } = useI18n()
const route = useRoute()

const mockSelectItems = [
    { label: 'UA', value: 'uk' },
    { label: 'RU', value: 'ru' },
    { label: 'EN', value: 'en' }
]

const ENGLISH_PAGE = '/en/dental-clinic-kyiv'

const activeLocale = computed(() => ({ 
    value: locale.value,
    label: locales.value.find((item) => item.code === locale.value).name 
}))

const onChangeLang = (lang) => {
    if (lang.value === 'en') {
        navigateTo(rootStore.locales?.en || ENGLISH_PAGE)
    } else {
        navigateTo(getLocalizedPath(lang, route))
    }
}

function buildRuPath(path) {
    return path === '/' ? '/ru' : `/ru${ path }`
}

function getStaticLocalizedPath(lang, route) {
    const replacePath = route.fullPath === '/ru' ? '/ru' : '/ru/'
    const _defaultPath = route.fullPath.replace(replacePath, '/')

    return lang.value === 'uk' 
        ? _defaultPath 
        : buildRuPath(_defaultPath)
}

function getLocalizedPath(lang, route) {
    if (rootStore.locales.isDynamic) {
        return lang.value === 'uk' ? rootStore.locales.uk : rootStore.locales.ru
    } 
    return getStaticLocalizedPath(lang, route) 
}
</script>

<style lang="scss" scoped>
.lang-switcher {
    &__item {
        &--active {
            color: $primary-500;
        }
    }

    :deep(.select__heading) {
        height: 48px;

        @media (min-width: $desktop-breakpoint) {
            height: 56px;
        }

        @media (min-width: $lg-desktop-breakpoint) {
            height: 74px;
        }
    }

    :deep(.select__icon-container) {
        height: 48px;

        @media (min-width: $desktop-breakpoint) {
            height: 56px;
        }

        @media (min-width: $lg-desktop-breakpoint) {
            height: 74px;
        }
    }
}
</style>
