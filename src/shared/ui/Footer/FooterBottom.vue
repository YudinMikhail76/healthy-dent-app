<template>
    <div class="footer__bottom">
        <div class="footer__left-col">
            <div class="footer__copyright">
                © 2008-{{ currentYear }}. Healthy Dent. {{ t('footer.copyright') }}
            </div>
            <div class="footer__logos">
                <div class="footer__payment-logos">
                    <div class="footer__payment footer__payment--visa" />
                    <div class="footer__payment footer__payment--mastercard" />
                    <div class="footer__payment footer__payment--google-pay" />
                    <div class="footer__payment footer__payment--apple-pay" />
                </div>
                <div class="footer__dmca">
                    <img
                        src="/shared/assets/images/footer/protected-dmca.png"
                        alt="Protected DMCA"
                        title="protected DMCA"
                        width="122"
                        height="23"
                        loading="lazy"
                    >
                </div>
            </div>
        </div>
        <div class="footer__right-col">
            <div class="footer__socials">
                <AppButtonSocial
                    v-for="item in socials"
                    :key="item.url"
                    :to="item.url"
                    target="_blank"
                    :title="item.type"
                    external
                >
                    <component :is="getSocialIconComponent(item.type)" />
                </AppButtonSocial>
            </div>
            <div class="footer__developed-by">
                <div class="footer__company-title">
                    {{ t('footer.companyTitle') }}
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import AppButtonSocial from '~/shared/ui/Buttons/AppButtonSocial.vue'
import { useStaticDataStore } from '~/entities/root/store/static-data-store'
import { getSocialIconComponent } from '~/shared/utils/socials'
import type { IStaticData } from '~/shared/interfaces/staticData'

const { t } = useI18n()
const staticData = useStaticDataStore() as IStaticData

const currentYear = new Date().getFullYear()
const socials = computed(() => staticData.socials?.values)
</script>

