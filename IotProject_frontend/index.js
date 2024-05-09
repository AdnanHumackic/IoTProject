import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getDatabase, ref, onValue, get, set } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";
        
const firebaseConfig = {
    //your_firebase_config
};
const app = initializeApp(firebaseConfig);
function getAllData() {
    const db = getDatabase(app);
    const dataRef = ref(db, "data");
    onValue(dataRef, (snapshot) => {
    const data = snapshot.val();
    console.log("Updated data:", data);
    if (data) 
    {
    console.log("Humidity:", data.Humidity);
    console.log("Soil Moisture:", data.SoilMoisture);
    console.log("Temperature:", data.Temperature);
    console.log("Moisture Status:", data.MoistureStatus);
    console.log("Low Temp LED Status:", data.LowTempLedStatus);
    document.getElementById("temp").innerHTML = `${data.Temperature} &deg;C`;
    document.getElementById("airHumidity").innerHTML = `${data.Humidity} %`;
    document.getElementById("soilM").innerHTML = `${data.SoilMoisture} %`;
    }
        },
        {
            onlyOnce: false
        });
}
getAllData();
 window.turnOnWaterPump = async function() 
{
    const db = getDatabase(app);
    const dataRef = ref(db, "data");
    const snapshot = await get(dataRef);
    const currentData = snapshot.val();
    currentData.MoistureStatus = 1;
    
    await set(dataRef, currentData);
    document.getElementById("btnTwoOn").style.display="none"
    document.getElementById("btnTwoOff").style.display="inline"
    document.getElementById("fanStatus").innerHTML="Water pump is currently: ON!";
}
window.turnOffWaterPump = async function() 
{
    const db = getDatabase(app);
    const dataRef = ref(db, "data");
    const snapshot = await get(dataRef);
    const currentData = snapshot.val();
    currentData.MoistureStatus = 0;
    await set(dataRef, currentData);
    document.getElementById("btnTwoOn").style.display="inline"
    document.getElementById("btnTwoOff").style.display="none"
    document.getElementById("fanStatus").innerHTML="Water pump is currently: OFF!";
}

window.turnOnTheFan = async function() {
    const db = getDatabase(app);
    const dataRef = ref(db, "data");
    const snapshot = await get(dataRef);
    const currentData = snapshot.val();
    currentData.LowTempLedStatus = 1;
    await set(dataRef, currentData);
    document.getElementById("btnOn").style.display="none";
    document.getElementById("btnOff").style.display="inline";
    document.getElementById("waterPumpStatus").innerHTML="Fan is currently: ON!";
}

window.turnOffTheFan = async function() {
    const db = getDatabase(app);
    const dataRef = ref(db, "data");
    const snapshot = await get(dataRef);
    const currentData = snapshot.val();
    currentData.LowTempLedStatus = 0;
    await set(dataRef, currentData);
    document.getElementById("btnOn").style.display="inline";
    document.getElementById("btnOff").style.display="none";
    document.getElementById("waterPumpStatus").innerHTML="Fan is currently: OFF!";

}