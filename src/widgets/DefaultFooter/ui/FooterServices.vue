<template>
    <div class="footer__services">
        <AccordionItem 
            v-for="(item, idx) in staticData.footerMenu?.items"
            :key="item.id"
            color="dark"
            :is-initial-open="!idx"
        >
            <template #title>
                {{ item.title }}
            </template>
            <template #content>
                <div class="footer__links">
                    <FooterLink
                        v-for="menuItem in item.menu"
                        :key="menuItem.id"
                        class="footer__link"
                        :to="localePath(menuItem.url)"
                    >
                        {{ menuItem.title }}
                    </FooterLink>
                </div>
            </template>
        </AccordionItem>
        <p class="license">
            {{ t('license') }}
        </p>
    </div>
</template>

<script setup lang="ts">
import { useStaticDataStore } from '~/entities/root/store/static-data-store'
import AccordionItem from '~/shared/ui/Accordion/AccordionItem.vue'
import FooterLink from '~/shared/ui/Footer/FooterLink.vue'
import type { IStaticData } from '~/shared/interfaces/staticData'

const staticData = useStaticDataStore() as IStaticData

const localePath = useLocalePath()
const { t } = useI18n()
</script>

<style lang="scss" scoped>
.footer {
    &__links {
        display: flex;
        flex-wrap: wrap;
        gap: 5px;
        padding: 10px 0;
    }
}

.license {
    margin-top: 20px;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 140%;
    color: $dark-500;

    @media (min-width: $desktop-breakpoint) {
        width: 100%;
        font-size: 16px;
    }
}
</style>