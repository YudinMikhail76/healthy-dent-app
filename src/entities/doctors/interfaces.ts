import type { IImage } from "~/shared/interfaces"

export interface IDoctor {
    description: string,
    description_list: string,
    experience: number,
    last_name: string,
    middle_name: string,
    name: string,
    perk: string,
    specialization: string,
    cases_count: {
        count: number
    },
    reviews: {
        count: number
    },
    photo: IImage,
    link: {
        title: string,
        url: string
    }
}