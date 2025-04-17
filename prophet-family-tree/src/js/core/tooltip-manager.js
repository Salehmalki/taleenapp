// filepath: /prophet-family-tree/prophet-family-tree/src/js/core/tooltip-manager.js

class TooltipManager {
    constructor(svgContainer) {
        this.svgContainer = svgContainer;
        this.tooltip = this.createTooltip();
        this.bindEvents();
    }

    createTooltip() {
        const tooltip = document.createElement('div');
        tooltip.className = 'tooltip';
        tooltip.style.position = 'absolute';
        tooltip.style.pointerEvents = 'none';
        tooltip.style.display = 'none';
        document.body.appendChild(tooltip);
        return tooltip;
    }

    bindEvents() {
        this.svgContainer.addEventListener('click', (event) => {
            const targetNode = event.target.closest('.node');
            if (targetNode) {
                this.showTooltip(targetNode, event);
            } else {
                this.hideTooltip();
            }
        });

        document.addEventListener('click', () => this.hideTooltip());
    }

    showTooltip(node, event) {
        const info = node.getAttribute('data-info');
        this.tooltip.innerHTML = info;
        this.tooltip.style.display = 'block';
        this.tooltip.style.left = `${event.pageX + 10}px`;
        this.tooltip.style.top = `${event.pageY + 10}px`;
    }

    hideTooltip() {
        this.tooltip.style.display = 'none';
    }
}

// Export the TooltipManager class for use in other modules
export default TooltipManager;