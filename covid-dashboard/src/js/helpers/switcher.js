const swticher = (switcherBlock) => {
  const switcherContainer = switcherBlock;
  const switcherElements = Object.values(switcherContainer.children).filter((e) => e.tagName !== 'I');
  const switchers = Object.values(switcherContainer.children).filter((e) => e.tagName === 'I');
  const getActiveElement = () => switcherContainer.querySelector('span.active');
  const elementsCount = switcherElements.length - 1;

  switchers.forEach((e) => {
    e.addEventListener('click', () => {
      if (e.classList.contains('prev')) {
        let activeElement = getActiveElement();
        const currentElement = switcherElements[switcherElements.indexOf(activeElement)
           === 0 ? 2 : switcherElements.indexOf(activeElement) - 1];
        activeElement.classList.remove('active');
        activeElement.classList.add('hidden');
        currentElement.classList.add('active');
        currentElement.classList.remove('hidden');
        activeElement = currentElement;
      } else {
        let activeElement = getActiveElement();
        const nextElement = switcherElements[switcherElements.indexOf(activeElement)
           === elementsCount ? 0 : switcherElements.indexOf(activeElement) + 1];
        activeElement.classList.remove('active');
        activeElement.classList.add('hidden');
        nextElement.classList.add('active');
        nextElement.classList.remove('hidden');
        activeElement = nextElement;
      }
    });
  });
};

export default swticher;
