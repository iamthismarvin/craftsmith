export const MAX_LEVEL = 500;
export const BASE_EXPERIENCE = 400;
export const EXPERIENCE_MULTIPLIER = 1.03;
export const STAT_POINTS_PER_LEVEL = 4;

export const getNextLevelExperience = (level: number) => {
  return Math.floor(BASE_EXPERIENCE * EXPERIENCE_MULTIPLIER ** level);
};

export const createExperienceTable = () => {
  const experienceTable = [];
  for (let level = 0; level <= MAX_LEVEL; level += 1) {
    if (level <= 0) {
      const experience = 0;
      experienceTable.push({ level, experience });
    } else {
      const previousLevelExperience: number =
        experienceTable[experienceTable.length - 1].experience;
      const experience = getNextLevelExperience(level) + previousLevelExperience;
      experienceTable.push({ level, experience });
    }
  }
  return experienceTable;
};

export const EXPERIENCE_TABLE = createExperienceTable();

export const getLevel = (experience: number) => {
  return EXPERIENCE_TABLE.find(level => (level.experience > experience ? level : null));
};

export const getRemainingStatPoints = async (level: number, usedStatPoints: number) => {
  const statPointsAtCurrentLevel = level * STAT_POINTS_PER_LEVEL;
  return statPointsAtCurrentLevel - usedStatPoints;
};
