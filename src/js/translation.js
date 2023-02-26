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
                'placeholderTodo': '[Create your task]',
                'speed' : 'm/s',
                'time' : 'Time' ,
                'date' : 'Date',
                'greet' : 'Greeting',
                'quotes' : 'Quotes',
                'weather': 'Weather',
                'audio': 'Audio',
                'todolist': 'Todo List',
                'emptyList': 'Empty List'

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
                'placeholderTag': '[Введите тэги]',
                'placeholderTodo': '[Создать задачу]',
                'speed' : 'м/с',
                'time' : 'Время' ,
                'date' : 'Дата',
                'greet' : 'Приветствие',
                'quotes' : 'Цитата',
                'weather': 'Погода',
                'audio': 'Аудио',
                'todolist': 'Список задач',
                'emptyList': 'Список задач пуст'

            }
        }
    }
});




