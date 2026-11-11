const inputA = document.getElementById('inputA');
const inputB = document.getElementById('inputB');
const inputC = document.getElementById('inputC');
const button = document.getElementById('button');
const answer = document.getElementById('answer');

// Функция для красивого округления
const formatNumber = (num) => Number(num.toFixed(4));

button.addEventListener('click', () => {
    // Сбрасываем классы анимации перед новым выводом
    answer.className = 'answer-box';

    // Проверка на пустые поля
    if (inputA.value.trim() === '' || inputB.value.trim() === '' || inputC.value.trim() === '') {
        answer.textContent = 'Ошибка: заполните все поля.';
        answer.classList.add('error', 'show');
        return;
    }

    // Получаем числа
    const a = parseFloat(inputA.value);
    const b = parseFloat(inputB.value);
    const c = parseFloat(inputC.value);

    // Проверка, что введены числа (защита от букв)
    if (isNaN(a) || isNaN(b) || isNaN(c)) {
        answer.textContent = 'Ошибка: введите числовые значения.';
        answer.classList.add('error', 'show');
        return;
    }

    // Если 'a' равно нулю — это не квадратное уравнение
    if (a === 0) {
        answer.innerHTML = 'Это не квадратное уравнение.<br>Коэффициент <b>a</b> не может быть равен 0.';
        answer.classList.add('warning', 'show');
        return;
    }

    // Вычисляем дискриминант
    const d = b ** 2 - 4 * a * c;

    // Проверяем дискриминант
    if (d > 0) {
        const x1 = formatNumber((-b + Math.sqrt(d)) / (2 * a));
        const x2 = formatNumber((-b - Math.sqrt(d)) / (2 * a));
        answer.innerHTML = `
            Два корня:<br>
            <b>x₁ = ${x1}</b><br>
            <b>x₂ = ${x2}</b><br>
            <small style="opacity: 0.7">D = ${formatNumber(d)} > 0</small>
        `;
        answer.classList.add('success', 'show');
    } 
    else if (d === 0) {
        const x = formatNumber(-b / (2 * a));
        answer.innerHTML = `
            Один корень:<br>
            <b>x = ${x}</b><br>
            <small style="opacity: 0.7">D = 0</small>
        `;
        answer.classList.add('warning', 'show');
    } 
    else {
        answer.innerHTML = `
            Нет действительных корней.<br>
            <small style="opacity: 0.7">D = ${formatNumber(d)} < 0</small>
        `;
        answer.classList.add('error', 'show');
    }
});