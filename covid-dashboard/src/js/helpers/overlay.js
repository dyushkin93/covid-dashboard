const overlay = () => {
  const overlayContainer = document.querySelector('.overlay');
  const overlayContent = document.querySelector('.overlay__content');
  const overlayClose = document.querySelector('.overlay__close');
  const readyIcon = document.querySelector('.overlay-img');
  const closeBtn = document.querySelector('.close');

  readyIcon.addEventListener('click', () => {
    overlayContent.classList.add('hidden');
    overlayClose.classList.remove('hidden');
  });

  closeBtn.addEventListener('click', () => {
    overlayContainer.classList.add('hidden');
  });
};

export default overlay;
