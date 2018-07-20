export const adjustedCategoryFromValues = (oldValue, newValue, factor = 3) => {
    const distance = (Math.abs(newValue - oldValue) / factor);
    return (oldValue > newValue)
        ? oldValue - distance 
        : oldValue + distance;
};