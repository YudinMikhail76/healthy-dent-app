<template>
    <div class="form-person">
        <div :class="['form-person__img', `form-person__img--${ type }`]">
            <img
                v-if="img"
                :src="img"
                alt="avatar author"
                title="avatar author"
            >
            <AppImage
                v-else
                :urls="imgDoctor.urls"
                :alt="imgDoctor.alt"
                :title="imgDoctor.title"
            />
        </div>
        <div class="form-person__inner">
            <div class="form-person__label">
                {{ label }}
            </div>
            <div class="form-person__name">
                {{ name }}
            </div>
        </div>
    </div>
</template>

<script setup>
import AppImage from '~/shared/ui/Media/AppImage.vue'

const props = defineProps({
    name: {
        type: String,
        required: true
    },
    img: {
        type: String,
        required: false,
        default: ''
    },
    imgDoctor: {
        type: Object,
        required: false,
        default: () => ({})
    },
    type: {
        type: String,
        required: true,
        validator: (value) => ['author', 'doctor'].includes(value)
    }
})

const { t } = useI18n()

const label = computed(() => props.type === 'author' ? t('reviewModal.you') : t('reviewModal.yourDoctor'))
</script>

<style lang="scss" scoped>
.form-person {
    display: flex;
    align-items: center;
    gap: 10px;

    @media (min-width: $tablet-breakpoint) {
        gap: 15px;
    }

    @media (min-width: $desktop-breakpoint) {
        gap: 20px;
    }

    @media (min-width: $lg-desktop-breakpoint) {
        gap: 24px;
    }

    &__img {
        flex-shrink: 0;
        width: 40px;
        height: 40px;
        overflow: hidden;
        border-radius: 50%;

        @media (min-width: $desktop-breakpoint) {
            width: 48px;
            height: 48px;
        }

        @media (min-width: $desktop-breakpoint) {
            width: 56px;
            height: 56px;
        }

        @media (min-width: $lg-desktop-breakpoint) {
            width: 64px;
            height: 64px;
        }

        &--author {
            border-radius: 10px;
        }

        img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
    }

    &__label {
        margin-bottom: 3px;
        font-size: 14px;
        font-weight: 400;
        line-height: 140%;
        color: $primary-500;

        @media (min-width: $tablet-breakpoint) {
            font-size: 16px;
        }
    }

    &__name {
        font-size: 14px;
        font-weight: 700;
        line-height: 140%;

        @media (min-width: $tablet-breakpoint) {
            font-size: 18px;
        }

        @media (min-width: $lg-desktop-breakpoint) {
            font-size: 20px;
        }
    }
}
</style>