export const MARKETING_EVENTS = {
    MAIN: 'form_main',
    DISCOUNT: 'form_aktsii',
    PORTFOLIO: 'form_portfolio',
    DOCTOR: 'form_likar',
    PARAGRAPHS_OTHER: 'form_other',
    APPOINTMENT_DEFAULT: 'form_zapis_na_priyom'
}

export function runDataLayerEvent(event) {
    window.dataLayer = window.dataLayer || []
    dataLayer.push({
        path: window.location.href,
        event,
    })
}

export function pushDataLayerEvent(data) {
    window.dataLayer = window.dataLayer || []
    dataLayer.push(data)
}