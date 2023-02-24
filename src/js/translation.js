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
                'placeholderTag': '[Type tags]',
                'speed' : 'm/s',
                'time' : 'Time' ,
                'date' : 'Date',
                'greet' : 'Greeting',
                'quotes' : 'Quotes',
                'weather': 'Weather',
                'audio': 'Audio',
                'todolist': 'Todo List'
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
                'placeholderTag': '[Напишите теги]',
                'speed' : 'м/с',
                'time' : 'Время' ,
                'date' : 'Дата',
                'greet' : 'Приветствие',
                'quotes' : 'Цитата',
                'weather': 'Погода',
                'audio': 'Аудио',
                'todolist': 'Список дел'
            }
        }
    }
});




