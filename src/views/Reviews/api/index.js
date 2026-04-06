import { getCurrentLocale } from '~/shared/utils/helpers'
import { apiFetch } from '~/app/api'

export const getReviewsNodePage = ({ lang, queryParams = '' }) => {
    return apiFetch(`${ getCurrentLocale(lang) }/api/v1/get-reviews/${ queryParams }`)
}