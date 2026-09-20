// Объект переводов (если не загружен извне)
const ratingTranslations = {
    ru: {
        filter_title: "Фильтрация рейтинга",
        filter_reset: "Сбросить всё",
        filter_label_search: "Поиск специалиста",
        filter_ph_search: "Введите имя или фамилию...",
        filter_label_role: "Роль / Статус",
        opt_all_roles: "Все роли",
        opt_role_master: "Мастер / Участник",
        opt_role_top: "Топ-мастер",
        opt_role_judge: "Судья международной категории",
        opt_role_speaker: "Спикер / Тренер",
        filter_label_direction: "Направление",
        opt_all_directions: "Все направления",
        opt_dir_pm: "Перманентный макияж",
        opt_dir_cosmetology: "Эстетическая косметология",
        opt_dir_lashes: "Lash & Brow",
        opt_dir_nails: "Nail-сервис",
        filter_label_section: "Секция",
        opt_all_sections: "Все секции",
        opt_sec_championship: "Чемпионатная секция",
        opt_sec_educational: "Образовательная секция",
        opt_sec_expert: "Экспертная коллегия",
        filter_label_category: "Категория участника",
        opt_all_categories: "Все категории",
        opt_cat_junior: "Юниор (опыт до 1 года)",
        opt_cat_master: "Мастер (опыт 1-3 года)",
        opt_cat_profi: "Профи (опыт от 3 лет)",
        opt_cat_grand: "Гранд-эксперт",
        no_results_text: "По заданным фильтрам специалисты не найдены."
    },
    en: {
        filter_title: "Filter Ratings",
        filter_reset: "Reset All",
        filter_label_search: "Search Specialist",
        filter_ph_search: "Enter first or last name...",
        filter_label_role: "Role / Status",
        opt_all_roles: "All Roles",
        opt_role_master: "Master / Participant",
        opt_role_top: "Top Master",
        opt_role_judge: "International Judge",
        opt_role_speaker: "Speaker / Trainer",
        filter_label_direction: "Direction",
        opt_all_directions: "All Directions",
        opt_dir_pm: "Permanent Makeup",
        opt_dir_cosmetology: "Aesthetic Cosmetology",
        opt_dir_lashes: "Lash & Brow",
        opt_dir_nails: "Nail Service",
        filter_label_section: "Section",
        opt_all_sections: "All Sections",
        opt_sec_championship: "Championship Section",
        opt_sec_educational: "Educational Section",
        opt_sec_expert: "Expert Board",
        filter_label_category: "Participant Category",
        opt_all_categories: "All Categories",
        opt_cat_junior: "Junior (up to 1 year)",
        opt_cat_master: "Master (1-3 years)",
        opt_cat_profi: "Profi (3+ years)",
        opt_cat_grand: "Grand Expert",
        no_results_text: "No specialists found matching the set filters."
    }
};

function translateRatingPage(lang) {
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (ratingTranslations[lang] && ratingTranslations[lang][key]) {
            if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                element.placeholder = ratingTranslations[lang][key];
            } else {
                element.innerHTML = ratingTranslations[lang][key];
            }
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    // 1. Инициализация языка
    const savedLang = localStorage.getItem('preferred_lang') || 'ru';
    translateRatingPage(savedLang);

    // Подсвечиваем активную кнопку языка при старте
    document.querySelectorAll('.lang-btn').forEach(btn => {
        if (btn.getAttribute('data-lang') === savedLang) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });

    // 2. Переключение языков
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.lang-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const lang = btn.getAttribute('data-lang') || 'ru';
            localStorage.setItem('preferred_lang', lang);
            translateRatingPage(lang);
        });
    });

    // 3. Переменные фильтрации
    const searchInput = document.getElementById('searchName');
    const roleSelect = document.getElementById('filterRole');
    const directionSelect = document.getElementById('filterDirection');
    const sectionSelect = document.getElementById('filterSection');
    const categorySelect = document.getElementById('filterCategory');
    const btnReset = document.getElementById('resetFilters');

    const rows = document.querySelectorAll('.rating-row');
    const noResults = document.getElementById('noResults');

    // Функция применения фильтров
    function applyFilters() {
        const query = searchInput ? searchInput.value.trim().toLowerCase() : '';
        const role = roleSelect ? roleSelect.value : 'all';
        const direction = directionSelect ? directionSelect.value : 'all';
        const section = sectionSelect ? sectionSelect.value : 'all';
        const category = categorySelect ? categorySelect.value : 'all';

        let visibleCount = 0;

        rows.forEach(row => {
            const rowRole = row.getAttribute('data-role') || '';
            const rowDirection = row.getAttribute('data-direction') || '';
            const rowSection = row.getAttribute('data-section') || '';
            const rowCategory = row.getAttribute('data-category') || '';

            const nameElem = row.querySelector('.spec-name');
            const nameText = nameElem ? nameElem.textContent.toLowerCase() : '';

            const matchesSearch = query === '' || nameText.includes(query);
            const matchesRole = role === 'all' || rowRole === role;
            const matchesDirection = direction === 'all' || rowDirection === direction;
            const matchesSection = section === 'all' || rowSection === section;
            const matchesCategory = category === 'all' || rowCategory === category;

            if (matchesSearch && matchesRole && matchesDirection && matchesSection && matchesCategory) {
                row.style.display = '';
                visibleCount++;
            } else {
                row.style.display = 'none';
            }
        });

        if (noResults) {
            noResults.style.display = visibleCount === 0 ? 'block' : 'none';
        }
    }

    // Слушатели событий
    [searchInput, roleSelect, directionSelect, sectionSelect, categorySelect].forEach(elem => {
        if (elem) {
            elem.addEventListener('input', applyFilters);
            elem.addEventListener('change', applyFilters);
        }
    });

    // Сброс
    if (btnReset) {
        btnReset.addEventListener('click', () => {
            if (searchInput) searchInput.value = '';
            if (roleSelect) roleSelect.value = 'all';
            if (directionSelect) directionSelect.value = 'all';
            if (sectionSelect) sectionSelect.value = 'all';
            if (categorySelect) categorySelect.value = 'all';
            applyFilters();
        });
    }
});