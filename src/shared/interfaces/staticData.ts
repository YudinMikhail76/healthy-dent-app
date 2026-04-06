import type { IImage } from "./images"

export interface IAddress {
    title: string,
    values: IAddressValue[]
}

export interface IAddressValue {
    city: string,
    desc: string,
    map_lat: string,
    map_lng: string,
    phone: string,
    phone_desc: string,
    url: string,
    value: string,
    title: string,
    text: string
}

export interface IService {
    title: string,
    tid: number,
    marketing_event: string,
    alias: string,
    image: IImage,
    children: IServiceChild[],
    discounts: IDiscount[],
    hot_hours: IHotHour[],
}

export interface IServiceChild {
    title: string,
    alias: string,
    marketing_event: string,
    tid: number,
    discounts: IDiscount[]
}

export interface IHotHour {
    description: string,
    discount: string,
    title: string,
    valid_till: string | null
}

export interface IDiscount {
    discount: string,
    title: string,
    valid_till: string | null
}

export interface IPhones {
    title: string,
    values: string[]
}

export interface IMessengersValue {
    type: string,
    url: string
}

export interface IMessengers {
    title: string,
    values: IMessengersValue[]
}

export interface ISocials {
    title: string,
    values: { type: string, url: string }[]
}

export interface ISocialAuthItem {
    id: string,
    short_name: string,
    url: string
}

export interface ITimetable {
    title: string,
    days: { center: string, end: string, start: string }[],
    weekend_dates: []
}

export interface ILogo {
    svg: string,
    url: string
}

export interface ILocales {
    current_language: string,
    current_locale: string,
    ru: string,
    uk: string,
}

export interface IWorkSchedule {
    title: string,
    values: {
        title_days: string,
        title_hours: string,
        title_hours_additional: string,
        week_days: number[] | string[]
    }[]
}

export interface INotFoundLink {
    url: string,
    text: string
}

export interface IDefaultMarketingLead {
    cpaValue: number,
    event: string,
    id: number
}

interface IHeaderMenuBlock<T> {
    machine_name: string
    title: string
    items: T[]
}


export interface IHeaderMenu {
    left: IHeaderMenuBlock<IHeaderMenuLeftItem>,
    right: IHeaderMenuBlock<IHeaderMenuRightItem>
}

export interface IHeaderMenuLeftItem {
    description: string,
    id: number,
    title: string,
    url: string
}

export interface IHeaderMenuRightItem {
    description: string,
    id: number,
    title: string,
    url: string,
    services_link: boolean,
    prices_link?: boolean,
    image: IImage
}

export interface IFooterMenu {
    machine_name: string,
    title: string,
    items: IFooterMenuItem[]
}

export interface IFooterMenuItem {
    description: string,
    id: number,
    title: string,
    url: string,
    menu: IFooterDropdownItem[]
}

export interface IFooterDropdownItem {
    description: string,
    id: number,
    title: string,
    url: string
}

export interface IAggregateRating {
    avg: number,
    count: number,
    sum: number,
}

export interface IResponse {
    address: IAddress,
    services: IService[],
    phones: IPhones,
    messengers: IMessengers,
    socials: ISocials,
    social_auth: ISocialAuthItem[],
    timetable: ITimetable,
    logo: ILogo,
    locales: ILocales,
    work_schedule: IWorkSchedule,
    not_found_links: INotFoundLink[],
    header_menu: IHeaderMenu,
    footer_menu: IFooterMenu,
    seo_timetable: string[],
    reviews_aggregate_rating: IAggregateRating,
    default_marketing_lead: IDefaultMarketingLead
}

export type TServices = IService[]

export interface IStaticData {
    footerMenu: IFooterMenu | null,
    headerMenu: IHeaderMenu | null,
    defaultMarketingLead: IDefaultMarketingLead | null,
    workSchedule: IWorkSchedule | null,
    timetable: ITimetable | null,
    socialAuth: ISocialAuthItem[] | null,
    services: IService[] | null,
    phones: IPhones | null,
    address: IAddress | null,
    socials: ISocials | null,
    messengers: IMessengers | null,
    logo: ILogo | null,
    // eslint-disable-next-line
    SET_DATA: (payload: IStaticData) => void
} 