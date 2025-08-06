// Quest Images
import quest1 from './quest_images/image_1.png';
import quest2 from './quest_images/image_2.png';
import quest3 from './quest_images/image_3.png';
import quest4 from './quest_images/image_4.png';
import quest5 from './quest_images/image_5.png';
import quest6 from './quest_images/image_6.png';
import quest7 from './quest_images/image_7.png';
import quest8 from './quest_images/image_8.png';
import quest9 from './quest_images/image_9.png';
import quest10 from './quest_images/image_10.png';
import quest11 from './quest_images/image_11.png';
import quest12 from './quest_images/image_12.png';
import quest13 from './quest_images/image_13.png';
import quest14 from './quest_images/image_14.png';
import quest15 from './quest_images/image_15.png';
import quest16 from './quest_images/image_16.png';

// Other Assets
import coinBox from './coin-box.svg';
import logoModal from './logo_modal.svg';
import rariIcon from './rari.png';
import rewardProgressCat from './reward_progress_cat.png';
import streakHungryCat from './streak_hungry_cat.svg';
import goldMedal from './leaderboard/goldMedal.svg';
import silverMedal from './leaderboard/silverMedal.svg';
import bronzeMedal from './leaderboard/bronze.svg';
import globalIcon from './leaderboard/global.svg';
import avatar from './leaderboard/avatar.svg';

// Quest Image Array for easy access
export const questImages = [
  quest1,
  quest2,
  quest3,
  quest4,
  quest5,
  quest6,
  quest7,
  quest8,
  quest9,
  quest10,
  quest11,
  quest12,
  quest13,
  quest14,
  quest15,
  quest16,
];

// Export individual quest images
export {
  quest1,
  quest2,
  quest3,
  quest4,
  quest5,
  quest6,
  quest7,
  quest8,
  quest9,
  quest10,
  quest11,
  quest12,
  quest13,
  quest14,
  quest15,
  quest16,
};

// Export other assets
export {
  coinBox,
  logoModal,
  rariIcon,
  rewardProgressCat,
  streakHungryCat,
  goldMedal,
  silverMedal,
  bronzeMedal,
  globalIcon,
  avatar,
};

// Helper function to get quest image by index
export const getQuestImage = (index: number) => {
  const normalizedIndex = (((index - 1) % 16) + 16) % 16;
  return questImages[normalizedIndex];
};

// Create a default export object
const exportData = {
  questImages,
  getQuestImage,
  coinBox,
  logoModal,
  rariIcon,
  rewardProgressCat,
  streakHungryCat,
};

export default exportData;
