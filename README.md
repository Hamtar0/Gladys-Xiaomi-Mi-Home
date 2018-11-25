# Gladys Mi Home

The goal of this module is to receive events from Xiaomi Home Devices

## Hardware

- [Xiaomi GateWay](https://fr.gearbest.com/living-appliances/pp_344667.html?wid=55)
- [Xiaomi Switch Button](https://fr.gearbest.com/smart-light-bulb/pp_257679.html?wid=55)
- [Xiaomi Door & Sensor](https://fr.gearbest.com/access-control/pp_626703.html?wid=55)
- [Xiaomi Aqara Humidity & Temperature](https://fr.gearbest.com/access-control/pp_626702.html?wid=55)
- [Xiaomi Aqara Motion Sensor](https://fr.gearbest.com/alarm-systems/pp_659226.html?wid=1433363)

## Prerequisite

- Install the MiHome app from Google Play or AppStore
- Set your region to Mainland China when app init or under Settings -> Locale
- Setup, connect your Gateway & all your Xiaomi devices 
- Update gateway to the latest firmware
- Enable developer mode by following this tutoriel => https://github.com/fooxy/homeassistant-aqara/wiki/Enable-dev-mode
- Find the password dev to be able to play with sound and light on the gateway

## Installation

To install this module :

- Install the module in Gladys
- Reboot Gladys
- Go to "Parameters > Parameters" in Gladys admin and change the value of XIAOMI_GATEWAY_IDENTIFIER_<the identifier of the gateway on your devices view> "default_value" by the dev password in Mi Home app.
- Voilà !

## To do

Add support for :
- cube
- plug
- original sensor temperature
- leak sensor
- smoke sensor

Add interactions with gateway (light, color, sound)
