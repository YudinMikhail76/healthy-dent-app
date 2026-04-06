<template>
    <div id="doctorsList" class="doctors-list">
        <h2 v-if="title" class="doctors-list__title">
            {{ title }}
        </h2>
        <div class="doctors-list__items">
            <DoctorCard v-for="item in items" :key="item.name" :data="item" />
        </div>
    </div>
</template>

<script setup lang="ts">
import DoctorCard from './ui/DoctorCard.vue'
import type { IDoctor } from './interfaces'

interface IProps {
    title: string,
    items: IDoctor[],
}

defineProps<IProps>()
</script>

<style lang="scss" scoped>
.doctors-list {
    margin: 40px 0;

    @media (min-width: $tablet-breakpoint) {
        margin: 60px 0;
    }

    @media (min-width: $desktop-breakpoint) {
        margin: 80px 0;
    }

    @media (min-width: $lg-desktop-breakpoint) {
        margin: 96px 0;
    }

    &__title {
        margin-bottom: 20px;
        font-size: 24px;
        font-style: normal;
        font-weight: 700;
        line-height: 120%;

        @media (min-width: $tablet-breakpoint) {
            margin-bottom: 30px;
            font-size: 28px;
        }

        @media (min-width: $desktop-breakpoint) {
            margin-bottom: 40px;
            font-size: 32px;
        }

        @media (min-width: $desktop-breakpoint) {
            margin-bottom: 48px;
            font-size: 48px;
        }
    }

    &__items {
        display: flex;
        flex-direction: column;
        gap: 5px;

        @media (min-width: $tablet-breakpoint) {
            gap: 8px;
        }

        @media (min-width: $desktop-breakpoint) {
            gap: 10px;
        }

        @media (min-width: $lg-desktop-breakpoint) {
            gap: 12px;
        }
    }
}
</style>