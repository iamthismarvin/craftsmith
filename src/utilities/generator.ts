export const generateRating = () => {
  const probabilityRoll = Math.floor(Math.random() * 100);
  const probabilityTable = [50, 60, 70, 80, 90, 95];
  let successRolls = 0;
  probabilityTable.forEach(probability => {
    if (probabilityRoll >= probability) {
      if (Math.random() >= 0.5) {
        successRolls += 1;
      }
    }
  });
  return successRolls;
};

export const generateSkills = () => {
  return true;
};
