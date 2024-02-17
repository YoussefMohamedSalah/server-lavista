export const generateTempPassword = () => {
    const min = 10000000; // Minimum 8-digit number
    const max = 99999999; // Maximum 8-digit number
    // Generate a random number between min and max (inclusive)
    const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    return randomNumber;
};

export const generateOTP = (): number => {
    // Generate a random 6-digit number
    const otp = Math.floor(100000 + Math.random() * 900000);
    return otp;
}



export const generateResetPassword = (): string => {
    // Generate a random 6-digit number
    const otp1 = Math.floor(1000 + Math.random() * 9000);
    const otp2 = Math.floor(1000 + Math.random() * 9000);
    const otp3 = Math.floor(1000 + Math.random() * 9000);
    const otp4 = Math.floor(1000 + Math.random() * 9000);

    return `${otp1} - ${otp2} - ${otp3} - ${otp4}` ;
}




