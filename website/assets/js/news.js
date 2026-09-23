document.addEventListener('DOMContentLoaded', () => {
    const tabs = document.querySelectorAll('.news-tab');
    const cards = document.querySelectorAll('.news-card');
    const featured = document.querySelector('.news-featured');
    const empty = document.getElementById('newsEmpty');

    if (!tabs.length) return;

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const filter = tab.dataset.filter;

            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            let visible = 0;

            cards.forEach(card => {
                const match = filter === 'all' || card.dataset.category === filter;
                card.classList.toggle('is-hidden', !match);
                if (match) visible++;
            });

            // Featured показываем только во вкладке «Все» или «Анонсы»
            if (featured) {
                const showFeatured = filter === 'all' || filter === 'announce';
                featured.classList.toggle('is-hidden', !showFeatured);
                if (showFeatured) visible++;
            }

            if (empty) empty.hidden = visible > 0;
        });
    });
});