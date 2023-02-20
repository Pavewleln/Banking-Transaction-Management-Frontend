const REQUIRED_FIELD = 'Обязательно для заполнения';

export const phoneValidation = {
    required: REQUIRED_FIELD,
    validate: (value: string) => {
        if(value.match(/[a-zA-Z]/g)) {
            return 'Номер телефона не поддерживает буквы'
        }
        if(value.match(/[а-яА-Я]/)){
            return 'Номер телефона не поддерживает буквы'
        }
        return true;
    }
};

export const passwordValidation = {
    required: REQUIRED_FIELD,
    validate: (value: string) => {
        if(value.length < 6) {
            return 'Пароль должен длиннее 6-ти символов'
        }
        if(value.length > 15) {
            return 'Пароль должен быть короче 15 символов'
        }
        return true;
    }
};
export const nameValidation = {
    required: REQUIRED_FIELD,
    validate: (value: string) => {
        if(value.length > 15) {
            return 'Имя должно быть короче 15 символов'
        }
        return true;
    }
}
export const surnameValidation = {
    required: REQUIRED_FIELD,
    validate: (value: string) => {
        if(value.length > 15) {
            return 'Фамилия должна быть короче 15 символов'
        }
        return true;
    }
}