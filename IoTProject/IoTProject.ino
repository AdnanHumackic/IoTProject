int soilMoisturePin = A0;
const int dryValue = 700;     
const int wetValue = 300;     
const int moisturePin = D0; 
const int lowTempLedPin = D2;  
#include <DHT.h>
#include <ESP8266WiFi.h>
#include<FirebaseESP8266.h>

#define DHTPIN D1
#define DHTTYPE DHT11 


#define FIREBASE_HOST "your_firebase_host"
#define FIREBASE_AUTH "your_firebase_auth"
#define REFERENCE_URL "your_reference_url"

#define WIFI_SSID "your_wifi_name"
#define WIFI_PASSWORD "your_wifi_password"

FirebaseData firebaseData;

DHT dht(DHTPIN, DHTTYPE); 



void setup() {
  Serial.begin(115200);
  dht.begin();
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);

  pinMode(moisturePin, OUTPUT); 
  pinMode(lowTempLedPin, OUTPUT);

  digitalWrite(moisturePin, LOW);
  digitalWrite(lowTempLedPin, LOW);

  while(WiFi.status()!=WL_CONNECTED){
    Serial.print(".");
    delay(300);
  }
  Firebase.begin(FIREBASE_HOST, FIREBASE_AUTH);
  Firebase.reconnectWiFi(true);
}

void loop() {
  delay(2000);  
  float temperature = dht.readTemperature();
  float humidity = dht.readHumidity();

  Serial.print("Temperatura: ");
  Serial.print(temperature);
  Serial.print(" °C, Vlažnost: ");
  Serial.print(humidity);
  Serial.println(" %");


  int soilMoistureValue = analogRead(soilMoisturePin);

  int mappedValue = map(soilMoistureValue, dryValue, wetValue, 0, 100);
  int soilMoisturePercentage = constrain(mappedValue, 0, 100);

  Serial.print("Vlaga tla: ");
  Serial.print(soilMoisturePercentage);
  Serial.println("%");

  bool statusMoisture;
  bool statusTemperature;

  String path = "/data"; 
  Firebase.setFloat(firebaseData, path + "/Temperature", temperature);
  Firebase.setFloat(firebaseData, path + "/Humidity", humidity);
  Firebase.setInt(firebaseData, path + "/SoilMoisture", soilMoisturePercentage);


  if(Firebase.getInt(firebaseData, path+"/MoistureStatus", &statusMoisture))
  {
    if(statusMoisture==1)
    {
      digitalWrite(moisturePin, HIGH);
    }
    else if(statusMoisture==0)
    {
      digitalWrite(moisturePin, LOW);
    }

  }
  
 
  if(Firebase.getInt(firebaseData, path+"/LowTempLedStatus", &statusTemperature))
  {
     if(statusTemperature==1)
     {
      digitalWrite(lowTempLedPin, HIGH);
     }
    else if(statusTemperature==0)
    {
      digitalWrite(lowTempLedPin, LOW);
    }
  }

  
  delay(1000);
}

