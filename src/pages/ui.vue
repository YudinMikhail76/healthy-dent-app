<template>
    <div class="container">
        <div class="col">
            <AppLink to="/" variant="primary">
                Primary-500
            </AppLink>
            <AppLink to="/" variant="primary">
                Primary-600
            </AppLink>
        </div>
        <div class="col">
            <AppButton>
                Кнопка
            </AppButton>
            <div>
                <AppButton full-width>
                    Повна ширину
                </AppButton>
            </div>
        </div>
        <div class="col">
            <AppTag>
                Check up зубів
            </AppTag>
            <AppTag has-discount>
                Зі знижкою
            </AppTag>
            <AppTag variant="pill">
                Check up зубів
            </AppTag>
        </div>
        <div class="col">
            <AppTagPilled to="/" size="small">
                Check up зубів
            </AppTagPilled>
            <AppTagPilled to="/" size="medium">
                Check up зубів
            </AppTagPilled>
        </div>
        <div class="col">
            <AppButtonTypeIcon position="right">
                <CloseIcon />
            </AppButtonTypeIcon>
            <AppButtonTypeIcon position="center">
                <AngleDownIcon />
            </AppButtonTypeIcon>
            <AppButtonSocial>
                <InstagramIcon />
            </AppButtonSocial>
            <AppButtonSocial>
                <TelegramIcon />
            </AppButtonSocial>
        </div>
        <div class="col">
            <AppCheckbox
                id="checkbox-id-3"
                is-disabled
                size="medium"
                label="checkbox example 3"
                value="checkbox example value 3"
                @on-change="handleCheckbox"
            />
            <AppCheckbox
                id="checkbox-id-4"
                is-disabled
                size="medium"
                value="checkbox example"
                @on-change="handleCheckbox"
            />
        </div>
        <div class="col">
            <AppRating
                :mark="calculateRatingValueToMark(REVIEWS_SUM, REVIEWS_COUNT_ALL)"
                size="small"
                variant="primary"
                is-disabled
                @on-change="onRateChange"
            />
            <AppRating
                :mark="calculateRatingValueToMark(REVIEWS_SUM, REVIEWS_COUNT_ALL)"
                size="medium"
                variant="primary"
                @on-change="onRateChange"
            />
            <AppRating
                :mark="calculateRatingValueToMark(REVIEWS_SUM, REVIEWS_COUNT_ALL)"
                size="small"
                variant="light"
                @on-change="onRateChange"
            />
        </div>
        <div class="col">
            <AppBadge>
                Акція!
            </AppBadge>
            <AppBadge>
                -30%
            </AppBadge>
        </div>
        <div class="col">
            <AppLoadMoreButton align="center" full-width>
                <template #label>
                    align="center"
                </template>
                <template #count>
                    10
                </template>
            </AppLoadMoreButton>
        </div>
        <div class="col">
            <AppPagination
                :limit="10"
                :total="88"
                :page="5"
                size="small"
            />
        </div>
        <div class="col">
            <AppTabs 
                :tabs="tabs"
                :selected="activeTab"
                @select="onTabSelected"
            >
                <AppTabContent value="tab1" :active-tab="activeTab">
                    Таб контент 1
                </AppTabContent>
                <AppTabContent value="tab2" :active-tab="activeTab">
                    Таб контент 2
                </AppTabContent>
                <AppTabContent value="tab3" :active-tab="activeTab">
                    Таб контент 3
                </AppTabContent>
            </AppTabs>
        </div>
        <div class="col">
            <AppTabsMulticheck 
                :tabs="multicheckValues"
                :selected-list="activeMulti"
                @select="toggleMulticheck"
            >
                <AppTabContent value="tab1" :active-tab="activeTab">
                    Таб контент 1
                </AppTabContent>
                <AppTabContent value="tab2" :active-tab="activeTab">
                    Таб контент 2
                </AppTabContent>
                <AppTabContent value="tab3" :active-tab="activeTab">
                    Таб контент 3
                </AppTabContent>
            </AppTabsMulticheck>
        </div>
        <div class="inputs" style="background-color: #FFF; padding: 40px;">
            <div class="col">
                <AppInput 
                    id="input1" 
                    value="1"
                    label-text="Як до вас звертатися?"
                />
            </div>
            <div class="col">
                <AppInput
                    id="input2"
                    value="2"
                    label-text="Як до вас звертатися?"
                    is-required-field
                    is-success
                />
            </div>
            <div class="col">
                <AppInput
                    id="input3"
                    value="3"
                    label-text="Як до вас звертатися?"
                    is-error
                />
            </div>
            <div class="col">
                <AppInput
                    id="input4"
                    type="number"
                    :value="count"
                    @on-input="handleCount"
                />
            </div>
            <div class="col">
                <AppInput
                    id="maska"
                    v-maska
                    size="medium"
                    data-maska="+38 ### ### ####"
                    :value="phone"
                    type="tel"
                    placeholder="+38"
                    @on-input="phoneChange"
                />
            </div>
            <div>
                <h5>Textarea</h5>
                <AppTextarea 
                    id="textarea"
                    :value="comment"
                    label-text="Comment"
                    is-required-field
                    is-disabled
                    @on-input="handleComment"
                />
            </div>
            <div>
                <AppTextarea 
                    id="textarea2"
                    :value="comment"
                    label-text="Comment"
                    is-required-field
                    @on-input="handleComment"
                />
            </div>
        </div>
        <div class="col" style="max-width: 300px;">
            <AppSelect :items="mockSelectItems" :active-item="mockSelectItems[3]">
                <template #heading-icon>
                    <AngleDownIcon />
                </template>
            </AppSelect>
        </div>
        <div class="col">
            <AppDropdown 
                :label="$t('blog.filters.categories')"
                :selected-count="2"
                position="left"
                swap-on-mobile
            >
                <template #heading-icon>
                    <SelectIcon />
                </template>
                <template #list>
                    <div class="custom list">
                        custom list here
                    </div>
                </template>
            </AppDropdown>
        </div>
        <div class="col">
            <AppBreadcrumbs :breadcrumbs="mockBreadcrumbs" size="small" />
        </div>
        <div class="col">
            <AppPickButton>
                тт
            </AppPickButton>
        </div>
        <div class="col">
            <AppPickButton to="/">
                link
            </AppPickButton>
        </div>
        <div class="col">
            <AppPickButton is-selected>
                вибрана
            </AppPickButton>
        </div>
    </div>
