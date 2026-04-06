<template>
    <div class="contacts-heading">
        <ClientOnly>
            <ContactsMap />
        </ClientOnly>
        <ContactsData />
    </div>
</template>

<script setup>
import ContactsMap from './ContactsMap.vue'
import ContactsData from './ContactsData.vue'
</script>

<style lang="scss" scoped>
.contacts-heading {
    position: relative;
    height: 720px;
    max-width: 1920px;
    margin: -78px auto 0;

    @media (min-width: $tablet-breakpoint) {
        margin-top: -93px;
    }

    @media (min-width: $desktop-breakpoint) {
        height: 640px;
        margin-top: -116px;
    }

    @media (min-width: $lg-desktop-breakpoint) {
        height: 900px;
        margin-top: -144px;
    }
}
</style>