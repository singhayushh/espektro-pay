export const generateOtp = () => {
    return Math.floor(100000 + Math.random() * 900000)
}