<style lang="scss" scoped>
.footer {
    &__bottom {
        padding: 20px 0;

        @media (min-width: $desktop-breakpoint) {
            display: flex;
            padding: 40px 0;
        }

        @media (min-width: $lg-desktop-breakpoint) {
            padding: 48px 0;
        }
    }

    &__copyright {
        margin-bottom: 10px;
        font-size: 14px;
        font-style: normal;
        font-weight: 400;
        line-height: 140%;
        color: $primary-300;

        @media (min-width: $desktop-breakpoint) {
            margin-bottom: 20px;
            font-size: 18px;
        }

        @media (min-width: $lg-desktop-breakpoint) {
            margin-bottom: 24px;
            font-size: 20px;
        }
    }

    &__logos {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 15px;
        margin-bottom: 20px;
    }

    &__payment-logos {
        display: flex;
        gap: 3px;

        @media (min-width: $desktop-breakpoint) {
            gap: 6px;
        }
    }

    &__payment {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 40px;
        height: 27px;
        background-repeat: no-repeat;
        background-position: center center;
        background-size: 80% 80%;

        @media (min-width: $desktop-breakpoint) {
            width: 56px;
            height: 38px;
        }

        @media (min-width: $lg-desktop-breakpoint) {
            width: 64px;
            height: 44px;
            background-size: 73% 73%;
        }

        &--visa {
            background-image: url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjkiIGhlaWdodD0iOSIgdmlld0JveD0iMCAwIDI5IDkiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNNy40NjQwOSA4Ljg0MDMzSDUuMDc1OThMMy4yODUxOSAyLjAxNjIzQzMuMjAwMiAxLjcwMjMyIDMuMDE5NzIgMS40MjQ4IDIuNzU0MjUgMS4yOTQwMUMyLjA5MTcyIDAuOTY1MzE0IDEuMzYxNjcgMC43MDM3MjMgMC41NjUyNDcgMC41NzE3OVYwLjMwOTA2Mkg0LjQxMjNDNC45NDMyNSAwLjMwOTA2MiA1LjM0MTQ2IDAuNzAzNzIzIDUuNDA3ODMgMS4xNjIwOEw2LjMzNjk5IDYuMDg0NTNMOC43MjM5MyAwLjMwOTA2MkgxMS4wNDU3TDcuNDY0MDkgOC44NDAzM1pNMTIuMzczIDguODQwMzNIMTAuMTE3N0wxMS45NzQ4IDAuMzA5MDYySDE0LjIzMDJMMTIuMzczIDguODQwMzNaTTE3LjE0ODEgMi42NzI0OEMxNy4yMTQ1IDIuMjEyOTkgMTcuNjEyNyAxLjk1MDI2IDE4LjA3NzIgMS45NTAyNkMxOC44MDczIDEuODg0MyAxOS42MDI2IDIuMDE2MjMgMjAuMjY2MiAyLjM0Mzc5TDIwLjY2NDUgMC41MDY5NjZDMjAuMDAwOCAwLjI0NDIzNyAxOS4yNzA3IDAuMTEyMzA1IDE4LjYwODIgMC4xMTIzMDVDMTYuNDE5MiAwLjExMjMwNSAxNC44MjY0IDEuMjk0MDEgMTQuODI2NCAyLjkzNDA3QzE0LjgyNjQgNC4xODE3NSAxNS45NTQ2IDQuODM2ODYgMTYuNzUxIDUuMjMxNTJDMTcuNjEyNyA1LjYyNTA1IDE3Ljk0NDUgNS44ODc3NyAxNy44NzgxIDYuMjgxM0MxNy44NzgxIDYuODcxNTggMTcuMjE0NSA3LjEzNDMxIDE2LjU1MTkgNy4xMzQzMUMxNS43NTU1IDcuMTM0MzEgMTQuOTU5MSA2LjkzNzU1IDE0LjIzMDIgNi42MDg4NkwxMy44MzIgOC40NDY4MkMxNC42Mjg0IDguNzc0MzcgMTUuNDkgOC45MDYzMSAxNi4yODY1IDguOTA2MzFDMTguNzQwOSA4Ljk3MTEzIDIwLjI2NjIgNy43OTA1NiAyMC4yNjYyIDYuMDE4NTdDMjAuMjY2MiAzLjc4NzA5IDE3LjE0ODEgMy42NTYyOSAxNy4xNDgxIDIuNjcyNDhaTTI4LjE1OTQgOC44NDAzM0wyNi4zNjg3IDAuMzA5MDYySDI0LjQ0NTFDMjQuMDQ2OSAwLjMwOTA2MiAyMy42NDg3IDAuNTcxNzkgMjMuNTE2IDAuOTY1MzE0TDIwLjE5OTkgOC44NDAzM0gyMi41MjE2TDIyLjk4NSA3LjU5MzhIMjUuODM3N0wyNi4xMDMyIDguODQwMzNIMjguMTU5NFpNMjQuNzc3IDIuNjA2NTJMMjUuNDM5NSA1LjgyMTgySDIzLjU4MjNMMjQuNzc3IDIuNjA2NTJaIiBmaWxsPSIjNjVBMjlFIi8+Cjwvc3ZnPgo=');
        }
        
        &--mastercard {
            background-image: url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjciIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAyNyAxNiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0xMy45MTc3IDEzLjkzMzFDMTIuNTQ0OSAxNS4wNTU5IDEwLjc2NDEgMTUuNzMzNyA4LjgxODIxIDE1LjczMzdDNC40NzYzMyAxNS43MzM3IDAuOTU2NTQzIDEyLjM1OSAwLjk1NjU0MyA4LjE5NjE5QzAuOTU2NTQzIDQuMDMzMzQgNC40NzYzMyAwLjY1ODY5MSA4LjgxODIxIDAuNjU4NjkxQzEwLjc2NDEgMC42NTg2OTEgMTIuNTQ0OSAxLjMzNjUgMTMuOTE3NyAyLjQ1OTNDMTUuMjkwNSAxLjMzNjUgMTcuMDcxMiAwLjY1ODY5MSAxOS4wMTcxIDAuNjU4NjkxQzIzLjM1OSAwLjY1ODY5MSAyNi44Nzg4IDQuMDMzMzQgMjYuODc4OCA4LjE5NjE5QzI2Ljg3ODggMTIuMzU5IDIzLjM1OSAxNS43MzM3IDE5LjAxNzEgMTUuNzMzN0MxNy4wNzEyIDE1LjczMzcgMTUuMjkwNSAxNS4wNTU5IDEzLjkxNzcgMTMuOTMzMVoiIGZpbGw9IiM2NUEyOUUiLz4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0xMy45MTc3IDEzLjkzMzFDMTUuNjA4MSAxMi41NTA2IDE2LjY3OTkgMTAuNDkzNCAxNi42Nzk5IDguMTk2MTlDMTYuNjc5OSA1Ljg5ODk5IDE1LjYwODEgMy44NDE4MSAxMy45MTc3IDIuNDU5M0MxNS4yOTA1IDEuMzM2NSAxNy4wNzEzIDAuNjU4NjkxIDE5LjAxNzIgMC42NTg2OTFDMjMuMzU5MSAwLjY1ODY5MSAyNi44Nzg5IDQuMDMzMzQgMjYuODc4OSA4LjE5NjE5QzI2Ljg3ODkgMTIuMzU5IDIzLjM1OTEgMTUuNzMzNyAxOS4wMTcyIDE1LjczMzdDMTcuMDcxMyAxNS43MzM3IDE1LjI5MDUgMTUuMDU1OSAxMy45MTc3IDEzLjkzMzFaIiBmaWxsPSIjNjVBMjlFIi8+CjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNMTMuOTE3NyAxMy45MzMyQzE1LjYwOCAxMi41NTA3IDE2LjY3OTkgMTAuNDkzNSAxNi42Nzk5IDguMTk2MzRDMTYuNjc5OSA1Ljg5OTE2IDE1LjYwOCAzLjg0MTk5IDEzLjkxNzcgMi40NTk0N0MxMi4yMjc0IDMuODQxOTkgMTEuMTU1NSA1Ljg5OTE2IDExLjE1NTUgOC4xOTYzNEMxMS4xNTU1IDEwLjQ5MzUgMTIuMjI3NCAxMi41NTA3IDEzLjkxNzcgMTMuOTMzMloiIGZpbGw9IiNEMEQ1REQiLz4KPC9zdmc+Cg==');
        }

        &--google-pay {
            background-image: url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjkiIGhlaWdodD0iMTIiIHZpZXdCb3g9IjAgMCAyOSAxMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0xMy42MTc4IDkuNDY5MDRWNi4xNjc1NkgxNS4zNzM5QzE2LjA5MzUgNi4xNjc1NiAxNi43MDA5IDUuOTMzNiAxNy4xOTYgNS40NzIxN0wxNy4zMTQ5IDUuMzU1MTlDMTguMjE5MyA0LjM5OTg0IDE4LjE1OTkgMi45MTE1NyAxNy4xOTYgMi4wMjc3MUMxNi43MTQxIDEuNTU5NzkgMTYuMDUzOSAxLjMwNjMzIDE1LjM3MzkgMS4zMTkzMkgxMi41NTQ5VjkuNDY5MDRIMTMuNjE3OFpNMTMuNjE3OSA1LjE2NjY1VjIuMzIwMUgxNS40MDA3QzE1Ljc4MzcgMi4zMjAxIDE2LjE0NjkgMi40NjMwOCAxNi40MTc2IDIuNzIzMDRDMTYuOTkyIDMuMjY4OTUgMTcuMDA1MiA0LjE3ODgxIDE2LjQ1MDYgNC43NDQyMkMxNi4xNzk5IDUuMDIzNjggMTUuNzk2OSA1LjE3OTY1IDE1LjQwMDcgNS4xNjY2NUgxMy42MTc5Wk0yMi4yNzI5IDQuMzI4MzJDMjEuODE3MyAzLjkxODg5IDIxLjE5NjggMy43MTA5MiAyMC40MTExIDMuNzEwOTJDMTkuNDAxMSAzLjcxMDkyIDE4LjY0MTkgNC4wNzQ4NiAxOC4xNDAxIDQuNzk2MjVMMTkuMDc3NiA1LjM3NDY2QzE5LjQyMDkgNC44ODA3NCAxOS44ODk2IDQuNjMzNzggMjAuNDgzOCA0LjYzMzc4QzIwLjg2MDEgNC42MzM3OCAyMS4yMjMyIDQuNzcwMjUgMjEuNTA3MSA1LjAxNzIxQzIxLjc4NDMgNS4yNTExOCAyMS45NDI4IDUuNTg5MTMgMjEuOTQyOCA1Ljk0NjU3VjYuMTg3MDNDMjEuNTMzNSA1Ljk2NjA3IDIxLjAxODUgNS44NDkwOCAyMC4zODQ3IDUuODQ5MDhDMTkuNjQ1MyA1Ljg0OTA4IDE5LjA1MTIgNi4wMTgwNiAxOC42MDg4IDYuMzYyNUMxOC4xNjY1IDYuNzA2OTUgMTcuOTQyMSA3LjE2MTg4IDE3Ljk0MjEgNy43NDAyOUMxNy45Mjg5IDguMjY2NzEgMTguMTU5OSA4Ljc2NzEzIDE4LjU2OTIgOS4xMDUwN0MxOC45ODUyIDkuNDY5MDIgMTkuNTEzMyA5LjY1MDk5IDIwLjEzMzkgOS42NTA5OUMyMC44NjY3IDkuNjUwOTkgMjEuNDQ3NiA5LjMzMjU0IDIxLjg5IDguNjk1NjRIMjEuOTM2MlY5LjQ2OTAySDIyLjk1MjlWNi4wMzEwNkMyMi45NTI5IDUuMzA5NjcgMjIuNzI4NCA0LjczNzc2IDIyLjI3MjkgNC4zMjgzMlpNMTkuMzg4IDguNDQyMkMxOS4xNzAxIDguMjg2MjIgMTkuMDM4MSA4LjAzMjc2IDE5LjAzODEgNy43NTk4MUMxOS4wMzgxIDcuNDU0MzUgMTkuMTgzNCA3LjIwMDg5IDE5LjQ2NzMgNi45OTk0MkMxOS43NTc4IDYuNzk3OTYgMjAuMTIxIDYuNjkzOTcgMjAuNTUwMSA2LjY5Mzk3QzIxLjE0NDQgNi42ODc0NyAyMS42MDY2IDYuODE3NDUgMjEuOTM2OCA3LjA3NzQxQzIxLjkzNjggNy41MTkzNCAyMS43NTg1IDcuOTAyNzggMjEuNDA4NSA4LjIyNzczQzIxLjA5MTYgOC41Mzk2OCAyMC42NjI0IDguNzE1MTUgMjAuMjEzNCA4LjcxNTE1QzE5LjkxNjMgOC43MjE2NSAxOS42MjU3IDguNjI0MTcgMTkuMzg4IDguNDQyMlpNMjUuMjM3MSAxMS45MTkxTDI4Ljc4ODkgMy44OTI4OUgyNy42MzM2TDI1Ljk4OTcgNy44OTYyNkgyNS45Njk5TDI0LjI4NjQgMy44OTI4OUgyMy4xMzExTDI1LjQ2MTYgOS4xMTE1N0wyNC4xNDEyIDExLjkxOTFIMjUuMjM3MVoiIGZpbGw9IiM2NUEyOUUiLz4KPHBhdGggZD0iTTkuOTQ4MzUgNS40NTIyN0M5Ljk0ODM1IDUuMTMzODIgOS45MjE5NCA0LjgxNTM3IDkuODY5MTIgNC41MDM0Mkg1LjM4NjQ3VjYuMzAzNjRINy45NTQ1OUM3Ljg0ODk2IDYuODgyMDUgNy41MDU2NiA3LjQwMTk2IDcuMDAzOTMgNy43MjY5MVY4Ljg5NjczSDguNTM1NTVDOS40MzM0IDguMDg0MzYgOS45NDgzNSA2Ljg4MjA1IDkuOTQ4MzUgNS40NTIyN1oiIGZpbGw9IiM2NUEyOUUiLz4KPHBhdGggZD0iTTUuMzg2NTggMTAuMDI4QzYuNjY3MzQgMTAuMDI4IDcuNzUwMDQgOS42MTIwOCA4LjUzNTY2IDguODk3MTlMNy4wMDQwMyA3LjcyNzM3QzYuNTc0OTEgOC4wMTMzMyA2LjAyNjk2IDguMTc1OCA1LjM4NjU4IDguMTc1OEM0LjE0NTQ0IDguMTc1OCAzLjA5NTc1IDcuMzUwNDMgMi43MTk0NCA2LjI0NTYxSDEuMTQxNlY3LjQ1NDQyQzEuOTQ3MDMgOS4wMzM2NyAzLjU5MDg4IDEwLjAyOCA1LjM4NjU4IDEwLjAyOFoiIGZpbGw9IiM2NUEyOUUiLz4KPHBhdGggZD0iTTIuNzE5NjMgNi4yNDU1NEMyLjUyMTU1IDUuNjY3MTMgMi41MjE1NSA1LjAzNjczIDIuNzE5NjMgNC40NTE4MlYzLjI0OTUxSDEuMTQxNTRDMC40NjE0NDUgNC41Njg4IDAuNDYxNDQ1IDYuMTI4NTYgMS4xNDE1NCA3LjQ0Nzg1TDIuNzE5NjMgNi4yNDU1NFoiIGZpbGw9IiM2NUEyOUUiLz4KPHBhdGggZD0iTTUuMzg2NTggMi41MjE0NEM2LjA2NjU3IDIuNTA4NDQgNi43MjAxNSAyLjc2MTkgNy4yMDg2OSAzLjIyMzMzTDguNTY4NjcgMS44ODQ1NEM3LjcwMzgzIDEuMDkxNjYgNi41NjgzMSAwLjY1NjIzIDUuMzg2NTggMC42NjkyMjhDMy41OTA4OCAwLjY2OTIyOCAxLjk0NzAzIDEuNjcwMDcgMS4xNDE2IDMuMjQ5MzJMMi43MTk0NCA0LjQ1ODE0QzMuMDk1NzUgMy4zNDY4MSA0LjE0NTQ0IDIuNTIxNDQgNS4zODY1OCAyLjUyMTQ0WiIgZmlsbD0iIzY1QTI5RSIvPgo8L3N2Zz4K');
        }

        &--apple-pay {
            background-image: url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAiIGhlaWdodD0iMTMiIHZpZXdCb3g9IjAgMCAzMCAxMyIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik02LjA0MDM5IDIuMzg2MDVDNS43MDQwNyAyLjc4MTk0IDUuMTY1OTcgMy4wOTQxOSA0LjYyNzg2IDMuMDQ5NThDNC41NjA2IDIuNTE0MyA0LjgyNDA1IDEuOTQ1NTYgNS4xMzIzNCAxLjU5NDI4QzUuNDY4NjUgMS4xODcyNSA2LjA1NzIgMC44OTczMDQgNi41MzM2NSAwLjg3NUM2LjU4OTcgMS40MzI1OCA2LjM3MTEgMS45NzkwMiA2LjA0MDM5IDIuMzg2MDVaTTYuNTI4IDMuMTU1NTJDNi4wNTM5NCAzLjEyODM3IDUuNjIxMzggMy4yOTczNCA1LjI3MTk5IDMuNDMzODFDNS4wNDcxNSAzLjUyMTY0IDQuODU2NzUgMy41OTYwMSA0LjcxMTkgMy41OTYwMUM0LjU0OTM1IDMuNTk2MDEgNC4zNTEwOSAzLjUxNzY2IDQuMTI4NDkgMy40Mjk2OUMzLjgzNjgxIDMuMzE0NDMgMy41MDMzNCAzLjE4MjY1IDMuMTUzNjQgMy4xODg5N0MyLjM1MjA5IDMuMjAwMTIgMS42MDY1OSAzLjY1MTc2IDEuMTk3NDEgNC4zNzEwNUMwLjM1NjYyMiA1LjgwOTYxIDAuOTc4ODA1IDcuOTM5NTggMS43OTE1NyA5LjExMDUxQzIuMTg5NTQgOS42OTA0IDIuNjY1OTggMTAuMzI2IDMuMjkzNzcgMTAuMzAzN0MzLjU2OTk2IDEwLjI5MzQgMy43Njg2NCAxMC4yMDk1IDMuOTc0MjUgMTAuMTIyN0M0LjIxMDk2IDEwLjAyMjggNC40NTY4NiA5LjkxOSA0Ljg0MDgyIDkuOTE5QzUuMjExNDcgOS45MTkgNS40NDY2MiAxMC4wMjAxIDUuNjcyMzUgMTAuMTE3MUM1Ljg4Njk4IDEwLjIwOTQgNi4wOTMxIDEwLjI5OCA2LjM5OTA4IDEwLjI5MjZDNy4wNDkyOSAxMC4yODE0IDcuNDU4NDcgOS43MTI3IDcuODU2NDUgOS4xMzI4MUM4LjI4NTkyIDguNTEwNDQgOC40NzQ2NiA3LjkwMzAzIDguNTAzMyA3LjgxMDg1TDguNTA2NjUgNy44MDAxOUM4LjUwNTk3IDcuNzk5NSA4LjUwMDY2IDcuNzk3MDkgOC40OTEzIDcuNzkyODJDOC4zNDc3MyA3LjcyNzQ0IDcuMjUwMzkgNy4yMjc3MiA3LjIzOTg3IDUuODg3NjhDNy4yMjkzIDQuNzYyOSA4LjExMDI1IDQuMTkzMDMgOC4yNDg5MyA0LjEwMzMyQzguMjU3MzcgNC4wOTc4NiA4LjI2MzA2IDQuMDk0MTggOC4yNjU2MyA0LjA5MjI2QzcuNzA1MSAzLjI2NzAzIDYuODMwNjkgMy4xNzc4MiA2LjUyOCAzLjE1NTUyWk0xMS4wMjkxIDEwLjIzMTJWMS41Mzg1MkgxNC4zMDgxQzE2LjAwMDkgMS41Mzg1MiAxNy4xODM2IDIuNjk4MjkgMTcuMTgzNiA0LjM5MzM1QzE3LjE4MzYgNi4wODg0IDE1Ljk3ODUgNy4yNTkzMyAxNC4yNjMzIDcuMjU5MzNIMTIuMzg1NVYxMC4yMzEySDExLjAyOTFaTTEyLjM4NTQgMi42NzU5OUgxMy45NDkzQzE1LjEyNjQgMi42NzU5OSAxNS43OTkgMy4zMDA0OCAxNS43OTkgNC4zOTg5MkMxNS43OTkgNS40OTczNiAxNS4xMjY0IDYuMTI3NDMgMTMuOTQzNyA2LjEyNzQzSDEyLjM4NTRWMi42NzU5OVpNMjEuNjYyMyA5LjE4ODU3QzIxLjMwMzUgOS44Njg4MiAyMC41MTMyIDEwLjI5ODIgMTkuNjYxMiAxMC4yOTgyQzE4LjQgMTAuMjk4MiAxNy41MiA5LjU1MSAxNy41MiA4LjQyNDY4QzE3LjUyIDcuMzA5NTIgMTguMzcyIDYuNjY4MjkgMTkuOTQ3MSA2LjU3MzUxTDIxLjYzOTkgNi40NzMxNFY1Ljk5MzYyQzIxLjYzOTkgNS4yODU0OSAyMS4xNzQ2IDQuOTAwNzYgMjAuMzQ1MSA0LjkwMDc2QzE5LjY2MTIgNC45MDA3NiAxOS4xNjIzIDUuMjUyMDMgMTkuMDYxNCA1Ljc4NzMxSDE3LjgzOTVDMTcuODc4NyA0LjY2MSAxOC45NDM3IDMuODQxMzUgMjAuMzg0MyAzLjg0MTM1QzIxLjkzNjkgMy44NDEzNSAyMi45NDU5IDQuNjQ5ODQgMjIuOTQ1OSA1LjkwNDQxVjEwLjIzMTNIMjEuNjkwM1Y5LjE4ODU3SDIxLjY2MjNaTTIwLjAyNTUgOS4yNjY2NEMxOS4zMDI0IDkuMjY2NjQgMTguODQyNyA4LjkyMDk0IDE4Ljg0MjcgOC4zOTEyM0MxOC44NDI3IDcuODQ0OCAxOS4yODU2IDcuNTI2OTggMjAuMTMyIDcuNDc2NzlMMjEuNjM5OCA3LjM4MlY3Ljg3MjY4QzIxLjYzOTggOC42ODY3NSAyMC45NDQ3IDkuMjY2NjQgMjAuMDI1NSA5LjI2NjY0Wk0yNy4xMTA1IDEwLjU3MTRDMjYuNTY2OCAxMi4wOTM2IDI1Ljk0NDYgMTIuNTk1NCAyNC42MjE4IDEyLjU5NTRDMjQuNTIwOSAxMi41OTU0IDI0LjE4NDYgMTIuNTg0MyAyNC4xMDYxIDEyLjU2MlYxMS41MTkzQzI0LjE5MDIgMTEuNTMwNCAyNC4zOTc2IDExLjU0MTYgMjQuNTA0MSAxMS41NDE2QzI1LjEwMzkgMTEuNTQxNiAyNS40NDAyIDExLjI5MDcgMjUuNjQ3NiAxMC42MzgzTDI1Ljc3MDkgMTAuMjUzNkwyMy40NzI3IDMuOTI0OTlIMjQuODkwOUwyNi40ODgzIDkuMDYwMzRIMjYuNTE2NEwyOC4xMTM5IDMuOTI0OTlIMjkuNDkyOEwyNy4xMTA1IDEwLjU3MTRaIiBmaWxsPSIjNjVBMjlFIi8+Cjwvc3ZnPgo=');
        }
    }

    &__socials {
        display: flex;
        align-items: flex-start;
        gap: 5px;

        @media (min-width: $desktop-breakpoint) {
            gap: 10px;
        }
    }

    &__left-col {
        @media (min-width: $desktop-breakpoint) {
            width: 50%;
            padding-right: 12.5%;
        }
    }

    &__right-col {
        display: flex;
        justify-content: space-between;
        gap: 15px;

        @media (min-width: $desktop-breakpoint) {
            width: 50%;
        }
    }

    &__developed-by {
        min-width: 180px;

        @media (min-width: $desktop-breakpoint) {
            min-width: 203px;
        }
    }

    &__company-title {
        position: relative;
        display: flex;
        align-items: center;
        margin-bottom: 10px;
        font-size: 14px;
        font-style: normal;
        font-weight: 400;
        line-height: 140%;
        color: $primary-300;

        @media (min-width: $desktop-breakpoint) {
            margin-bottom: 20px;
            font-size: 16px;
        }

        @media (min-width: $lg-desktop-breakpoint) {
            margin-bottom: 24px;
        }

        &::before,
        &::after {
            content: '';
            display: inline-block;
            width: 5px;
            height: 20px;
            background-repeat: no-repeat;
            background-size: contain;

            @media (min-width: $desktop-breakpoint) {
                height: 22px;
            }
        }

        &::before {
            margin-right: 5px;
            background-image: url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNiIgaGVpZ2h0PSIyMiIgdmlld0JveD0iMCAwIDYgMjIiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIGlkPSJSZWN0YW5nbGUgMzAzOCIgZD0iTTYgMUg0QzIuMzQzMTUgMSAxIDIuMzQzMTUgMSA0VjE4QzEgMTkuNjU2OSAyLjM0MzE1IDIxIDQgMjFINiIgc3Ryb2tlPSIjMURCMEE5IiBzdHJva2Utd2lkdGg9IjEuNSIvPgo8L3N2Zz4K');
        }

        &::after {
            margin-left: 5px;
            background-image: url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNiIgaGVpZ2h0PSIyMiIgdmlld0JveD0iMCAwIDYgMjIiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIGlkPSJSZWN0YW5nbGUgMzAzOSIgZD0iTTEuNjM5MTNlLTA3IDFIMkMzLjY1Njg1IDEgNSAyLjM0MzE1IDUgNFYxOEM1IDE5LjY1NjkgMy42NTY4NSAyMSAyIDIxSDEuNjM5MTNlLTA3IiBzdHJva2U9IiMxREIwQTkiIHN0cm9rZS13aWR0aD0iMS41Ii8+Cjwvc3ZnPgo=');
        }
    }

    &__im {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    &__im-icon {
        width: 82px;
        height: 24px;

        @media (min-width: $desktop-breakpoint) {
            width: 95.375px;
            height: 28px;
        }

        @media (min-width: $lg-desktop-breakpoint) {
            width: 109px;
            height: 32px;
        }
    }

    &__im-logo-icon {
        width: 24px;
        height: 24px;

        @media (min-width: $desktop-breakpoint) {
            width: 28px;
            height: 28px;
        }

        @media (min-width: $lg-desktop-breakpoint) {
            width: 32px;
            height: 32px;
        }
    }
}
</style>