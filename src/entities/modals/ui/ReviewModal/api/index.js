import { apiFetch } from '~/app/api'
import { getCurrentLocale } from '~/shared/utils/helpers'

export const reviewModal = {
    getDataForNewReview(lang) {
        return apiFetch(`${ getCurrentLocale(lang) }/api/v1/get-data-for-new-review`)
    },
    getGlobalVariables(lang) {
        return apiFetch(`${ getCurrentLocale(lang) }/api/v1/get-global-variables`)
    },
    addReview(body, lang) {
        return apiFetch(`${ getCurrentLocale(lang) }/api/v1/add-review`, {
            method: 'POST',
            body
        })
    },
    getReviewsNodePage(lang) {
        return apiFetch(`${ getCurrentLocale(lang) }/api/v1/get-reviews`)
    }
}