const translations = {
    ru: {
        // Шапка и навигация
        nav_about: "Об ассоциации",
        nav_events: "Чемпионаты",
        nav_specialists: "Специалисты",
        nav_rating: "Рейтинг",
        nav_contacts: "Контакты",
        btn_login: "Войти",

        // Главная
        hero_badge: "Официальный портал ассоциации",
        hero_title_1: "Международная ассоциация",
        hero_desc: "Объединение экспертов, проведение международных чемпионатов, аккредитация мастеров и прозрачный накопительный рейтинг.",
        btn_events: "Ближайшие чемпионаты",
        btn_apply: "Подать заявку",
        events_title: "Ближайшие чемпионаты",
        events_subtitle: "Принимайте участие и зарабатывайте баллы в общий рейтинг",
        card_1_tag: "ОНЛАЙН / ОФЛАЙН",
        card_1_desc: "Международный чемпионат специалистов бьюти-индустрии и эстетической медицины.",
        card_2_tag: "МАРАФОН",
        card_2_desc: "Ежегодный кубок с участием международных судей и премиум-номинаций.",
        btn_more: "Подробнее →",
        rating_title: "Рейтинг специалистов",
        rating_subtitle: "Накопительный рейтинг на основе результатов аккредитованных чемпионатов",
        th_name: "Специалист",
        th_status: "Статус",
        th_score: "Баллы",

        // Контакты (Инфо)
        contacts_title: "Связаться с нами",
        contacts_subtitle: "Мы всегда открыты к сотрудничеству и готовы ответить на ваши вопросы",
        contacts_office_title: "Главный офис",
        contacts_office_val: "г. Москва, ул. Пресненская наб., д. 12",
        contacts_email_title: "Электронная почта",
        contacts_phone_title: "Телефон",

        // Контакты (Форма)
        form_label_name: "Ваше имя",
        form_label_email: "Email",
        form_label_message: "Сообщение",
        form_btn_submit: "Отправить",

        // Подвал
        footer_rights: "Все права защищены.",
        privacy_policy: "Политика конфиденциальности"
    },
    en: {
        // Navigation
        nav_about: "About Us",
        nav_events: "Championships",
        nav_specialists: "Specialists",
        nav_rating: "Ranking",
        nav_contacts: "Contacts",
        btn_login: "Sign In",

        // Main page
        hero_badge: "Official Association Portal",
        hero_title_1: "International Association",
        hero_desc: "Uniting experts, hosting international championships, accrediting masters, and providing a transparent cumulative ranking.",
        btn_events: "Upcoming Events",
        btn_apply: "Apply Now",
        events_title: "Upcoming Championships",
        events_subtitle: "Participate and earn points for the global ranking",
        card_1_tag: "ONLINE / OFFLINE",
        card_1_desc: "International championship for beauty industry and aesthetic medicine specialists.",
        card_2_tag: "MARATHON",
        card_2_desc: "Annual cup featuring international judges and premium nominations.",
        btn_more: "Learn More →",
        rating_title: "Specialist Ranking",
        rating_subtitle: "Cumulative ranking based on accredited championship results",
        th_name: "Specialist",
        th_status: "Status",
        th_score: "Points",

        // Contacts (Info)
        contacts_title: "Contact Us",
        contacts_subtitle: "We are always open to cooperation and ready to answer your questions",
        contacts_office_title: "Head Office",
        contacts_office_val: "12 Presnenskaya Embankment, Moscow",
        contacts_email_title: "Email",
        contacts_phone_title: "Phone",

        // Contacts (Form)
        form_label_name: "Your Name",
        form_label_email: "Email",
        form_label_message: "Message",
        form_btn_submit: "Send Message",

        // Footer
        footer_rights: "All rights reserved.",
        privacy_policy: "Privacy Policy"
    }
};  

// Функция переключения языка
function changeLanguage(lang) {
    // Сохраняем выбранный язык
    localStorage.setItem('preferred_lang', lang);

    // Обновляем тексты
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (translations[lang] && translations[lang][key]) {
            element.textContent = translations[lang][key];
        }
    });

    // Обновляем состояние кнопок
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.textContent.toLowerCase() === lang) {
            btn.classList.add('active');
        }
    });
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    // Анимация fade-in
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

    // Проверяем сохраненный язык
    const savedLang = localStorage.getItem('preferred_lang') || 'ru';
    if (savedLang !== 'ru') {
        changeLanguage(savedLang);
    }
});