<template>
    <div v-if="activeTab === value" class="tab-content">
        <slot />
    </div>
</template>

<script setup>
defineProps({
    activeTab: {
        type: String,
        required: true
    },
    value: {
        type: String,
        required: true
    }
})
</script>
