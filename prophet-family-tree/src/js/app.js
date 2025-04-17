// filepath: prophet-family-tree/prophet-family-tree/src/js/app.js
document.addEventListener('DOMContentLoaded', function() {
    const svgContainer = d3.select('#family-tree-svg');
    const width = window.innerWidth * 0.9;
    const height = window.innerHeight * 0.9;

    svgContainer.attr('width', width).attr('height', height);

    const familyData = loadGenealogyData();

    const treeLayout = new TreeLayout(familyData, width, height);
    const treeRenderer = new TreeRenderer(svgContainer, treeLayout);
    const zoomController = new ZoomController(svgContainer);
    const tooltipManager = new TooltipManager();

    treeRenderer.render();

    svgContainer.on('click', function() {
        tooltipManager.hideTooltip();
    });

    window.addEventListener('resize', function() {
        const newWidth = window.innerWidth * 0.9;
        const newHeight = window.innerHeight * 0.9;
        svgContainer.attr('width', newWidth).attr('height', newHeight);
        treeLayout.updateLayout(newWidth, newHeight);
        treeRenderer.render();
    });
});

function loadGenealogyData() {
    // This function should load the genealogy data from the specified source
    // For now, we will return a placeholder object
    return {
        name: "محمد",
        children: [
            {
                name: "عبد الله",
                children: [
                    { name: "عبد المطلب" },
                    { name: "هاشم" }
                ]
            },
            {
                name: "آمنة",
                children: [
                    { name: "فاطمة" },
                    { name: "علي" }
                ]
            }
        ]
    };
}