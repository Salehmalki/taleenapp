// filepath: prophet-family-tree/src/js/data/data-loader.js
const dataLoader = (() => {
    const loadGenealogyData = async (url) => {
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error loading genealogy data:', error);
            return null;
        }
    };

    const loadLocalData = () => {
        return new Promise((resolve) => {
            const data = genealogyData; // Assuming genealogyData is defined in genealogy-data.js
            resolve(data);
        });
    };

    return {
        loadGenealogyData,
        loadLocalData
    };
})();

export default dataLoader;