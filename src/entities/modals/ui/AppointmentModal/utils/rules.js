import {
    required,
    minLength
} from '@vuelidate/validators'

export function returnAppointmentFormRules() {
    return {
        name: {
            required,
            minLength: minLength(2)
        },
        phone: {
            required,
            minLength: minLength(16)
        },
        message: {
            required,
            minLength: minLength(2)
        }
    }
}
