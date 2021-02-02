class Experience {
  MAX_LEVEL = 500;

  BASE_EXPERIENCE = 400;

  EXPERIENCE_MULTIPLIER = 1.03;

  getNextLevelExperience = (level: number) => {
    return Math.floor(this.BASE_EXPERIENCE * this.EXPERIENCE_MULTIPLIER ** level);
  };

  createExperienceTable = () => {
    const experienceTable = [];
    for (let level = 0; level <= this.MAX_LEVEL; level += 1) {
      if (level <= 0) {
        const experience = 0;
        experienceTable.push({ level, experience });
      } else {
        const previousLevelExperience: number =
          experienceTable[experienceTable.length - 1].experience;
        const experience = this.getNextLevelExperience(level) + previousLevelExperience;
        experienceTable.push({ level, experience });
      }
    }
    return experienceTable;
  };

  EXPERIENCE_TABLE = this.createExperienceTable();

  getLevel(experience: number) {
    return this.EXPERIENCE_TABLE.find(level => (level.experience > experience ? level : null));
  }
}

const exp = new Experience();

export default exp;
