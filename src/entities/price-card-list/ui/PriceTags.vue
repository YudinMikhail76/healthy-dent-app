<template>
    <div class="prices-implantation__tags">
        <div
            v-for="(groupList, key) in sortedGroupedItems"
            :key="key"
            class="prices-implantation__tags-group"
        >
            <AppTag
                v-for="item in groupList"
                :key="item.alias"
                class="prices-implantation__tag"
                :to="item.alias ? localePath(item.alias) : null"
            >
                {{ item.name }}
                <AppBadge v-if="Object.keys(item.promotion).length">
                    {{ getPromotion(item.promotion) }}
                </AppBadge>
            </AppTag>
        </div>
    </div>
</template>

<script setup>
import AppBadge from '~/shared/ui/Info/AppBadge.vue'
import AppTag from '~/shared/ui/Tags/AppTag.vue'
import { groupItemsBy } from '~/shared/utils/helpers'

const props = defineProps({
    items: {
        type: Array,
        default: () => []
    }
})

const { t } = useI18n()
const localePath = useLocalePath()

const getPromotion = (promotion) => {
    return promotion.type === 'discount' && promotion.amount
        ? promotion.amount 
        : t('promotion.defaultTitle')
}

const groupedItems = computed(() => groupItemsBy(props.items, 'group'))
const sortedGroupedItems = computed(() => Object.keys(groupedItems.value).sort()
    .reduce((acc, key) => {
        acc[key] = groupedItems.value[key]
        return acc
    }, {})
)
</script>

<style scoped lang="scss">
.prices-implantation {
    &__tags {
        display: flex;
        flex-direction: column;
        gap: 15px;

        @media (min-width: $desktop-breakpoint) {
            flex-direction: row;
            flex-wrap: wrap;
            gap: 20px;
        }

        @media (min-width: $lg-desktop-breakpoint) {
            gap: 24px;
        }
    }

    &__tags-group {
        flex: 1;
        display: flex;
        flex-direction: column;
    }
}
</style>