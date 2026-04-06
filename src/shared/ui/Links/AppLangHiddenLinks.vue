<template>
    <template v-for="(value, key) in locales">
        <a
            v-if="key === 'uk' || key === 'ru'"
            :key="key"
            :href="value"
            class="lang-link is-hidden"
        >
            {{ getCorrectLabel(key) }}
        </a>
    </template>
</template>

<script setup lang="ts">
interface IProps {
    locales: {
        uk: string,
        ru: string,
        en: string,
    }
}

defineProps<IProps>()

const getCorrectLabel = (lang: 'uk' | 'ru') => {
    return {
        uk: 'UA',
        ru: 'RU'
    }[lang]
}
</script>