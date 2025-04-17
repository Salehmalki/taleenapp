// filepath: prophet-family-tree/prophet-family-tree/src/js/utils/svg-helpers.js

function createSVGElement(tag, attributes) {
    const element = document.createElementNS("http://www.w3.org/2000/svg", tag);
    for (const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
    return element;
}

function createCircle(cx, cy, r, attributes = {}) {
    const circle = createSVGElement('circle', {
        cx: cx,
        cy: cy,
        r: r,
        ...attributes
    });
    return circle;
}

function createRect(x, y, width, height, attributes = {}) {
    const rect = createSVGElement('rect', {
        x: x,
        y: y,
        width: width,
        height: height,
        ...attributes
    });
    return rect;
}

function createLine(x1, y1, x2, y2, attributes = {}) {
    const line = createSVGElement('line', {
        x1: x1,
        y1: y1,
        x2: x2,
        y2: y2,
        ...attributes
    });
    return line;
}

function createText(x, y, textContent, attributes = {}) {
    const text = createSVGElement('text', {
        x: x,
        y: y,
        ...attributes
    });
    text.textContent = textContent;
    return text;
}

function createGroup(attributes = {}) {
    return createSVGElement('g', attributes);
}

function setSVGAttributes(element, attributes) {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
}

function appendChildren(parent, children) {
    children.forEach(child => parent.appendChild(child));
}

export {
    createCircle,
    createRect,
    createLine,
    createText,
    createGroup,
    setSVGAttributes,
    appendChildren
};