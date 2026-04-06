<template>
    <Teleport to="body">
        <div class="app-toast__list">
            <TransitionGroup name="slide-right">
                <AppToastMessage
                    v-for="item in toast.messages"
                    v-bind="item"
                    :key="item.id"
                    @close="onClose"
                />
            </TransitionGroup>
        </div>
    </Teleport>
</template>

<script setup>
import AppToastMessage from './AppToastMessage.vue'
import { useToastStore } from './store/toast-store'

const toast = useToastStore()

const onClose = (id) => toast.remove(id)
</script>

<style lang="scss" scoped>
.app-toast {
    &__list {
        position: fixed;
        right: 20px;
        bottom: 20px;
        z-index: 101;
        display: flex;
        flex-direction: column;
        gap: 20px;
        max-height: 100%;
        padding-left: 20px;

        @media (min-width: $tablet-breakpoint) {
            right: 30px;
            bottom: 30px;
        }
    }
}

.slide-right-enter-active,
.slide-right-leave-active {
    transition: .4s;
}

.slide-right-enter-from,
.slide-right-leave-to {
    opacity: 0;
    transform: translateX(200%);
}
</style>