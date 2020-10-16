import HtmlGrabber from './html_grabber';

class ClickManager {
  constructor(game) {
    this.startLevel = game.playSpecificLevel.bind(game);
    this.submitGuess = game.submitGuess.bind(game);
    this.getRelevantHtml();
  }

  getRelevantHtml() {
    this.tutorialButton = this.getHtmlById("tutorial-button");
    this.tutorialScreen = this.getHtmlById("tutorial");
    this.closeTutorialButton = this.getHtmlById("exit-tutorial");
    this.levelButtons = this.getHtmlById("level-index").element.children;
    this.gameMenu = this.getHtmlById("menu-content");
    this.countGuess = this.getHtmlById("modal-guess");
    this.plusButton = this.getHtmlById("plus");
    this.minusButton = this.getHtmlById("minus");
    this.submitButton = this.getHtmlById("submit");
  }

  getHtmlById(id) {
    return new HtmlGrabber(id);
  }

  installAllClickListeners() {
    this.tutorialButton.addClickListener(
      this.renderTutorialScreen.bind(this) );

    this.closeTutorialButton.addClickListener(
      this.hideTutorialScreen.bind(this) );

    this.installLevelButtonListeners();
    this.installModalListeners();
  }

  renderTutorialScreen() {
    this.tutorialButton.setDisplay("none");
    this.tutorialScreen.addClass("active");
  }

  hideTutorialScreen() {
    this.tutorialScreen.removeClass("active");
    this.tutorialButton.setDisplay("block");
  }

  installLevelButtonListeners() {
    for (let i = 0; i < this.levelButtons.length; i++)
      this.installSingleLevelButtonListener(i + 1);
  }

  installSingleLevelButtonListener(level) {
    this.levelButtons[level - 1].addEventListener("click",
      this.hideMenuAndStartLevel.bind(this, level)
    );
  }

  hideMenuAndStartLevel(level) {
    this.startLevel(level);
    this.hideMenu();
  }

  hideMenu() {
    this.gameMenu.removeClass("active");
  }

  installModalListeners() {
    this.plusButton.addClickListener(this.incrementGuess.bind(this));
    this.minusButton.addClickListener(this.decrementGuess.bind(this));
    this.submitButton.addClickListener(this.submitGuess.bind(this));
  }

  incrementGuess() {
    this.countGuess.increment();
  }

  decrementGuess() {
    this.countGuess.decrement();
  }
}

export default ClickManager;