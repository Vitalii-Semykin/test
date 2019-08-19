const TOOLTIP_ATTR = 'data-tooltip';
const TOOLTIP_CONTAINER_ID = 'tooltip';

let tooltipContainer;

function init() {
  document.addEventListener('mouseover', tooltipMouseOverHandler);
  tooltipContainer = document.createElement('div');
  tooltipContainer.setAttribute('id', TOOLTIP_CONTAINER_ID);
  document.body.appendChild(tooltipContainer)
}

function destroy() {
  document.removeEventListener('mouseover', tooltipMouseOverHandler);
}

function tooltipMouseOverHandler(event) {
  const element = event.target;
  if(element.hasAttribute(TOOLTIP_ATTR)) {
    const tooltipContent = element.getAttribute(TOOLTIP_ATTR);
    showTooltip(element, tooltipContent, true)
  }
}

function showTooltip(element, tooltipContent, isTooltipHovered = false) {
  tooltipContainer.innerHTML = tooltipContent;

  const linkProps = element.getBoundingClientRect();
  const tooltipProps = tooltipContainer.getBoundingClientRect();
  const topPos = linkProps.top - tooltipProps.height;

  tooltipContainer.setAttribute('style',`top: ${topPos}px; left: ${linkProps.left}px;`);

  element.addEventListener('mouseout', onElementMouseOut);

  tooltipContainer.addEventListener('mouseover', onTooltipMouseOver);

  function onTooltipMouseOver() {
    isTooltipHovered = true;
    element.removeEventListener('mouseover', onTooltipMouseOver);

    tooltipContainer.addEventListener('mouseout', onMouseOut);

    function onMouseOut() {
      tooltipContainer.innerHTML = '';
      tooltipContainer.removeEventListener('mouseout', onMouseOut);
    }
  }

  function onElementMouseOut() {
    setTimeout(() => {
      if(!isTooltipHovered) {
        tooltipContainer.innerHTML = '';
      }
    }, 1000);
    isTooltipHovered = false;
    element.removeEventListener('mouseout', onElementMouseOut);
  }

  // custom tooltip like on click
  if (!isTooltipHovered) {
    setTimeout(() => {
      tooltipContainer.innerHTML = '';
    }, 1000)
  }
}

document.addEventListener('DOMContentLoaded', init);


//custom event

setTimeout(() => {
  document.getElementById('addTooltip').addEventListener('click', () => {
    const customTooltip = document.getElementById('customTooltipLink');
    showTooltip(customTooltip, customTooltip.innerHTML)
  });
});