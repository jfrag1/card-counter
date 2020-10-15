import HtmlGrabber from './html_grabber';

class ClickManager {
  constructor(game) {
    this.startLevel = game.playSpecificLevel.bind(game);
    this.getRelevantHtml();
  }

  getRelevantHtml() {
    this.tutorialButton = this.getHtmlById("tutorial-button");
    this.tutorialScreen = this.getHtmlById("tutorial");
    this.closeTutorialButton = this.getHtmlById("exit-tutorial");
    this.levelButtons = this.getHtmlById("level-index").element.children;
    this.gameMenu = this.getHtmlById("menu-content");
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
}

export default ClickManager;