const element = document.getElementById('test'); 
let start;

function step(timestamp) {
  if (start === undefined)
    start = timestamp;
  const elapsed = timestamp - start;

  const rotation = elapsed < 5000 ? elapsed - elapsed * elapsed / 10000 : 2500;
  const trans = elapsed < 5000 ? elapsed * 0.4 - elapsed * elapsed / 30000 : 1171;

  // `Math.min()` is used here to make sure that the element stops at exactly 1200px.
  element.style.transform = 'translateX(' + trans + 'px) rotate(' + (rotation) + 'deg)';

  if (elapsed < 25000) { // Stop the animation after 25 seconds
    window.requestAnimationFrame(step);
  }
}

window.requestAnimationFrame(step);