/// <reference lib="webworker" />

let mySelf = null;
let animate = null;
let next = () => {
  clearInterval(animate);
  if (mySelf.isAutoPlay) {
    //data.action();
    postMessage(-1 + '');
    setTimeout(() => {
      progressbar();
    }, 1000);
  }
}
let progressbar = () => {
  const startDate = new Date().getTime();
  postMessage(0 + '');
  animate = setInterval(() => {
    if (!mySelf.isAutoPlay) {
      mySelf.isAutoPlay = false;
      clearInterval(animate);
    }
    else {
      const currentDate = new Date().getTime();
      const percentage = currentDate - startDate;
      postMessage(((percentage / mySelf.timeAutoPlay) * 100).toFixed(0));
      if (percentage > mySelf.timeAutoPlay) {
        postMessage(100 + '');
        next();
      }
    }
  }, 60);
}

addEventListener('message', ({ data }) => {
  switch (data.status.toLowerCase()) {
    case 'run':
      mySelf.isAutoPlay = true;
      progressbar();
      break;
    case 'stop':
      mySelf.isAutoPlay = false;
      // progressbar();
      break;
    case 'create':
    default:
      mySelf = data;
      break;
  }
});