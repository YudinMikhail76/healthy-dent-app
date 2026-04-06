<template>
    <div class="pagination">
        <div class="pagination__content">
            <ul class="pagination__list">
                <li
                    v-for="(element, index) in paginationArr"
                    :key="index"
                    class="pagination__item"
                >
                    <template v-if="element.isLink">
                        <AppPaginationItem
                            :color="getPaginationButtonColor(element)"
                            :to="getControlsLinks(element)"
                            :is-active="isPaginationItemActive(element)"
                            @click="onChange(element)"
                        >
                            {{ element.name }}
                        </AppPaginationItem>
                    </template>
                    <template v-else>
                        <span class="pagination__dots">
                            {{ element.name }}
                        </span>
                    </template>
                </li>
            </ul>
            <div class="pagination__controls">
                <AppButtonTypeIcon
                    :to="getControlsLinks(pagesArray[page - 1])"
                    :is-disabled="isPrevBtnDisabled"
                    position="center"
                    @click="onChange(pagesArray[page - 1])"
                >
                    <ChevronLeftIcon />
                </AppButtonTypeIcon>
                <AppButtonTypeIcon
                    :to="getControlsLinks(pagesArray[page + 1])"
                    :disabled="isNextBtnDisabled"
                    position="center"
                    @click="onChange(pagesArray[page + 1])"
                >
                    <ChevronRightIcon />
                </AppButtonTypeIcon>
            </div>
        </div>
        <!-- LOAD MORE BUTTON BEGIN -->
        <div v-if="!isNextBtnDisabled" class="pagination__heading">
            <AppLoadMoreButton
                :to="getControlsLinks(pagesArray[page + 1])"
                class="pagination__heading-button"
                full-width
                @click="onLoad(pagesArray[page + 1])"
            >
                <template #label>
                    {{ $t('pagination.seeMore') }}
                </template>
                <template #count>
                    {{ itemsToLoadCount }}
                </template>>
            </AppLoadMoreButton>
        </div>
        <!-- LOAD MORE BUTTON END -->
    </div>
</template>

<script setup>
import AppButtonTypeIcon from '~/shared/ui/Buttons/AppButtonTypeIcon.vue'
import ChevronRightIcon from '~/shared/assets/icons/chevron-right.svg'
import ChevronLeftIcon from '~/shared/assets/icons/chevron-left.svg'

import { scrollController } from '~/shared/utils/scrollController.js'
import { getQueries } from '~/shared/utils/queryHelper'
import { ref, computed } from 'vue'
import AppPaginationItem from './AppPaginationItem.vue'
import AppLoadMoreButton from './AppLoadMoreButton.vue'

const emit = defineEmits(['on-change', 'on-load'])
const props = defineProps({
    page: {
        type: Number,
        required: true
    },
    total: {
        type: Number,
        required: true
    },
    limit: {
        type: Number,
        required: true
    }
})
const route = useRoute()

const paginationGap = ref(2)

const pageCount = computed(() => {
    return Math.ceil(props.total / props.limit)
})
const filteredCurrentQueryString = computed(() => {
    return getQueries(route, ['page']).queryParams
})

const itemsToLoadCount = computed(() => {
    const { limit, total, page } = props

    const loadedItems = (page + 1) * limit // Вже завантажено (додаємо 1, бо сторінки починаються з 0)
    const remainingItems = total - loadedItems
    const loadableItems = Math.min(limit, Math.max(0, remainingItems)) // Скільки можна завантажити (враховуємо, щоб не було від'ємного значення)
    
    return loadableItems
})

// Array of all pages
const pagesArray = computed(() => {
    const arr = []

    for (let index = 0; index < pageCount.value; index++) {
        const queryStringWithPage = filteredCurrentQueryString.value
            ? `${ filteredCurrentQueryString.value }&page=${ index }`
            : `?page=${ index }`

        const name = `${ index + 1 }`
        const id = index
        const elementQueryString = index === 0
            ? filteredCurrentQueryString.value
            : queryStringWithPage
        const isLink = true

        const element = { name, id, elementQueryString, isLink }
        arr.push(element)
    }

    return arr
})

const dotsElement = computed(() => ({ name: '...', isLink: false }))

const currentPageElement = computed(() => {
    return pagesArray.value.find((element) => element.id === props.page)
})

const beforeCurrentPageArray = computed(() => {
    if (props.page > paginationGap.value) {
        const arr = []
        const dots = { ...dotsElement.value, id: 1000 }
        const firstElement = pagesArray.value[0]
        const beforeCurrentElement = pagesArray.value[props.page - 1]

        arr.push(firstElement, dots, beforeCurrentElement)
        return arr
    }

    return pagesArray.value.slice(0, props.page)
})

const afterCurrentPageArray = computed(() => {
    if (pageCount.value - 1 - props.page > paginationGap.value) {
        const arr = []
        const dots = { ...dotsElement.value, id: 999 }
        const lastElement = pagesArray.value[pageCount.value - 1]
        const afterCurrentElement = pagesArray.value[props.page + 1]

        arr.push(afterCurrentElement, dots, lastElement)
        return arr
    }

    return pagesArray.value.slice(props.page + 1, pageCount.value)
})

const paginationArr = computed(() => {
    return [
        ...beforeCurrentPageArray.value,
        currentPageElement.value,
        ...afterCurrentPageArray.value
    ]
})

const isPrevBtnDisabled = computed(() => props.page === 0)
const isNextBtnDisabled = computed(() => props.page === pageCount.value - 1)

function isPaginationItemActive(element) {
    return element.id === props.page
}

function getPaginationButtonColor(element) {
    return isPaginationItemActive(element) ? 'black-300' : 'wait-5'
}

function getControlsLinks(pageElement) {
    const id = pageElement?.id

    if (id === 0) return route.path + filteredCurrentQueryString.value
    if (!id) return

    return paginationArr.value.find((item) => item.id === id).elementQueryString
}

function generatePayload(element) {
    const queryParams = element.elementQueryString
    const queryParamsWithoutQuestionMark = element.elementQueryString.replace('?', '&')

    return { queryParams, queryParamsWithoutQuestionMark }
}

function onChange(element) {
    if (!element || props.page === element.id) return

    emit('on-change', generatePayload(element))
    scrollController.scrollToTop()
}

function onLoad(element) {
    emit('on-load', generatePayload(element))
}
</script>

<style scoped lang="scss">
.pagination {
    &__list {
        display: flex;
        align-items: center;
        gap: 5px;
    }

    &__link {
        color: $primary-300;
        border: 1px solid $primary-300;

        @media (any-hover: hover) {
            &:hover {
                color: $light;
                background-color: $primary-500;
                border-color: $primary-500;
            }
        }

        &::after {
            content: '';
            position: absolute;
            bottom: 6px;
            left: 8px;
            width: 8px;
            height: 8px;
            background-color: $primary-400;
            border-radius: 50%;
        }
    }

    &__dots {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 20px;
        height: 40px;
        font-size: 16px;
        font-weight: 700;
        line-height: 16px;
        color: $dark-500;
    }

    &__content {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: space-between;
        gap: 10px;
        margin-bottom: 5px;

        @media (min-width: $tablet-breakpoint) {
            margin-bottom: 8px;
        }

        @media (min-width: $tablet-breakpoint) {
            margin-bottom: 10px;
        }

        @media (min-width: $tablet-breakpoint) {
            margin-bottom: 12px;
        }
    }

    &__controls {
        display: flex;
        gap: 5px;
    }
}
</style>
