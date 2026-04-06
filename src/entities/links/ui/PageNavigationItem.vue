<template>
    <div 
        :class="[
            'navigation-item',
            { 'navigation-item--active': isActive }
        ]"
        @click="onClick(item)"
    >
        <slot />
    </div>
</template>

<script setup>
const emit = defineEmits(['on-click'])
defineProps({
    item: {
        type: Object,
        required: true
    },
    to: {
        type: String,
        required: false,
        default: ''
    },
    isActive: {
        type: Boolean,
        required: false
    }
})

const onClick = (item) => {
    emit('on-click', item)
}
</script>

<style lang="scss" scoped>
.navigation-item {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 7px 0;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 140%;
    color: $dark-500;
    cursor: pointer;

    @media (min-width: $tablet-breakpoint) {
        font-size: 16px;
    }

    @media (min-width: $desktop-breakpoint) {
        font-size: 18px;

        &:hover {
            &::before,
            &::after {
                visibility: visible;
                opacity: 1;
            }
        }

        &::before,
        &::after {
            visibility: hidden;
            opacity: 0;
        }
    }

    @media (min-width: $lg-desktop-breakpoint) {
        font-size: 20px;
    }

    &:hover {
        visibility: visible;
        opacity: 1;
    }

    &::before,
    &::after {
        content: '';
        display: inline-block;
        height: 20px;
        max-width: 5px;
        min-width: 5px;
        background-repeat: no-repeat;
        background-position: center;
        background-size: contain;
    }

    &::before {
        background-image: url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNiIgaGVpZ2h0PSIyMiIgdmlld0JveD0iMCAwIDYgMjIiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIGQ9Ik02IDFWMUMzLjIzODU4IDEgMSAzLjIzODU4IDEgNlYxNkMxIDE4Ljc2MTQgMy4yMzg1OCAyMSA2IDIxVjIxIiBzdHJva2U9IiMxREIwQTkiIHN0cm9rZS13aWR0aD0iMS41Ii8+Cjwvc3ZnPgo=');
    }

    &::after {
        background-image: url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNiIgaGVpZ2h0PSIyMiIgdmlld0JveD0iMCAwIDYgMjIiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIGQ9Ik0xLjYzOTEzZS0wNyAxVjFDMi43NjE0MiAxIDUgMy4yMzg1OCA1IDZWMTZDNSAxOC43NjE0IDIuNzYxNDIgMjEgMS42MzkxM2UtMDcgMjFWMjEiIHN0cm9rZT0iIzFEQjBBOSIgc3Ryb2tlLXdpZHRoPSIxLjUiLz4KPC9zdmc+Cg==');
    }

    &--active {
        font-weight: 700;

        &::before,
        &::after {
            visibility: visible;
            opacity: 1;
        }

        &::before {
            background-image: url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNSIgaGVpZ2h0PSIxMCIgdmlld0JveD0iMCAwIDUgMTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIGlkPSJSZWN0YW5nbGUgMjgwIiBkPSJNMCAwTDUgNUwwIDEwVjBaIiBmaWxsPSIjMURCMEE5Ii8+Cjwvc3ZnPgo=');            
        }

        &::after {
            background-image: none;
        }
    }
}
</style>