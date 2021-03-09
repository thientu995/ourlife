/// <reference lib="webworker" />

const v_msS = 1000;
const v_msM = v_msS * 60;
const v_msH = v_msM * 60;
const v_msD = v_msH * 24;
const timeInserval = 1000;


let formatCountDown = function (arrValue) {
  return arrValue.join(" : ");
}
let pad = function (value, size) {
  let s = String(value);
  while (s.length < (size || 2)) { s = "0" + s; }
  return s;
}
addEventListener('message', ({ data }) => {
  let countDownDate = data.countDownDate;
  let dt = data.dt;
  setInterval(() => {
    // Find the distance between now and the count down date
    dt = new Date(dt.getTime() + timeInserval);
    const distance = countDownDate - dt.getTime();

    let days = 0,
      hours = 0,
      minutes = 0,
      seconds = 0;

    if (distance <= 7) {
      days = 0;
      hours = dt.getHours();
      minutes = dt.getMinutes();
      seconds = dt.getSeconds();
      postMessage(formatCountDown([pad(hours, 2), pad(minutes, 2), pad(seconds, 2)]));
    } else {
      days = Math.floor(distance / (v_msD));
      hours = Math.floor((distance % (v_msD)) / (v_msH));
      minutes = Math.floor((distance % (v_msH)) / (v_msM));
      seconds = Math.floor((distance % (v_msM)) / v_msS);
      postMessage(formatCountDown([pad(days, 2), pad(hours, 2), pad(minutes, 2), pad(seconds, 2)]));
    }
  }, timeInserval);
});