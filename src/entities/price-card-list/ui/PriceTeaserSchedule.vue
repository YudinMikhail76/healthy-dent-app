<template>
    <div class="price-teaser-schedule__container">
        <div class="price-teaser-schedule__text">
            {{ $t('schedule.availableTitle') }}
        </div>
    </div>
    <div class="price-teaser-schedule__container">
        <div class="price-teaser-schedule__list">
            <ScheduleItem
                v-for="(count, value) in sheduleCounts"
                :key="value"
                :count="count"
                :value="value"
            />
        </div>
        <AppLink @on-click="handleClick">
            {{ $t('hotTimeModal.submitBtn') }}
        </AppLink>
    </div>
</template>

<script setup>
import { useActiveModalsStore } from '~/entities/active-modals/store/active-modals'
import { useModalsStore } from '~/entities/modals/store/modals-store'
import { useHotTimeModalStore } from '~/entities/modals/ui/HotTimeModal/store/store'
import ScheduleItem from '~/shared/ui/Schedule/ScheduleItem.vue'
import { MODALS_KEYS } from '~/entities/active-modals/constants/index.js'
import AppLink from '~/shared/ui/Links/AppLink.vue'
import { useRootStore } from '~/entities/root/store/root-store'
import { useStaticDataStore } from '~/entities/root/store/static-data-store'

const props = defineProps({
    data: {
        type: Object,
        required: true
    }
})

const rootStore = useRootStore()
const staticData = useStaticDataStore()
const modalsStore = useModalsStore()
const activeModalsStore = useActiveModalsStore()
const hotTimeModalStore = useHotTimeModalStore()

const sheduleCounts = computed(() => props.data?.promotion?.schedule_counts || [])

const handleClick = () => {
    if (props.data.promotion?.type === 'hot_hour') {
        const selectedMarketing = props.data?.marketing || rootStore?.pageMarketing || staticData?.defaultMarketingLead || null
        const services = props.data.promotion?.connected_services?.map((item) => ({ ...item, name: item.title })) || []

        hotTimeModalStore.SET_SERVICES(services)
        hotTimeModalStore.SET_PROMOTION(props.data?.promotion)
        hotTimeModalStore.SET_SYSTEM_NAME('services')
        hotTimeModalStore.SET_SCHEDULE(props.data?.promotion?.schedule)
        hotTimeModalStore.SET_GENERAL_PROMO(props.data.promotion?.description)
        hotTimeModalStore.SET_MARKETING(selectedMarketing)
        activeModalsStore.ADD_ACTIVE_KEYS([MODALS_KEYS.HOT_TIME])
        modalsStore.TOGGLE_HOT_TIME_MODAL()
    }
}
</script>

<style lang="scss" scoped>
.price-teaser-schedule {
    &__container {
        display: flex;
        justify-content: space-between;
        gap: 10px;
    }

    &__text {
        font-size: 14px;
        font-weight: 400;
        line-height: 140%;

        @media (min-width: $desktop-breakpoint) {
            font-size: 16px;
        }
    }
    
    &__list {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        gap: 16px;
    }
}
</style>