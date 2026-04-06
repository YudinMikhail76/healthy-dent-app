<template>
    <div class="discount-banner">
        <div class="discount-banner__intro">
            <span class="discount-banner__discount">до {{ item.discount }}</span>
            <span class="discount-banner__due-date">до {{ localizedDueDate }}</span>
        </div>
        <div class="discount-banner__discount-destination">
            {{ item.title }}
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    item: {
        type: Object,
        required: true
    }
})

const { locale } = useI18n()

const localizedDueDate = computed(() => {
    const date = new Date(props.item.valid_till)
    const formatter = new Intl.DateTimeFormat(locale.value, {
        day: 'numeric',
        month: 'long'
    })
    return formatter.format(date)
})
</script>

<style lang="scss" scoped>
.discount-banner {
    padding: 15px;
    font-size: 20px;
    font-style: normal;
    line-height: 140%;
    background-color: $primary-200;
    border-radius: 12px;

    &__discount {
        padding: 0 5px;
        margin-right: 6px;
        font-weight: 700;
        line-height: 100%;
        background-color: $light;
        border-radius: 6px;
    }

    &__due-date {
        font-weight: 400;
    }

    &__discount-destination {
        font-weight: 700;
    }
}
</style>