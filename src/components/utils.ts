export const spaceInNumber = (phoneNumber: string) => {
    // Remove all spaces first
    const clean = phoneNumber.replace(/\s+/g, '');
    if (clean.length < 8) return phoneNumber;
    // Insert space at 7th last and 10th last position
    const first = clean.slice(0, clean.length - 7);
    const second = clean.slice(clean.length - 7, clean.length);
    return [first, second].filter(Boolean).join(' ');
}

export const phoneNumber = '03026262865';
export const email = 'kashifshahzadwaria000@gmail.com';
