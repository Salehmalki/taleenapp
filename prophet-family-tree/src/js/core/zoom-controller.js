// filepath: /prophet-family-tree/prophet-family-tree/src/js/core/zoom-controller.js
class ZoomController {
    constructor(svgElement) {
        this.svgElement = svgElement;
        this.zoomScale = 1;
        this.translateX = 0;
        this.translateY = 0;

        this.initZoom();
    }

    initZoom() {
        this.svgElement.addEventListener('wheel', (event) => this.handleZoom(event));
        this.svgElement.addEventListener('mousedown', (event) => this.startPan(event));
        this.svgElement.addEventListener('mousemove', (event) => this.pan(event));
        this.svgElement.addEventListener('mouseup', () => this.endPan());
        this.svgElement.addEventListener('mouseleave', () => this.endPan());
    }

    handleZoom(event) {
        event.preventDefault();
        const scaleAmount = event.deltaY > 0 ? 0.9 : 1.1;
        this.zoomScale *= scaleAmount;

        this.zoomScale = Math.min(Math.max(this.zoomScale, 0.5), 3); // Limit zoom scale
        this.updateTransform();
    }

    startPan(event) {
        this.isPanning = true;
        this.startX = event.clientX;
        this.startY = event.clientY;
    }

    pan(event) {
        if (!this.isPanning) return;

        const dx = event.clientX - this.startX;
        const dy = event.clientY - this.startY;

        this.translateX += dx;
        this.translateY += dy;

        this.startX = event.clientX;
        this.startY = event.clientY;

        this.updateTransform();
    }

    endPan() {
        this.isPanning = false;
    }

    updateTransform() {
        this.svgElement.style.transform = `translate(${this.translateX}px, ${this.translateY}px) scale(${this.zoomScale})`;
    }
}

// Usage example
// const svgElement = document.querySelector('svg');
// const zoomController = new ZoomController(svgElement);