# homebridge-midea

[![Donate](https://img.shields.io/badge/Donate-PayPal-green.svg)](https://paypal.me/TobiasTimpe) – In case you want to support my work :)

Homebridge plugin to control Midea AC units. Still in early development.

## Configuration

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

## Optional per-device Configuration Values

To set specific per-device values, be sure to first look into the Home app to find your deviceId and use it as the key in the devices object

### supportedSwingMode

"Nona", "Vertical", "Horizontal", "Both"
You have to select which type your device supports

## Usage

Rotation Speed/Swing mode can set in the homekit device when you swipe up tp the device settings.
Rotation Speed values are:
0 : device off
-25%: Low
-50%: Middle
-75%: High
-100%: Auto

## Notes

This version of `homebridge-midea-air` is a platform and should be able to access all device in the user's account. However, many devices may not be supported or function incorrectly. This is due to the lack of documentation of the raw MSmart API. If you encounter any problems, please open a new issue and specify your device model.
