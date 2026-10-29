// js/form.js
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('bookingForm');
    
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const data = new FormData(form);
        const formData = Object.fromEntries(data.entries());
        
        // Добавляем UTM-метки из URL
        formData.utm_source = getUrlParameter('utm_source');
        formData.utm_medium = getUrlParameter('utm_medium');
        formData.utm_campaign = getUrlParameter('utm_campaign');
        formData.utm_content = getUrlParameter('utm_content');
        
        // Добавляем уникальный ID заявки
        formData.request_id = `REQ-${Math.random().toString(36).substr(2, 9)}`;
        
        try {
            const response = await fetch('/api/bookings', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            
            const result = await response.json();
            
            if (result.ok) {
                gtag('event', 'generate_lead', {
                    lead_quest: formData.quest_id,
                    players: formData.players,
                    value: calculatePrice(formData.quest_id, formData.players)
                });
                
                window.location.href = 'thanks.html';
