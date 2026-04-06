import {
    required,
    minLength
} from '@vuelidate/validators'

export function returnReviewFormRules() {
    return {
        text: {
            required,
            minLength: minLength(2)
        }
    }
}
