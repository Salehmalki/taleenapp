// filepath: prophet-family-tree/src/js/core/tree-layout.js
class TreeLayout {
    constructor(treeData, orientation = 'vertical') {
        this.treeData = treeData;
        this.orientation = orientation;
        this.nodeWidth = 100;
        this.nodeHeight = 50;
        this.gap = 20;
    }

    calculateLayout() {
        const layout = [];
        this._calculateNodePositions(this.treeData, 0, 0, layout);
        return layout;
    }

    _calculateNodePositions(node, x, y, layout) {
        if (!node) return;

        const currentNode = {
            name: node.name,
            x: x,
            y: y,
            width: this.nodeWidth,
            height: this.nodeHeight
        };

        layout.push(currentNode);

        const children = node.children || [];
        const totalChildren = children.length;

        if (this.orientation === 'vertical') {
            const childY = y + this.nodeHeight + this.gap;
            const childX = x - (totalChildren - 1) * (this.nodeWidth + this.gap) / 2;

            children.forEach((child, index) => {
                this._calculateNodePositions(child, childX + index * (this.nodeWidth + this.gap), childY, layout);
            });
        } else {
            const childX = x + this.nodeWidth + this.gap;
            const childY = y - (totalChildren - 1) * (this.nodeHeight + this.gap) / 2;

            children.forEach((child, index) => {
                this._calculateNodePositions(child, childX, childY + index * (this.nodeHeight + this.gap), layout);
            });
        }
    }
}

// Export the TreeLayout class for use in other modules
export default TreeLayout;