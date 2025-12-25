// backend/utils/recommendationEngine.js

const recommendBikes = (userHistory, allBikes) => {
    // If no history, return standard list
    if (!userHistory || userHistory.length === 0) {
        return allBikes; 
    }

    // 1. Analyze History
    let categoryCounts = {};
    userHistory.forEach(booking => {
        // Ensure booking has a bikeId populated
        if(booking.bikeId && booking.bikeId.category) {
            const cat = booking.bikeId.category;
            categoryCounts[cat] = (categoryCounts[cat] || 0) + 1;
        }
    });

    // Find favorite category (e.g., "Sports")
    let favoriteCategory = null;
    let maxCount = 0;
    for (const [cat, count] of Object.entries(categoryCounts)) {
        if (count > maxCount) {
            maxCount = count;
            favoriteCategory = cat;
        }
    }

    // 2. Score & Sort Bikes
    const scoredBikes = allBikes.map(bike => {
        // Convert Mongoose object to plain JS object to add new properties
        let bikeObj = bike.toObject(); 
        
        let score = 0;
        if (bikeObj.category === favoriteCategory) score += 10; 
        
        bikeObj.relevanceScore = score;
        return bikeObj;
    });

    // Sort: Higher score first
    return scoredBikes.sort((a, b) => b.relevanceScore - a.relevanceScore);
};

module.exports = recommendBikes;