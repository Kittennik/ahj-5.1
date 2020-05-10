if (typeof document !== 'undefined') {
  const button = document.getElementById('button');

  function createPopover() {
    const popover = `<div id="popover">
  <p class="title">Вот он, воздушный кексик :)</p>
  <p class="text">Ага-ага, проблема с переводом на русский язык. Невероятно, правда?</p>
  </div>"`;
    const popoverElement = document.createElement('div');
    popoverElement.innerHTML = popover;
    return popoverElement.firstChild;
  }

  button.addEventListener('click', () => {
    let popover = document.getElementById('popover');
    if (popover === null) {
      popover = createPopover();
      document.querySelector('body').appendChild(popover);
      popover.classList.add('hidden');
    }
    popover.classList.toggle('hidden');
    popover.style.bottom = `${button.offsetTop + 20}px`;
    popover.style.left = `${button.offsetLeft - (popover.offsetWidth - button.offsetWidth) / 2}px`;
  });
}
