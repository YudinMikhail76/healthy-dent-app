<template>
    <div class="review-auth">
        <div class="review-auth__socials">
            <ReviewAuthItem
                v-for="item in socialAuth"
                :key="item.id"
                :data="item"
                @click="onClick"
            />
        </div>
        <div class="review-auth__privacy">
            <div class="review-auth__privacy-wrapper">
                {{ $t('reviewModal.authInfo') }}
                <NuxtLink :to="localePath('/privacy')">
                    {{ $t('reviewModal.privacy') }}
                </NuxtLink>
            </div>
        </div>
    </div>
</template>

<script setup>
import ReviewAuthItem from './ReviewAuthItem.vue'
import { useStaticDataStore } from '~/entities/root/store/static-data-store'
import { useReviewModalStore } from '~/entities/modals/ui/ReviewModal/store/review-modal-store'
import { STEPS } from '~/entities/modals/ui/ReviewModal/utils/variables'

const staticDataStore = useStaticDataStore()
const reviewModalStore = useReviewModalStore()

const { socialAuth } = toRefs(staticDataStore)

const localePath = useLocalePath()

const onClick = () => {
    reviewModalStore.SET_STEP(STEPS.SELECT_DOCTORS)
}
</script>

<style lang="scss" scoped>
.review-auth {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;

    @media (min-width: $desktop-breakpoint) {
        flex-direction: row;
    }

    &__socials {
        display: flex;
        gap: 8px;

        @media (min-width: $desktop-breakpoint) {
            gap: 10px;
            margin-bottom: 55px;
        }

        @media (min-width: $lg-desktop-breakpoint) {
            gap: 12px;
            margin-bottom: 130px;
        }
    }

    &__privacy {
        @media (min-width: $tablet-breakpoint) {
            display: flex;
            justify-content: end;
        }
    }

    &__privacy-wrapper {
        font-size: 14px;
        font-weight: 400;
        line-height: 140%;
        color: $dark-300;

        @media (min-width: $tablet-breakpoint) {
            width: 50%;
        }

        @media (min-width: $desktop-breakpoint) {
            align-self: flex-end;
        }
    }
}
</style>