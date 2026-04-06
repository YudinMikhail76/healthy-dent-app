<template>
    <div class="related-services">
        <AppDynamicBlockContainer background="#ffffff80">
            <template #heading>
                {{ title || $t('connectedServices') }}
            </template>
            <template #content>
                <div class="related-services__list">
                    <AppTag
                        v-for="item in data"
                        :key="item.tid"
                        :to="localePath(item.alias)"
                    >
                        {{ item.label }}
                    </AppTag>
                </div>
            </template>
        </AppDynamicBlockContainer>
    </div>
</template>

<script setup>
import AppDynamicBlockContainer from '~/shared/ui/Containers/AppDynamicBlockContainer.vue'
import AppTag from '~/shared/ui/Tags/AppTag.vue'

defineProps({
    data: {
        type: Object,
        required: true
    },
    title: {
        type: String,
        required: false
    }
})

const localePath = useLocalePath()
</script>

<style lang="scss" scoped>
.related-services {
    &__list {
        display: flex;
        flex-wrap: wrap;
        gap: 6px;
    }
}
</style>