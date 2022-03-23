import moment from "moment";
import fr from "moment/locale/fr"
import Image from "next/image";

export default function WeeklyWeather({ weeklyWeather }) {

    return (
      <div className="">
        <h3 className="text-3xl">
          Météo de la semaine
        </h3>
  
        {weeklyWeather.length > 0 &&
          weeklyWeather.map((weather, index) => {
            if (index == 0) {
              return;
            }
  
            return (
              <div className="py-3" key={weather.dt}>
                <div className="flex justify-between bg-blue-600 py-2 px-4 text-white rounded-xl">
                  <div className="flex space-x-5 items-center">
                    <div>
                      <h3 className="font-bold text-xl">
                        {moment.unix(weather.dt).locale("fr").format("dddd")}
                      </h3>
  
                      <h4 className="space-x-2">
                        <span className="text-xl font-bold">{weather.temp.max.toFixed(0)}&deg;C</span>
                        <span className="text-lg">{weather.temp.min.toFixed(0)}&deg;C</span>
                      </h4>
                    </div>
  
                    <div className="">
                      <div>
                        <span className="font-bold text-lg pr-2">Sunrise</span>
                        <span>
                          {moment.unix(weather.sunrise).format("LT")}
                        </span>
                      </div>
  
                      <div>
                        <span className="font-bold text-lg pr-2">Sunset</span>
                        <span>
                          {moment.unix(weather.sunset).format("LT")}
                        </span>
                      </div>
                    </div>
                  </div>
  
                  <div className="text-center">
                    <div className="">
                      <div>
                        <Image
                          src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                          alt="Weather Icon"
                          layout="fixed" width={80} height={80}
                        />
                      </div>
                    </div>
                    </div>
                </div>
              </div>
            );
          })}
      </div>
    );
  }