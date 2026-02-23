const LostItem = require("../model/LostItem");
const FoundItem = require("../model/FoundItem");

/**
 * Helper: Calculate date difference in days
 */
function dateDiffInDays(date1, date2) {
  return Math.abs((new Date(date1) - new Date(date2)) / (1000 * 60 * 60 * 24));
}

/**
 * Match a lost item against found items
 */
async function matchLostWithFound(tags, category, lostItemData = {}) {
  const foundItems = await FoundItem.find({ 
    category //tags: { $in: tags } also add any one tag match 
  });

  const matches = foundItems
    .map((item) => {
      const commonTags = item.tags.filter((tag) => tags.includes(tag));
      let score = commonTags.length;

      // Location match
      if (lostItemData.location && item.location === lostItemData.location) score += 2;
      if (
        lostItemData.customLocation &&
        item.customLocation &&
        lostItemData.customLocation.toLowerCase() === item.customLocation.toLowerCase()
      ) {
        score += 2;
      }

      // Date match (within 7 days = +2, within 14 days = +1)
      if (lostItemData.dateLost && item.dateFound) {
        const diff = dateDiffInDays(lostItemData.dateLost, item.dateFound);
        if (diff <= 7) score += 2;
        else if (diff <= 14) score += 1;
      }

      // Optional image
      let imageScore = 0;
      if (lostItemData.images?.length > 0 && item.images?.length > 0) imageScore = 1;
      score += imageScore;

      return {
        item,
        score,
        reason: `Tags: ${commonTags.length}, Location: ${score - commonTags.length - imageScore}, Image: ${imageScore}`,
      };
    })
    .filter((m) => m.score > 0)
    .sort((a, b) => b.score - a.score);

  return matches;
}

/**
 * Match a found item against lost items
 */
async function matchFoundWithLost(tags, category, foundItemData = {}) {
  const lostItems = await LostItem.find({ category });

  const matches = lostItems
    .map((item) => {
      const commonTags = item.tags.filter((tag) => tags.includes(tag));
      let score = commonTags.length;

      // Location match
      if (foundItemData.location && item.location === foundItemData.location) score += 2;
      if (
        foundItemData.customLocation &&
        item.customLocation &&
        foundItemData.customLocation.toLowerCase() === item.customLocation.toLowerCase()
      ) {
        score += 2;
      }

      // Date match
      if (foundItemData.dateFound && item.dateLost) {
        const diff = dateDiffInDays(foundItemData.dateFound, item.dateLost);
        if (diff <= 7) score += 2;
        else if (diff <= 14) score += 1;
      }

      // Optional image
      let imageScore = 0;
      if (foundItemData.images?.length > 0 && item.images?.length > 0) imageScore = 1;
      score += imageScore;

      return {
        item,
        score,
        reason: `Tags: ${commonTags.length}, Location: ${score - commonTags.length - imageScore}, Image: ${imageScore}`,
      };
    })
    .filter((m) => m.score > 0)
    .sort((a, b) => b.score - a.score);

  return matches;
}

module.exports = { matchLostWithFound, matchFoundWithLost };



{/*  old way of matching when if img match done with img if no img done with text but in new if no img matchin done with text if img +text both then match done with both tag
  
*const LostItem = require("../model/LostItem");
const FoundItem = require("../model/FoundItem");


async function matchLostWithFound(tags, category) {
  // fetch found items with same category
  const foundItems = await FoundItem.find({ category });

  // compute matches
  const matches = foundItems
    .map((item) => {
      const commonTags = item.tags.filter((tag) => tags.includes(tag));
      return {
        item,
        score: commonTags.length, // number of matching tags
      };
    })
    .filter((m) => m.score > 0) // at least 1 tag must match
    .sort((a, b) => b.score - a.score); // highest match first

  return matches;
}

async function matchFoundWithLost(tags, category) {
  const lostItems = await LostItem.find({ category });

  const matches = lostItems
    .map((item) => {
      const commonTags = item.tags.filter((tag) => tags.includes(tag));
      return {
        item,
        score: commonTags.length,
      };
    })
    .filter((m) => m.score > 0)
    .sort((a, b) => b.score - a.score);

  return matches;
}

module.exports = { matchLostWithFound, matchFoundWithLost };
 */}
