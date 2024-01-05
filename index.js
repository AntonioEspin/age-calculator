const button = document.querySelector('.button');
button.addEventListener('click', showAge)

// Esta funcion coloca un cero antes del numero si es menor a 10
function getFormattedNumber (number) {
  const formatNumber = number >= 10 ? number: `${0}${number}`;
  return Number(formatNumber);
};

// Esta función obtiene la fecha actual
function getCurrentDate () {
  const date = new Date();

  const currentYear = date.getFullYear();
  const currentMonth = date.getMonth() + 1;
  const currentDay = date.getDate();

  return [currentDay, currentMonth, currentYear];
};

// Funcion para calcular la edad exacta
function getExactAge (day, month, year) {
  // Convertimos a tipo numero el valor de los inputs
  const birthDay = parseInt(day) ;
  const birthMonth = parseInt(month);
  const birthYear = parseInt(year);

  // Destructuramos el resultado de la función getCurrentDate()
  const [currentDay,currentMonth, currentYear] = getCurrentDate()

  let ageDay = currentDay - birthDay;
  let ageMonth = currentMonth - birthMonth;
  let ageYear = currentYear - birthYear;

  // Si los valores son negativos aplicamos la siguiente logica para obtener la edad exacta

  if (ageMonth < 0 || (ageMonth === 0 && ageDay < 0)) {
    ageYear--; // restamos un año al resultado de ageYear
    ageMonth += 12; //sumamos los 12 meses del año restado para obtener el valor positivo.
  };

  if (ageDay < 0) {
    // Obtenemos los dias del mes anterior
    const afterMonthDays = new Date(currentYear, currentMonth - 1, 0).getDate();
    ageDay+= afterMonthDays; //Sumamos los dias de mes anterior con el resultado de ageDay.
    ageMonth--;// Restamos 1 al resultado de ageMonth para definir el mes exato
  };

  return [ageDay, ageMonth, ageYear];
};

// Funcion que mostrará la edad exacta en la interfaz
function showAge () {
  const day = document.querySelector('#input-day');
  const month = document.querySelector('#input-month');
  const year = document.querySelector('#input-year');

  const getDayValue = day.value
  const getMonthValue = month.value
  const getYearValue = year.value

  const [ageDay, ageMonth, ageYear] = getExactAge(getDayValue, getMonthValue, getYearValue);
  
  const isDayValid = getDayValue >= 1 && getDayValue <= 31;
  const isMonthValid = getMonthValue >= 1 && getMonthValue <= 12;
  const isYearValid = getYearValue >= 1900 && getYearValue <= getCurrentDate()[2];

  // Elimino los mensajes de error
    const errorMessages = document.querySelectorAll('.error-message');
    errorMessages.forEach(message => message.remove());
  
  if (isDayValid && isMonthValid && isYearValid) { // Validamos si ingresaron valores correctos en inputs
    
    // Obtengo los elementos de DOM a modificar
    const numberDay = document.querySelector('.days span');
    const numberMonth = document.querySelector('.months span');
    const numberYear = document.querySelector('.years span');
    // Modifico el contenido de los elementos
    numberDay.textContent = `${ageDay}`
    numberMonth.textContent = `${ageMonth}`
    numberYear.textContent = `${ageYear}`

    // Remuevo los estilos de error
    day.classList.remove('error-input');
    month.classList.remove('error-input');
    year.classList.remove('error-input');

    // Captura los elementos label de los inputs y retira los estilos de error
    const labelsDates = document.querySelectorAll('.container__dates label');
    labelsDates.forEach(label => label.classList.remove('error-label'));

  } else { // si no se cumple la condición, se muestra el error haciendo los siguientes cambios
    day.classList.add('error-input');
    month.classList.add('error-input');
    year.classList.add('error-input');

    const message = 'Must be a valid date'
    
    // Captura los elementos label de los inputs y coloca los estilos de error
    const labelsDates = document.querySelectorAll('.container__dates label');
    labelsDates.forEach(label => label.classList.add('error-label'));

    // const errorMessages = document.querySelectorAll('.error-message');
    // errorMessages.forEach(message => message.remove());

    getErrorsMessages(message); //Esta funcion agrega el mensaje de error
  };
};

// Funcion que crea el mensaje de error
function getErrorsMessages (message) {
  const MainContainer = document.querySelectorAll('.container__dates div');
  MainContainer.forEach(container => {
    const errorMessage = document.createElement('p');
    errorMessage.classList.add('error-message');
    errorMessage.textContent = message
    container.appendChild(errorMessage);
  });
};