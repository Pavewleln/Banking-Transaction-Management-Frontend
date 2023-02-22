const REQUIRED_FIELD = 'Обязательно для заполнения';
const PRICE_FIELD = 1000000
export const phoneValidation = {
    required: REQUIRED_FIELD,
    validate: (value: string) => {
        return true;
    }
};

export const passwordValidation = {
    required: REQUIRED_FIELD,
    validate: (value: string) => {
        if (value.length < 6) {
            return 'Пароль должен длиннее 6-ти символов'
        }
        if (value.length > 15) {
            return 'Пароль должен быть короче 15 символов'
        }
        return true;
    }
};
export const fullnameValidation = {
    required: REQUIRED_FIELD,
    validate: (value: string) => {
        if (value.length > 15) {
            return 'Имя должно быть короче 20 символов'
        }
        return true;
    }
}

export const transferValidation = {
    required: REQUIRED_FIELD,
    validate: (value: number) => {
        if (value > PRICE_FIELD) {
            return `Переводы больше чем ${PRICE_FIELD} не возможны`
        }
        if(value.toString().match(/\W/g)){
            return 'Можно вводить только цифры'
        }
        return true;
    }
}