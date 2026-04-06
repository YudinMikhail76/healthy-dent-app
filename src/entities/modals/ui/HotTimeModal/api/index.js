import { apiFetch } from '~/app/api'
import { getCurrentLocale } from '~/shared/utils/helpers'

export const addHotHours = (options) => {
    const { 
        lang,
        name,
        subject,
        phone,
        url,
        timestampFrom,
        timestampTo,
        system_name,
        service,
        ga4Code,
        leadClassification,
        leadValue
    } = options

    return apiFetch(`${ getCurrentLocale(lang) }/api/v1/add-hot-hours`, {
        method: 'POST',
        body: {
            name,
            subject,
            phone,
            url,
            timestamp_from: timestampFrom,
            timestamp_to: timestampTo,
            system_name,
            service,
            ga4_code: ga4Code,
            lead_classification: leadClassification,
            lead_value: leadValue
        }
    })
}