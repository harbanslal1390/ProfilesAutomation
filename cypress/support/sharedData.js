const sharedData = {};

module.exports = {
    setValue: (key, value) => { sharedData[key] = value; },
    getValue: (key) => sharedData[key],
};