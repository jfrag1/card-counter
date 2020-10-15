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
}

export default HtmlGrabber;