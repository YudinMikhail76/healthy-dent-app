<template>
    <div class="caret-separator">
        <span class="caret-separator__line" />
    </div>
</template>

<script setup>
defineProps({
    color: {
        type: String,
        default: '#E9E8EE'
    }
})
</script>

<style lang="scss" scoped>
.caret-separator {
    position: relative;
    width: 100%;
    height: 20px;

    &::before,
    &::after {
        content: '';
        position: absolute;
        top: 50%;
        z-index: 2;
        width: 10px;
        height: 100%;
        mask-repeat: no-repeat;
        mask-size: contain;
        transform: translateY(-50%);
    }

    &::before {
        left: -1px;
        mask-image: url('../../assets/background/separator-caret-left.svg');
        background-color: v-bind(color);
    }

    &::after {
        right: -1px;
        mask-image: url('../../assets/background/separator-caret-right.svg');
        background-color: v-bind(color);
        mask-position: right;
    }

    &__line {
        position: absolute;
        top: 50%;
        left: 0;
        width: 100%;
        height: 1px;
        background-color: $secondary-100;
    }
}
</style>