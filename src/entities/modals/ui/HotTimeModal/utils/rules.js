import {
    required,
    minLength
} from '@vuelidate/validators'

export function returnHotTimeFormRules() {
    return {
        name: {
            required,
            minLength: minLength(2)
        },
        phone: {
            required,
            minLength: minLength(16)
        }
    }
}
