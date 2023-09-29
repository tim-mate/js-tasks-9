import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  delayInput: document.body.querySelector('[name="delay"]'),
  stepInput: document.body.querySelector('[name="step"]'),
  amountInput: document.body.querySelector('[name="amount"]'),
  startBtn: document.body.querySelector('button'),
};

refs.startBtn.addEventListener('click', onStartBtnClick);

function onStartBtnClick(e) {
  e.preventDefault();

  let delay = Number(refs.delayInput.value);
  let step = Number(refs.stepInput.value);

  const iterationsNumber = Number(refs.amountInput.value);

  for (let i = 0; i < iterationsNumber; i += 1) {
    let currentDelay = delay + step * i;
    let currentPosition = i + 1;

    createPromise(currentPosition, currentDelay)
      .then(({ position, delay }) => {
        Notify.success(`Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`Rejected promise ${position} in ${delay}ms`);
      });
  }
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}
