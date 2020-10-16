class HtmlGrabber {
  constructor(id) {
    this.element = document.getElementById(id);
  }

  addClickListener(callback) {
    this.element.addEventListener("click", callback);
  }

  addClass(className) {
    this.element.classList.add(className);
  }

  removeClass(className) {
    this.element.classList.remove(className);
  }

  setDisplay(displayType) {
    this.element.style.display = displayType;
  }

  increment() {
    this.element.innerText = parseInt(this.element.innerText) + 1;
  }

  decrement() {
    this.element.innerText = parseInt(this.element.innerText) - 1;
  }

  setTextToZero() {
    this.element.innerText = 0;
  }

  setInnerHtml(elements) {
    this.element.innerHTML = elements;
  }
}

export default HtmlGrabber;