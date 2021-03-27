# homebridge-midea-air

Homebridge plugin for Midea AC units, Still in early development.

Configuration

Add this to the platforms array in your config.json:

{
"platform": "midea",
"user": "MIDEA_ACCOUNT_EMAIL",
"password": "MIDEA_PASSWORD",
"interval": 1,
"debug": true,
"devices": [
{
"deviceId": "DEVICE_ID",
"supportedSwingMode": "Both"
}
]
}

Optional per-device Configuration Values

supportedSwingMode

"None", "Vertical", "Horizontal", "Both" You have to select which type your device supports

Usage

Rotation Speed/Swing mode can set in the homekit device when you swipe up tp the device settings. Rotation Speed values are: 0 : device off -25%: Low -50%: Middle -75%: High -100%: Auto
