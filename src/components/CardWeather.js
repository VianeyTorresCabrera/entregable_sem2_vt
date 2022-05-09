import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Clock from "./Clock";


const CardWeather = () => {
    
   
    const [weather, setWeather] = useState({})   
    const [isCelcius,setIsCelcius] = useState(true)
    const [cord] = useState({});


  useEffect(() => {

    function success(pos) {
      var crd = pos.coords;
    
      console.log('Your current position is:');
      console.log(`Latitude : ${crd.latitude}`);
      console.log(`Longitude: ${crd.longitude}`);
      console.log(`More or less ${crd.accuracy} meters.`);
      axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${crd.latitude}&lon=${crd.longitude}&appid=5fae0d2f60caf1bfe9c6c5dafcc4bf42`)
        .then(res => 
            {
                setWeather(res.data)
                
                
            });
    };

    
     
    
    function error(err) {
      console.warn(`ERROR(${err.code}): ${err.message}`);
    };
    
    navigator.geolocation.getCurrentPosition(success, error);

  },[])

  
    console.log(weather.weather?.[0].icon)      
    console.log(weather.name)
    console.log(weather.sys?.country)
    console.log(weather)

    

    const changeUnit = () => setIsCelcius(!isCelcius)

    const date = new Date();
    let dateFormat = `${date.toDateString().split(' ')[1]} ${String(date.getDate()).padStart(2, '0')} ${date.toDateString().split(' ')[0]}`;       
    
        
    return (
        <div className="App" >

            <div className='Card'>
                <h1>WEATHER APP</h1>
                <h3 className='country'>{weather.name},{weather.sys?.country}</h3>
                <p className='description'>{weather.weather?.[0].description}</p>
                
                <div className='right'>
                  <p><b>Speed: </b> {weather.wind?.speed} m/s</p>
                  <p><b>Clouds:  </b> {weather.clouds?.all}</p>
                  <p><b>Pressure:  </b> {weather.main?.pressure}</p>
                </div>

                <div className='icon_weather'>
                  <article className='container_clock'>
                      <Clock />
                      <p>{cord.name} - {cord.sys?.country}</p>
                      <p>{dateFormat}</p>
                  </article>
                  <img src={`http://openweathermap.org/img/wn/${weather.weather?.[0].icon}@2x.png`} alt='wather'></img>
                </div>

                <div className='temperature'>
                  <p> <b>Temperature:  </b>{isCelcius ?  `${((weather.main?.temp)-273.15).toFixed(2)} Celcius` : `${(((weather.main?.temp) - 273.15) * 9/5 + 32).toFixed(2)} Farenheit`}</p>
                  <img src={`https://cdn-icons-png.flaticon.com/512/2622/2622386.png`} onClick={changeUnit} className="thermo"  title='°C/°F' alt='themperature'/>
                </div>

            </div>
     
        </div>
    );
};

export default CardWeather;