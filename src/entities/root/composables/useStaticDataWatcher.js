import { useStaticDataStore } from '~/entities/root/store/static-data-store'
import { rootService } from '../api'

export const useStaticDataWatcher = async () => {
    const { locale } = useI18n()
    const staticDataStore = useStaticDataStore()

    const { data } = await useAsyncData('staticData', async () => await populateStaticData())

    async function populateStaticData() {
        const response = await rootService.getStaticData(locale.value)

        staticDataStore.SET_DATA(response)

        return response
    }

    watch(() => locale.value, () => populateStaticData())

    return {
        data
    }
}