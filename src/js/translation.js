import i18next from 'i18next';

i18next.init({
    fallbackLng: 'en',
    resources: {
        en: {
            translation: {
                "morning": "Good morning,",
                "afternoon": "Good afternoon,",
                "evening": "Good evening,",
                "night": "Good night,",
                'placeholder': '[Enter your name]',
                'placeholderCity': '[Enter city]',
                'speed' : 'm/s',
                'lang' : 'English',
                'chooseLang': 'Choose languge',
                'chooseBack': 'Choose background image'
            }
        },
        ru: {
            translation: {
                "morning": "Доброе утро,",
                "afternoon": "Добрый день,",
                "evening": "Добрый вечер,",
                "night": "Доброй ночи,",
                'placeholder': '[Введите свое имя]',
                'placeholderCity': '[Введите город]',
                'speed' : 'м/с',
                'lang' : 'Русский',
                'chooseLang': 'Выберите язык',
                'chooseBack': 'Выберите фоновое изображение'
            }
        }
    }
});




