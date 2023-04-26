export const requiredTaskNameMixin = {
    methods: {
        requiredTaskName () {
            if (this.isValid) {
                return true; 
            } else {
                return "Это обязательное поле"
            }
        }
    }
}

