export function transformFiltersArray(array = []) {
    return array.map((item) => ({ 
        label: item.name,
        value: item.machine_name, 
        ...item 
    }))
}

export function transformFilterFacet(item) {
    return {
        label: item.name,
        value: item.machine_name, 
        ...item 
    }
}

export const getItemsObjectByType = (items, type) => items.find((item) => item.machine_name === type)

export const CHARACTERISTICS_ID = {
    category: 1, 
    problem: 2 
}