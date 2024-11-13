export const validateDate = (date: Date): boolean => {
    return date instanceof Date && !isNaN(date.getTime());
};

export const validateDateRange = (start: Date, end: Date): boolean => {
    return validateDate(start) && validateDate(end) && end >= start && end < new Date();
};
