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
  
  // Elimina los mensajes de error
  const errorMessages = document.querySelectorAll('.error-message');
  errorMessages.forEach(message => message.remove());

  let hasError = false;

  if (isNaN(getDayValue) || getDayValue < 1 || getDayValue > 31) {

    const messageValidDate = 'Must be a valid date';
    const messageFieldRequired = 'This field is required';
    day.classList.add('error-input');

    const labelDay = document.querySelector('#label-day');
    labelDay.classList.add('error-label');

    getMessageError(day, messageValidDate, messageFieldRequired, getDayValue);

    hasError = true;

  } else {
    const numberDay = document.querySelector('.days span');
    numberDay.textContent = `${ageDay}`;
    day.classList.remove('error-input');

    // Captura el elemento label de los inputs y retira los estilos de error
    const labelDay = document.querySelector('#label-day');
    labelDay.classList.remove('error-label');
    
  }


  if (isNaN(getMonthValue) || getMonthValue < 1 || getMonthValue > 12) {

    const messageValidDate = 'Must be a valid date';
    const messageFieldRequired = 'This field is required';
    month.classList.add('error-input');

    const labelMonth = document.querySelector('#label-month');
    labelMonth.classList.add('error-label');

    getMessageError(month, messageValidDate, messageFieldRequired, getMonthValue);

    hasError = true;

  } else {
    const numberMonth = document.querySelector('.months span');
    numberMonth.textContent = `${ageMonth}`;
    month.classList.remove('error-input');

    // Captura el elemento label de los inputs y retira los estilos de error
    const labelMonth = document.querySelector('#label-month');
    labelMonth.classList.remove('error-label');
  }


  if (isNaN(getYearValue) || getYearValue < 1 || getYearValue > getCurrentDate()[2]) {

    const messageValidDate = 'Must be a valid date';
    const messageFieldRequired = 'This field is required';
    year.classList.add('error-input');

    const labelYear = document.querySelector('#label-year');
    labelYear.classList.add('error-label');

    getMessageError(year, messageValidDate, messageFieldRequired, getYearValue);

    hasError = true;

  } else {
    const numberYear = document.querySelector('.years span');
    numberYear.textContent = `${ageYear}`;
    year.classList.remove('error-input');

    // Captura el elemento label de los inputs y retira los estilos de error
    const labelYear = document.querySelector('#label-year');
    labelYear.classList.remove('error-label');
  }

  // Actualiza los valores solo si hay errores
  if (!!hasError) {
    const containerInfo = document.querySelectorAll('.container__info p span');
    containerInfo.forEach(info => info.textContent = '--');
  }
};

function getMessageError (element, validDate, fieldRequired, value) {
  const messageError = document.createElement('p');
  messageError.classList.add('error-message');
  messageError.textContent = value === '' ? fieldRequired: validDate;
  element.parentNode.appendChild(messageError);
};