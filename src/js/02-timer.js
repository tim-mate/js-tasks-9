import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  startBtn: document.body.querySelector('button[data-start]'),
  secondsDisplay: document.body.querySelector('span[data-seconds]'),
  minutesDisplay: document.body.querySelector('span[data-minutes]'),
  hoursDisplay: document.body.querySelector('span[data-hours]'),
  daysDisplay: document.body.querySelector('span[data-days]'),
};

let timerMs = null;
let intervalId = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const currentTime = new Date().getTime();
    const selectedTime = selectedDates[0].getTime();
    const timeDifference = selectedTime - currentTime;

    handleBtnDisabling(timeDifference);
    timerMs = timeDifference;
  },
};

const calendar = flatpickr('#datetime-picker', options);

refs.startBtn.addEventListener('click', onStartBtnClick);

function onStartBtnClick() {
  onTimerTick();
  intervalId = setInterval(onTimerTick, 1000);

  disableBtn();
}

function handleBtnDisabling(timeDifference) {
  const isInFuture = timeDifference > 0;
  if (!isInFuture) {
    disableBtn();
    Notify.failure('Please choose a date in the future');
  } else {
    enableBtn();
  }
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  if (value.toString().length < 2) {
    return value.toString().padStart(2, 0);
  } else {
    return value.toString();
  }
}

function onTimerTick() {
  let timerData = convertMs(timerMs);

  if (isFinished(timerData)) {
    clearInterval(intervalId);
  }

  renderTimerData(timerData);
  timerMs -= 1000;
}

function renderTimerData(timerData) {
  refs.daysDisplay.innerHTML = addLeadingZero(timerData.days);
  refs.hoursDisplay.innerHTML = addLeadingZero(timerData.hours);
  refs.minutesDisplay.innerHTML = addLeadingZero(timerData.minutes);
  refs.secondsDisplay.innerHTML = addLeadingZero(timerData.seconds);
}

function isFinished(timerData) {
  return (
    timerData.days === 0 &&
    timerData.hours === 0 &&
    timerData.minutes === 0 &&
    timerData.seconds === 0
  );
}

function enableBtn() {
  refs.startBtn.removeAttribute('disabled');
}

function disableBtn() {
  refs.startBtn.setAttribute('disabled', 'true');
}
