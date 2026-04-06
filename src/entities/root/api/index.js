import { apiFetch } from '~/app/api'
import { getCurrentLocale } from '~/shared/utils/helpers'

export const rootService = {
    getStaticData(lang) {
        return apiFetch(`${ getCurrentLocale(lang) }/api/v1/get-static-data`)
    }
}