<template>
    <div class="promo-schedule">
        <div class="promo-schedule__list">
            <ScheduleItem
                v-for="(count, value) in items"
                :key="value"
                :count="count"
                :value="value"
            />
        </div>
    </div>
</template>

<script setup>
import ScheduleItem from '~/shared/ui/Schedule/ScheduleItem.vue'

defineProps({
    items: {
        type: Object,
        required: true
    }
})
</script>

<style lang="scss" scoped>
.promo-schedule {
    margin: 20px 0;

    @media (min-width: $tablet-breakpoint) {
        margin: 30px 0;
    }

    @media (min-width: $desktop-breakpoint) {
        margin: 40px 0;
    }

    @media (min-width: $lg-desktop-breakpoint) {
        margin: 48px 0;
    }

    &__list {
        display: flex;
        flex-wrap: wrap;
        gap: 10px 20px;

        @media (min-width: $tablet-breakpoint) {
            gap: 10px 30px;
        }

        @media (min-width: $desktop-breakpoint) {
            gap: 15px 40px;
        }

        @media (min-width: $lg-desktop-breakpoint) {
            gap: 15px 48px;
        }
    }
}
</style>