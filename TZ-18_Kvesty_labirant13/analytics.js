// js/analytics.js

// Инициализация Google Analytics
gtag('js', new Date());
gtag('config', 'G-2D8BXSD9J3', {
    page_title: document.title,
    page_location: window.location.href
});

// Функция для отправки событий
function sendEvent(eventName, params = {}) {
    try {
        gtag('event', eventName, {
            ...params,
            event_category: 'website',
            event_label: document.location.pathname
        });
    } catch(error) {
        console.error('Ошибка отправки события:', error);
    }
}

// Обработка событий с data-атрибутами
document.addEventListener('DOMContentLoaded', () => {
    // Собираем все элементы с data-event
    const elements = document.querySelectorAll('[data-event]');
    
    elements.forEach(element => {
        const eventName = element.dataset.event;
        const buttonName = element.dataset.buttonName || null;
        const pageSection = element.dataset.pageSection || null;
        
        element.addEventListener('click', (event) => {
            // Предотвращаем стандартное поведение
            event.preventDefault();
            
            // Собираем параметры события
            const eventParams = {
                button_name: buttonName,
                page_section: pageSection
            };
            
            // Отправляем событие
            sendEvent(eventName, eventParams);
            
            // Выполняем действие
            if (element.href) {
                window.location.href = element.href;
            }
        });
    });
});

// Обработка ошибок формы
function handleFormError(fieldName, errorType) {
    sendEvent('form_error', {
        field_name: fieldName,
        error_type: errorType
    });
}

// Обработка выбора квеста
document.addEventListener('change', (event) => {
    if (event.target.dataset.questFilter) {
        sendEvent('quest_filter', {
            genre: document.querySelector('[name="genre"]').value,
            difficulty: document.querySelector('[name="difficulty"]').value,
            age_limit: document.querySelector('[name="age"]').value
        });
    }
});

// Обработка выбора слота
function trackSlotSelection(questId, slotDate, slotTime, players) {
    const dayType = getDayType(slotDate);
    const totalPrice = calculatePrice(questId, players);
    
    sendEvent('slot_select', {
        quest_id: questId,
        slot_date: slotDate,
        slot_time: slotTime,
        players: players,
        day_type: dayType,
        total_price: totalPrice
    });
}

// Вспомогательная функция для определения типа дня
function getDayType(date) {
    const day = new Date(date).getDay();
    const hour = new Date(date).getHours();
    
    if (day >= 1 && day <= 5) {
        return hour < 17 ? 'weekday_day' : 'weekday_evening';
    } else {
        return 'weekend';
    }
}

// Расчет цены
function calculatePrice(questId, players) {
    let basePrice;
    
    switch(questId) {
        case 'bunker':
            basePrice = 4800;
            break;
        default:
            basePrice = players <= 4 ? 3600 : 4800;
    }
    
    const extraPlayers = Math.max(0, players - 4);
    return basePrice + extraPlayers * 600;
}
