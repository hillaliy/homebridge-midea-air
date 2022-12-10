<p ALIGN="CENTER">
<img src="branding/midea.png" width="250px">
<img src="https://github.com/homebridge/branding/raw/master/logos/homebridge-wordmark-logo-vertical.png" width="200px">
</p>

<SPAN ALIGN="CENTER">

# Homebridge Midea Air

[![Downloads](https://img.shields.io/npm/dt/homebridge-midea-air.svg?color=critical)](https://www.npmjs.com/package/homebridge-midea-air)
[![Version](https://img.shields.io/npm/v/homebridge-midea-air)](https://www.npmjs.com/package/homebridge-midea-air)
[![verified-by-homebridge](https://badgen.net/badge/homebridge/verified/purple)](https://github.com/homebridge/homebridge/wiki/Verified-Plugins)<br>
Homebridge Discord Channel - midea air<br>
[![Homebridge Discord](https://img.shields.io/discord/432663330281226270?color=728ED5&logo=discord&label=discord)](https://discord.gg/homebridge-432663330281226270)<br>

Programming is not easy. <br />
If you like this plugin or want to contribute to future development, a donation will help. <br /> <a target="blank" href="https://www.paypal.me/hillaliy"><img src="https://img.shields.io/badge/PayPal-Donate-blue.svg?logo=paypal"/></a><br>

## [Homebridge](https://github.com/nfarina/homebridge) plugin to control Midea Air Conditioner & Dehumidifier units.

<img src="branding/Air_Conditioner.png" width="200px"> &nbsp;
<img src="branding/Dehumidifier.jpeg" width="200px">

<SPAN ALIGN="Left">

**_Requirements:_**<br>
<img src="https://img.shields.io/badge/node-%3E%3D16.0.0-brightgreen"> &nbsp;
<img src="https://img.shields.io/badge/homebridge-%3E%3D1.5.0-brightgreen"> &nbsp;
<img src="https://img.shields.io/badge/iOS-%3E%3D14.0.0-brightgreen">

## ⚠️ Knowing Issues

- This plugin don't fully supported `Midea Mission II / Blanc / OSK105`, you can only get device status. <br />
- Using the Midea app and `Homebridge Midea Air plugin` at the same time causes a login error. Try to use [NetHome Plus](https://apps.apple.com/us/app/nethome-plus/id1008001920) app instead. <br />
- This plugin don't support `MSmartHome app`. <br />
- Audible Feedback on Dehumidifier don't work.

## 🛰️ Supported Devices

- This Plugin support Midea providers dongle - OSK102 / OSK103 (Hualing, Senville, Klimaire, AirCon, Century, Pridiom, Thermocore, Comfee, Alpine Home Air, Artel, Beko, Electrolux, Galactic, Idea, Inventor, Kaisai, Mitsui, Mr. Cool, Neoclima, Olimpia Splendid, Pioneer, QLIMA, Royal Clima, Qzen, Toshiba, Carrier, Goodman, Friedrich, Samsung, Kenmore, Trane, Lennox, LG, Electra and much more) and should be able to access all device in the user's account. <br />
- However, many devices may not be supported or function incorrectly.
  This is due to the lack of documentation of the raw MSmart API. <br />
- If you encounter any problems, please open a new issue and specify your device model.

## ⚙️ Configuration

You can use the plugin settings or add this to the platforms array in your config.json:

    {
        "user": "MIDEA_ACCOUNT_EMAIL",
        "password": "MIDEA_PASSWORD",
        "registeredApp": "NetHomePlus",
        "interval": 30,
        "devices": [
                {
                    "deviceId": "DeviceID-1",
                    "supportedSwingMode": "Both",
                    "temperatureSteps": 1,
                    "minTemp": 17,
                    "maxTemp": 30,
                    "fanOnlyMode": false,
                    "OutdoorTemperature": false,
                    "useFahrenheit": false,
                    "audibleFeedback": false
                },
                                {
                    "deviceId": "DeviceID-2",
                    "supportedSwingMode": "Both",
                    "temperatureSteps": 1,
                    "minTemp": 17,
                    "maxTemp": 30,
                    "fanOnlyMode": false,
                    "OutdoorTemperature": false,
                    "useFahrenheit": false,
                    "audibleFeedback": false
                }
        ],
        "platform": "midea-air"
    }

## ⚙️ Optional per-device Configuration Values

To set specific per-device values, you need to add deviceId that can find in:

1. Homebridge console log. ([midea-air] Created device: Kitchen, with ID: `XXXXXXXXXXXXXX`, and type: 172)
2. HomeKit app, device settings, info.

### 📟 Temperature Display Units (Only AC)

This Plugin support Celsius & Fahrenheit (You can set the Default unit on Homebridge config). <br />
Display Units can set in HomeKit app, device settings. <br />
`This is just to control the temperature unit of the AC's display. The target temperature setter always expects a celsius temperature (resolution of 0.5C), as does the midea API`

### 🎚️ Temperature Steps (Only AC)

This option change Temperature Steps on HomeKit.
You can choose 1˚ or 0.5˚, default is: 1˚

### 🎚️ Temperature Threshold (Only AC)

This option change Temperature Thrashold.
Defaults: minimum 17˚ / maximum 30˚

### 💨 Rotation Speed and Swing

Rotation Speed and Swing mode can set in the HomeKit app, device settings.
Rotation Speed values are:
| Air Conditioner | Dehumidifier |
| --- | --- |
| 0% Device Off | 0% Device Off |
| 20% Silent | 30% Silent |
| 40% Low | ... |
| 60% Middle | 60% Medium |
| 80% High | ... |
| 100% Auto | 100% Turbo |

Dehumidifier does not have an Swing mode, therefore in config.json select "None".

### 💧 Dehumidifier Relative Humidity

There is a difference between Midea app / Homebridge to HomeKit.
HomeKit Relative Humidity work between 0%-100% - Apple Policy.
| App / Homebridge | HomeKit |
| --- | --- |
| 35% | 0% |
| 40% | 10% |
| 45% | 20% |
| 50% | 30% |
| 55% | 40% |
| 60% | 50% |
| 65% | 60% |
| 70% | 70% |
| 75% | 80% |
| 80% | 90% |
| 85% | 100% |

### 💦 Dehumidifier Modes

Dehumidifier has 4 Operational modes. You can change modes according to the following table:

| Device     | HomeKit      |
| ---------- | ------------ |
| Normal     | HUMIDIFIER   |
| Continuous | ---          |
| Smart      | AUTO         |
| Dryer      | DEHUMIDIFIER |

Continuous mode will be considered as Auto mode.

### 🌪️ Fan Mode (only AC)

This allows you to enable a Fan mode service.

### 🌤️ Outdoor Temperature Sensor (Only AC)

This allows you to enable Outdoor Temperature service, if the AC support.

### 🔈 Audible Feedback

This set the Audible Feedback (beep sound).

## 🙏 Credits

This plugin would not have been possible without the fundamentals of all the Midea API clients in Python provided.
