const refs = {
  startBtn: document.body.querySelector('button[data-start]'),
  stopBtn: document.body.querySelector('button[data-stop]'),
};

let intervalId = null;

refs.startBtn.addEventListener('click', onStartBtnClick);
refs.stopBtn.addEventListener('click', onStopBtnClick);

function onStartBtnClick(e) {
  handleBtnDisabling(e.target);
  changeBodyColor(getRandomHexColor());

  intervalId = setInterval(() => {
    let newColor = getRandomHexColor();
    changeBodyColor(newColor);
  }, 1000);
}

function onStopBtnClick(e) {
  handleBtnDisabling(e.target);
  clearInterval(intervalId);
}

function handleBtnDisabling(elem) {
  const isStartBtn = elem.hasAttribute('data-start');

  if (isStartBtn) {
    elem.setAttribute('disabled', 'true');
    refs.stopBtn.removeAttribute('disabled');
  } else {
    elem.setAttribute('disabled', 'true');
    refs.startBtn.removeAttribute('disabled');
  }
}

function changeBodyColor(newColor) {
  document.body.style.backgroundColor = newColor;
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}
