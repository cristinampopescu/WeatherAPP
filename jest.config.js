// module.exports = {
//     project: {
//         ios: {},
//         android: {},
//     },
//     assets: ["./src/assets/fonts/"],
// }
module.exports = {
    preset: 'jest-expo',
    // testMatch: ['*/__tests__//.test.[jt]s?(x)', '*/?(.)+(spec|test).[jt]s?(x)'],
    setupFilesAfterEnv: ['@testing-library/jest-native/extend-expect'],
    moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'],
};
