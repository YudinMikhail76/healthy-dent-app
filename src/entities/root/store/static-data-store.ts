import { defineStore } from 'pinia'
import { ref } from 'vue'
import type {
    IService,
    IAddress,
    IResponse,
    IPhones,
    IMessengers,
    ITimetable,
    ISocials,
    ISocialAuthItem,
    ILogo,
    IWorkSchedule,
    INotFoundLink,
    IDefaultMarketingLead,
    IHeaderMenu,
    IFooterMenu, IAggregateRating
} from '~/shared/interfaces/staticData'

export const useStaticDataStore = defineStore('static-data-store', () => {
    const logo = ref<ILogo | null>(null)

    const messengers = ref<IMessengers | null>(null)
    const socials = ref<ISocials | null>(null)
    const address = ref<IAddress | null>(null)
    const phones = ref<IPhones | null>(null)
    const services = ref<IService[] | null>(null)
    const socialAuth = ref<ISocialAuthItem[] | null>(null)
    const seoTimetable = ref<string[] | null>(null)
    const aggregateRating = ref<IAggregateRating | null>(null)

    const timetable = ref<ITimetable | null>(null)
    const workSchedule = ref<IWorkSchedule | null>(null)

    const footerMenu = ref<IFooterMenu | null>(null)
    const headerMenu = ref<IHeaderMenu | null>(null)
    const defaultMarketingLead = ref<IDefaultMarketingLead | null>(null)

    const notFoundLinks = ref<INotFoundLink[]>([])

    const SET_DATA = (payload: IResponse): void => {
        footerMenu.value = payload.footer_menu
        headerMenu.value = payload.header_menu
        services.value = payload.services
        phones.value = payload.phones
        messengers.value = payload.messengers
        socials.value = payload.socials
        address.value = payload.address
        logo.value = payload.logo
        timetable.value = payload.timetable
        workSchedule.value = payload.work_schedule
        notFoundLinks.value = payload.not_found_links
        socialAuth.value = payload.social_auth
        defaultMarketingLead.value = payload.default_marketing_lead
        seoTimetable.value = payload.seo_timetable
        aggregateRating.value = payload.reviews_aggregate_rating
    }

    return {
        headerMenu,
        footerMenu,
        messengers,
        socials,
        address,
        phones,
        services,
        logo,
        timetable,
        workSchedule,
        notFoundLinks,
        socialAuth,
        seoTimetable,
        defaultMarketingLead,
        aggregateRating,

        SET_DATA
    }
})