</template>

<script setup>
import { calculateRatingValueToMark } from '~/shared/utils/helpers'

import AngleDownIcon from '@/shared/assets/icons/angle-down.svg'
import AppButtonTypeIcon from '~/shared/ui/Buttons/AppButtonTypeIcon.vue'
import CloseIcon from '@/shared/assets/icons/close.svg'
import InstagramIcon from '@/shared/assets/icons/instagram.svg'
import TelegramIcon from '@/shared/assets/icons/telegram.svg'
import SelectIcon from '@/shared/assets/icons/select-icon.svg'

import AppTag from '~/shared/ui/Tags/AppTag.vue'
import AppButton from '~/shared/ui/Buttons/AppButton.vue'
import AppLink from '~/shared/ui/Links/AppLink.vue'
import AppTagPilled from '~/shared/ui/Tags/AppTagPilled.vue'
import AppRating from '~/shared/ui/Info/AppRating.vue'
import AppCheckbox from '~/shared/ui/Form/AppCheckbox.vue'
import AppBadge from '~/shared/ui/Info/AppBadge.vue'
import AppButtonSocial from '~/shared/ui/Buttons/AppButtonSocial.vue'
import AppPagination from '~/shared/ui/Navigation/AppPagination.vue'
import AppLoadMoreButton from '~/shared/ui/Navigation/AppLoadMoreButton.vue'
import AppTabs from '~/shared/ui/Tabs/AppTabs.vue'
import AppTabContent from '~/shared/ui/Tabs/AppTabContent.vue'
import AppTabsMulticheck from '~/shared/ui/Tabs/AppTabsMulticheck.vue'
import AppInput from '~/shared/ui/Form/AppInput.vue'
import AppTextarea from '~/shared/ui/Form/AppTextarea.vue'
import AppSelect from '~/shared/ui/Form/AppSelect.vue'
import AppBreadcrumbs from '~/shared/ui/Navigation/AppBreadcrumbs.vue'
import AppPickButton from '~/shared/ui/Buttons/AppPickButton.vue'
import AppDropdown from '~/shared/ui/Dropdown/AppDropdown.vue'

const activeTab = ref('tab2')
const tabs = [
    {
        value: 'tab1',
        label: 'Таб один'
    },
    {
        value: 'tab2',
        label: 'Таб два'
    },
    {
        value: 'tab3',
        label: 'Таб три'
    }
]

const mockBreadcrumbs = [
    { title: 'Послуги', alias: '/services' },
    { title: 'Продукт', alias: '/product' },
    { title: 'test', alias: '/test' }
]

const count = ref(0)
const handleCount = (value) => count.value = value

const comment = ref('')
const handleComment = (value) => comment.value = value

const activeMulti = ref([{ value: 'multicheck1', label: 'Multicheck один' }])

const phone = ref('+38 093 333 3333')

const phoneChange = (value) => {
    phone.value = value
}

const multicheckValues = ref([
    {
        value: 'multicheck1',
        label: 'Multicheck один'
    },
    {
        value: 'multicheck2',
        label: 'Multicheck два'
    },
    {
        value: 'multicheck3',
        label: 'Multicheck три'
    },
    {
        value: 'multicheck4',
        label: 'Multicheck три'
    }
])

const mockSelectItems = [
    { label: 'option 1', value: '1' },
    { label: 'option 2', value: '2' },
    { label: 'option 3', value: '3' },
    { label: 'option 4', value: '4' },
    { label: 'option 5', value: '5' },
    { label: 'option 6', value: '6' }
]

const toggleMulticheck = (item) => {
    const isActiveItem = activeMulti.value.find(
        (selected) => selected.value.includes(item.value)
    )

    activeMulti.value = isActiveItem 
        ? activeMulti.value.filter((el) => el.value !== item.value) 
        : [...activeMulti.value, item]
}

const handleCheckbox = (value) => console.log(value)
const onRateChange = (value) => console.log(value)
const onTabSelected = (selected) => {
    activeTab.value = selected
}

const REVIEWS_SUM = 7300
const REVIEWS_COUNT_ALL = 73

useHead({
    meta: [
        {
            name: 'robots',
            content: 'noindex, nofollow'
        }
    ]
})
</script>

<style lang="scss" scoped>
.container {
    padding: 10px 20px;
}

.col {
    margin: 20px 0;
}
</style>