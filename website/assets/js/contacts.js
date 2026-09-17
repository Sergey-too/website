// Обработка отправки формы контактов
function handleFormSubmit(event) {
    event.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    
    alert(`Спасибо, ${name}! Ваше сообщение отправлено. Мы ответим вам на ${email}.`);
    document.getElementById('contactForm').reset();
}