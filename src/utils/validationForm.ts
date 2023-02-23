const REQUIRED_FIELD = 'Обязательно для заполнения';
const PRICE_FIELD = 1000000
export const emailValidation = {
    required: REQUIRED_FIELD,
    validate: (value: string) => {
        if(!value.toString().match(/^(\S+)@([a-z0-9-]+)(\.)([a-z]{2,4})(\.?)([a-z]{0,4})+$/g)){
            return 'Неверная почта'
        }
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
        if (value.length < 3) {
            return 'Имя должно быть длинее 3 символов'
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
            return 'Можно вводить только числовые значения'
        }
        return true;
    }
}