# IoTProject
<hr>
<b>About project:</b>

A greenhouse monitoring system is a device consisting of an ESP8266 microcontroller, a DHT11 sensor for measuring air temperature and humidity, and a Capacitive Soil Moisture Sensor v2.0 for measuring soil moisture. The device communicates with a Firebase database, and upon powering on, the sensors start operating and send the measured values to Firebase. After sending to Firebase, the measured values are displayed on the control panel. In addition to measuring and displaying values, the user can also control the on/off status of the fan and water pump from the control panel. The activation and deactivation of the fan and water pump are simulated using two LED diodes, which are controlled by two buttons on the control panel. Clicking on the button changes its status on Firebase, and depending on the status, it either turns on or off.
<hr>
<br>
<b>Presentation of read parameters</b>
<img src="https://github.com/AdnanHumackic/IoTProject/assets/117025277/f42255a3-a552-4c67-8f06-23f0967d7c3d"/>
<br>
<hr>
<b>Required Hardware:</b>
<ul>
    <li>ESP8266 microcontroller</li>
    <li>DHT11 sensor</li>
    <li>Capacitive Soil Moisture Sensor v2.0</li>
    <li>2 LED diodes</li>
</ul>
<b>Instructions for use:</b>

Open IoTProject_frontend and run the command "npm install" in the terminal to install all necessary packages. After all necessary packages are installed, you need to enter the Firebase configuration in the index.js file at the designated location. Once these steps are completed, you need to run the IoTProject.ino file located in the IoTProject folder. Similarly to index.js, you need to enter the required data requested.
After you complete all of this, you need to connect all the components and then connect the ESP8266 microcontroller to your computer using a Micro USB cable.

