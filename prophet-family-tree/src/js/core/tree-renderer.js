// filepath: /prophet-family-tree/prophet-family-tree/src/js/core/tree-renderer.js
const svgNamespace = "http://www.w3.org/2000/svg";

class TreeRenderer {
    constructor(data, container) {
        this.data = data;
        this.container = container;
        this.svg = null;
        this.nodes = [];
        this.links = [];
    }

    init() {
        this.createSVG();
        this.renderTree();
    }

    createSVG() {
        this.svg = document.createElementNS(svgNamespace, "svg");
        this.svg.setAttribute("width", "100%");
        this.svg.setAttribute("height", "100%");
        this.container.appendChild(this.svg);
    }

    renderTree() {
        this.nodes = this.data.map((item, index) => this.createNode(item, index));
        this.links = this.createLinks();

        this.nodes.forEach(node => {
            this.svg.appendChild(node);
        });

        this.links.forEach(link => {
            this.svg.appendChild(link);
        });
    }

    createNode(item, index) {
        const group = document.createElementNS(svgNamespace, "g");
        const circle = document.createElementNS(svgNamespace, "circle");
        const text = document.createElementNS(svgNamespace, "text");

        circle.setAttribute("cx", 50 + index * 100);
        circle.setAttribute("cy", 50);
        circle.setAttribute("r", 20);
        circle.setAttribute("fill", item.gender === 'male' ? 'blue' : 'pink');
        circle.addEventListener("click", () => this.showTooltip(item));

        text.setAttribute("x", 50 + index * 100);
        text.setAttribute("y", 50);
        text.setAttribute("text-anchor", "middle");
        text.setAttribute("fill", "white");
        text.textContent = item.name;

        group.appendChild(circle);
        group.appendChild(text);

        return group;
    }

    createLinks() {
        const links = [];
        for (let i = 0; i < this.data.length - 1; i++) {
            const line = document.createElementNS(svgNamespace, "line");
            line.setAttribute("x1", 50 + i * 100);
            line.setAttribute("y1", 50 + 20);
            line.setAttribute("x2", 50 + (i + 1) * 100);
            line.setAttribute("y2", 50 - 20);
            line.setAttribute("stroke", "black");
            links.push(line);
        }
        return links;
    }

    showTooltip(item) {
        const tooltip = document.createElement("div");
        tooltip.className = "tooltip";
        tooltip.innerHTML = `<h3>${item.name}</h3><p>${item.info}</p>`;
        document.body.appendChild(tooltip);

        tooltip.style.left = `${event.pageX}px`;
        tooltip.style.top = `${event.pageY}px`;

        tooltip.addEventListener("click", () => {
            tooltip.remove();
        });
    }
}

// Usage example
// const treeData = [
//     { name: "محمد", gender: "male", info: "النبي محمد ﷺ" },
//     { name: "آمنة", gender: "female", info: "أم النبي محمد ﷺ" },
//     // Add more family members here
// ];
// const container = document.getElementById("tree-container");
// const treeRenderer = new TreeRenderer(treeData, container);
// treeRenderer.init();