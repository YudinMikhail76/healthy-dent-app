<template>
    <NuxtLink
        :to="localePath(data?.link?.url)"
        class="case-regular"
        :title="data?.link?.title"
    >
        <CaseItemContainer>
            <CaseItemTitle class="case-regular__title">
                {{ data.title }}
            </CaseItemTitle>
            <div class="case-regular__img-wrap">
                <AppImage
                    :urls="data?.image?.urls"
                    class="case-regular__img"
                    :alt="data?.image?.alt"
                    :title="data?.image?.title"
                    :loading="lazy ? 'lazy' : null"
                />
            </div>
            <CaseBlockQuote v-if="data?.description" :text="data.description" />
        </CaseItemContainer>
    </NuxtLink>
</template>

<script setup>
import AppImage from '~/shared/ui/Media/AppImage.vue'
import CaseItemTitle from './CaseItemTitle.vue'
import CaseBlockQuote from './CaseBlockQuote.vue'
import CaseItemContainer from './CaseItemContainer.vue'


defineProps({
    data: {
        type: Object,
        required: true
    },
    lazy: {
        type: Boolean,
        default: false,
    }
})

const localePath = useLocalePath()
</script>

<style lang="scss" scoped>
.case-regular {
    display: block;

    @media (any-hover: hover) {
        &:hover {
            .case-regular__title {
                color: $primary-500;
            }
        }
    }

    &__title {
        transition: color $base-ui-transition;
    }

    &__img-wrap {
        position: relative;
        height: 200px;

        @media (min-width: $lg-desktop-breakpoint) {
            height: 336px;
        }
    }

    &__img :deep(img) {
        object-fit: cover;
        border-radius: 7px;

        @media (min-width: $tablet-breakpoint) {
            border-radius: 10px;
        }

        @media (min-width: $desktop-breakpoint) {
            border-radius: 15px;
        }
    }
}
</style>