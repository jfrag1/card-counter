import HtmlGrabber from './html_grabber';

class ModalManager {
  constructor(game) {
    this.playNextLevel = game.nextLevel.bind(game);
    this.tryLevelAgain = game.tryLevelAgain.bind(game);
    this.getRelevantHtml();
  }

  getRelevantHtml() {
    this.guessModal = this.getHtmlById('modal-screen');
    this.postGuessModal = this.getHtmlById('post-guess-modal');
    this.menu = this.getHtmlById('menu-content');
  }

  getHtmlById(id) {
    return new HtmlGrabber(id);
  }

  renderGuessModal() {
    this.guessModal.addClass("active");
  }

  renderFinalLevelWin() {
    this.postGuessModal.setInnerHtml(
      '<p>Correct! You win!</p><button id="back-to-menu">Back to menu</button>'
    );
    this.installMenuButtonListener();
    this.postGuessModal.addClass('active');
  }

  installMenuButtonListener() {
    const menuButton = document.getElementById('back-to-menu');
    menuButton.addEventListener("click", this.goBackToMenu.bind(this));
  }

  goBackToMenu() {
    this.hideModal();
    this.menu.addClass('active');
  }

  hideModal() {
    this.guessModal.removeClass('active');
    this.postGuessModal.removeClass('active');
  }

  renderLevelWin() {
    this.postGuessModal.setInnerHtml(
      '<p>Correct!</p><button id="next-level">Next level</button><button id="back-to-menu">Back to menu</button>'
    );
    this.installMenuButtonListener();
    this.installNextLevelListener();
    this.postGuessModal.addClass('active');
  }

  installNextLevelListener() {
    const nextLevelButton = this.getHtmlById('next-level');
    nextLevelButton.addClickListener(this.hideModalAndStartNextLevel.bind(this));
  }

  hideModalAndStartNextLevel() {
    this.hideModal();
    this.playNextLevel();
  }

  renderLevelLoss(actualCount) {
    this.postGuessModal.setInnerHtml(
      `<p>Incorrect. The count was ${actualCount}.</p><button id="try-again">Try again</button><button id="back-to-menu">Back to menu</button>`
    );
    this.installMenuButtonListener();
    this.installTryLevelAgainListener();
    this.postGuessModal.addClass('active');
  }

  installTryLevelAgainListener() {
    const tryAgainButton = this.getHtmlById("try-again");
    tryAgainButton.addClickListener(this.hideModalAndTryAgain.bind(this));
  }

  hideModalAndTryAgain() {
    this.hideModal();
    this.tryLevelAgain();
  }
}

export default ModalManager;