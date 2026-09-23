document.addEventListener('DOMContentLoaded', () => {
    const selectStatus = document.getElementById('filterStatus');
    const selectDirection = document.getElementById('filterDirection');
    const selectCountry = document.getElementById('filterCountry');
    const selectCity = document.getElementById('filterCity');
    const resetBtn = document.getElementById('filterReset');
    const cards = document.querySelectorAll('.specialist-card');
    const empty = document.getElementById('specialistsEmpty');

    function applyFilters() {
        const status = selectStatus.value;
        const direction = selectDirection.value;
        const country = selectCountry.value;
        const city = selectCity.value;

        let visible = 0;

        cards.forEach(card => {
            const ok =
                (!status || card.dataset.status === status) &&
                (!direction || card.dataset.direction === direction) &&
                (!country || card.dataset.country === country) &&
                (!city || card.dataset.city === city);

            card.classList.toggle('is-hidden', !ok);
            if (ok) visible++;
        });

        if (empty) empty.hidden = visible > 0;
    }

    [selectStatus, selectDirection, selectCountry, selectCity].forEach(sel => {
        if (sel) sel.addEventListener('change', applyFilters);
    });

    if (resetBtn) {
        resetBtn.addEventListener('click', () => {
            [selectStatus, selectDirection, selectCountry, selectCity].forEach(sel => {
                if (sel) sel.value = '';
            });
            applyFilters();
        });
    }
});