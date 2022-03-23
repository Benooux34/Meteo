import Image from 'next/image'
import moment from "moment";

function TodaysWeather({ city, weather }) {
  return (
    <div className='        
    bg-[url("https://static.vecteezy.com/ti/vecteur-libre/p1/1308327-montagnes-la-nuit-paysage-scene-vectoriel.jpg")]
    h-80 rounded-xl bg-cover
    my-5 bg-bottom
    sm:h-[320px]
    lg:bg-center'>
      <div className=' flex justify-between'>
        <div className="text-center pl-5 pt-10">
          <h2 className="text-white text-4xl font-bold pt-2 pb-5">{city.name} ({city.country})</h2>
          <div className="flex justify-center space-x-3">
            <span className="text-white text-4xl font-semibold">{weather.temp.max.toFixed(0)}&deg;C</span>
            <span className="text-gray-400 text-3xl">{weather.temp.min.toFixed(0)}&deg;C</span>
          </div>
        </div>
        <div className="pt-[50px]">
          <Image
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt="Weather Icon"
            layout='fixed' width={150} height={150} 
          />
        </div>
      </div>
      <div className="text-center pt-5">
        <div className='space-x-5'>
          <span className='text-white text-2xl'>Sunrise</span>
          <span className='text-white text-2xl'>Sunset</span>
        </div>
        <div className='space-x-5'>
          <span className='text-gray-400 text-xl'>
            {moment.unix(weather.sunrise).format("LT")}
          </span>
          <span className='text-gray-400 text-xl'>
            {moment.unix(weather.sunset).format("LT")}
          </span>
        </div>
      </div>
    </div>
  )
}

export default TodaysWeather