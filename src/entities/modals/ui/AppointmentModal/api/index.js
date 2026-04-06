import { apiFetch } from '~/app/api'
import { getCurrentLocale } from '~/shared/utils/helpers'

export const appointmentModalApi = {
    addMakeAnAppointment(body, lang) {
        return apiFetch(`${ getCurrentLocale(lang) }/api/v1/add-make-an-appointment`, {
            method: 'POST',
            body
        })
    }
}