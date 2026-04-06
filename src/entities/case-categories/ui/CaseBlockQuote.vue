<template>
    <div class="block-quote" v-html="text" />
</template>

<script setup>
defineProps({
    text: {
        type: String,
        required: true
    }
})
</script>

<style lang="scss" scoped>
.block-quote {
    position: relative;
    padding-left: 36px;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 140%;
    color: $primary-300;
    
    @include text-line-overflowed-multiple(2);
    
    @media (min-width: $desktop-breakpoint) {
        font-size: 16px;
    }

    @media (min-width: $lg-desktop-breakpoint) {
        font-size: 18px;
    }

    &::before {
        content: '';
        position: absolute;
        top: 50%;
        left: 0;
        width: 18px;
        height: 14px;
        background-image: url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTgiIGhlaWdodD0iMTQiIHZpZXdCb3g9IjAgMCAxOCAxNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGcgaWQ9IlZlY3RvciI+CjxwYXRoIGQ9Ik0xNC41NzE0IDBIMThWMTRIMTBMMTQuNTcxNCAwWiIgZmlsbD0iI0QwRDVERCIvPgo8cGF0aCBkPSJNNC41NzE0MyAwSDhWMTRIMEw0LjU3MTQzIDBaIiBmaWxsPSIjRDBENUREIi8+CjwvZz4KPC9zdmc+Cg==');
        background-repeat: no-repeat;
        background-position: center center;
        background-size: contain;
        transform: translateY(-50%);
    }
}
</style>