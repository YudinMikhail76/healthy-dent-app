import { getCurrentLocale } from '~/shared/utils/helpers'

export function getMedicalWebpageMarkup({ staticData, serviceData, lang, path }) {
    const runtimeConfig = useRuntimeConfig()
    const phone = staticData.phones.values[0]
    const { mail } = staticData.address.values[0]
    const address = staticData.address.values[0]
    const socials = staticData.socials?.values || []

    return {
        "@context": "https://schema.org",
        "@type": "MedicalWebPage",
        inLanguage: lang,
        name: serviceData.hero_block?.title || serviceData.name || '',
        medicalAudience: "Patient",
        url: runtimeConfig.public.SITE_URL + path,
        isPartOf: {
            "@type": "WebSite",
            name: "Healthy Dent",
            url: runtimeConfig.public.SITE_URL
        },

        publisher: {
            "@type": "Dentist",
            name: "Healthy Dent",
            legalName: "УКРАЇНСЬКО-ШВЕЙЦАРСЬКА СТОМАТОЛОГІЧНА КЛІНІКА, ТОВ",
            url: runtimeConfig.public.SITE_URL,
            email: mail || "healthydent.kiev@gmail.com",
            telephone: phone,
            address: {
                "@type": "PostalAddress",
                streetAddress:  address?.value || '',
                addressLocality: address?.city || '',
                postalCode: address?.postal_code || '',
                addressCountry: "UA"
            },
            sameAs: socials.map(({ url }) => url)
        },

        author: {
            "@type": "Person",
            name: serviceData.author?.name || '',
            jobTitle: serviceData.author?.short_description || ''
        },

        reviewedBy: {
            "@type": "Person",
            name: serviceData.reviewer?.name || '',
            jobTitle: serviceData.reviewer?.short_description || ''
        },

        mainEntity: {
            "@type": "Service",
            name: serviceData.hero_block?.title || serviceData.name || '',
            serviceType: serviceData.name || '',
            areaServed: address?.city || '',
            availableChannel: [
                {
                    "@type": "ServiceChannel",
                    serviceUrl: `https://healthydent.ua${ getCurrentLocale(lang) }/contacts`
                }
            ]
        }
    }
}
