import { useHotTimeModalStore } from '~/entities/modals/ui/HotTimeModal/store/store'
import { useRootStore } from '~/entities/root/store/root-store'
import { useStaticDataStore } from '~/entities/root/store/static-data-store'

export const useFormMarketingValues = () => {
    const hotTimeModalStore = useHotTimeModalStore()
    const rootStore = useRootStore()
    const staticData = useStaticDataStore()

    const leadValue = computed(() => {
        return hotTimeModalStore.selectedMarketing?.cpaValue || rootStore.pageMarketing 
            ? rootStore.pageMarketing?.cpaValue 
            : staticData.marketing?.cpaValue || null
    })

    const leadClassification = computed(() => {
        return hotTimeModalStore.selectedMarketing?.id || rootStore.pageMarketing 
            ? rootStore.pageMarketing?.id 
            : staticData.marketing?.id || null
    })

    return {
        leadValue,
        leadClassification
    }
}