module.exports = {
    concurrentSessions: 3,
    apiKey: 'SmdyBDsrqYN6Nbm97Ry100qfmeNHWMVaB1QlDke5MMXeVI110',
    showLogs: true,
    browser: [
        // Add browsers with different viewports
        {width: 800, height: 600, name: 'Safari'},
        {width: 1024, height: 768, name: 'chrome'},
        // Add mobile emulation devices in Portrait mode
        {deviceName: 'iPhone X', screenOrientation: 'portrait'}
    ]
}