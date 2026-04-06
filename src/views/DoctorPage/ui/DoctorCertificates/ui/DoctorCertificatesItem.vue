<template>
    <div class="doctor-certificates-item">
        <div class="doctor-certificates-item__img">
            <div class="doctor-certificates-item__img-inner">
                <img
                    :src="data.image"
                    alt="certificate"
                    title="certificate"
                    loading="lazy"
                >
            </div>
        </div>
        <div class="doctor-certificates-item__text">
            {{ data.title }}
        </div>
    </div>
</template>

<script setup>
defineProps({
    data: {
        type: Object,
        required: true
    }
})
</script>

<style lang="scss" scoped>
.doctor-certificates-item {
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 10px;
    background-color: $light;
    border-radius: 7px;

    @media (min-width: $tablet-breakpoint) {
        gap: 15px;
        padding: 15px;
        border-radius: 10px;
    }

    @media (min-width: $desktop-breakpoint) {
        gap: 20px;
        padding: 20px;
        border-radius: 12px;
    }

    @media (min-width: $lg-desktop-breakpoint) {
        gap: 24px;
        padding: 24px;
        border-radius: 15px;
    }

    &__img {
        position: relative;
        padding-top: 100%;
        overflow: hidden;
    }

    &__img-inner {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        
        img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
    }

    &__text {
        font-size: 14px;
        font-weight: 400;
        line-height: 140%;

        @media (min-width: $tablet-breakpoint) {
            font-size: 16px;
        }

        @media (min-width: $desktop-breakpoint) {
            font-size: 18px;
        }

        @media (min-width: $lg-desktop-breakpoint) {
            font-size: 20px;
        }
    }
}
</style>