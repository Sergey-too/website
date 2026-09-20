// Словарь переводов ТОЛЬКО для страницы документов
const documentsTranslations = {
    ru: {
        // Hero секция
        docs_hero_badge: "Информация",
        docs_hero_title: "Официальные документы",
        docs_hero_desc: "Регламенты, положения, стандарты аккредитации и бланки заявок, доступные для ознакомления и скачивания.",
        search_docs_placeholder: "Поиск по названию документа...",
        
        // Категория 1
        cat_regulations_title: "Регламенты и правила соревнований",
        cat_regulations_desc: "Официальные документы, регулирующие порядок проведения чемпионатов и судейство",
        doc1_title: "Общий регламент чемпионатов GABI 2026",
        doc2_title: "Кодекс судейской этики и правила оценивания IEEBA",
        doc3_title: "Положение о подаче апелляций и протестов",
        
        // Категория 2
        cat_accreditation_title: "Аккредитация и членство",
        cat_accreditation_desc: "Требования к специалистам, судейской коллегии и учебным центрам",
        doc4_title: "Стандарты аккредитации бьюти-школ и академий",
        doc5_title: "Положение о статусе международного судьи GABI",
        
        // Категория 3
        cat_forms_title: "Бланки и формы заявок",
        cat_forms_desc: "Шаблоны документов для заполнения и отправки в оргкомитет",
        doc6_title: "Заявление на вступление в ассоциацию (физ. лица)",
        doc7_title: "Анкета на аккредитацию учебного центра",
        
        // Вспомогательные
        doc_updated: "Обновлено: Январь 2026",
        btn_download: "Скачать",
        
        // CTA Блок
        docs_cta_title: "Не нашли нужный документ?",
        docs_cta_desc: "Отправьте запрос в юридический отдел или оргкомитет ассоциации, и мы предоставим необходимую информацию.",
        cta_btn_contact: "Запросить документ"
    },
    en: {
        // Hero section
        docs_hero_badge: "Information",
        docs_hero_title: "Official Documents",
        docs_hero_desc: "Regulations, standards, accreditation policies, and application forms available for download.",
        search_docs_placeholder: "Search documents by title...",
        
        // Category 1
        cat_regulations_title: "Regulations and Competition Rules",
        cat_regulations_desc: "Official documents governing championships and judging procedures",
        doc1_title: "General Regulations for GABI Championships 2026",
        doc2_title: "Code of Judging Ethics and IEEBA Evaluation Rules",
        doc3_title: "Regulations on Filing Appeals and Protests",
        
        // Category 2
        cat_accreditation_title: "Accreditation and Membership",
        cat_accreditation_desc: "Requirements for specialists, judging panels, and training centers",
        doc4_title: "Accreditation Standards for Beauty Schools and Academies",
        doc5_title: "Regulations on the Status of GABI International Judge",
        
        // Category 3
        cat_forms_title: "Application Forms and Templates",
        cat_forms_desc: "Document templates for filling out and submitting to the organizing committee",
        doc6_title: "Association Membership Application (Individuals)",
        doc7_title: "Training Center Accreditation Questionnaire",
        
        // Meta
        doc_updated: "Updated: January 2026",
        btn_download: "Download",
        
        // CTA Block
        docs_cta_title: "Didn't find the required document?",
        docs_cta_desc: "Send a request to the legal department or organizing committee, and we will provide the necessary information.",
        cta_btn_contact: "Request Document"
    }
};

// Перевод элементов только этой страницы
function translateDocumentsPage(lang) {
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        
        if (documentsTranslations[lang] && documentsTranslations[lang][key]) {
            if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                element.placeholder = documentsTranslations[lang][key];
            } else {
                element.innerHTML = documentsTranslations[lang][key];
            }
        }
    });
}

// При загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    // 1. Применяем сохраненный язык для текущей страницы
    const savedLang = localStorage.getItem('preferred_lang') || 'ru';
    translateDocumentsPage(savedLang);

    // 2. Отслеживаем клики по кнопкам переключения языка
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const lang = localStorage.getItem('preferred_lang') || 'ru';
            translateDocumentsPage(lang);
        });
    });

    // 3. Логика поиска по документам в реальном времени
    const searchInput = document.getElementById('docSearch');
    const categories = document.querySelectorAll('.docs-category');

    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase().trim();

            categories.forEach(category => {
                let visibleCardsInCategory = 0;
                const cardsInCategory = category.querySelectorAll('.doc-card');

                cardsInCategory.forEach(card => {
                    const title = card.querySelector('h3') ? card.querySelector('h3').textContent.toLowerCase() : '';
                    const meta = card.querySelector('.doc-meta') ? card.querySelector('.doc-meta').textContent.toLowerCase() : '';

                    if (title.includes(query) || meta.includes(query)) {
                        card.style.display = 'flex';
                        visibleCardsInCategory++;
                    } else {
                        card.style.display = 'none';
                    }
                });

                if (visibleCardsInCategory === 0 && query !== '') {
                    category.style.display = 'none';
                } else {
                    category.style.display = 'block';
                }
            });
        });
    }
});