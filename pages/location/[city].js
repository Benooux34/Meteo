import cities from "../../lib/city.list.json"
import Head from 'next/head'
import TodaysWeather from "../../components/TodaysWeather";
import WeeklyWeather from "../../components/WeeklyWeather";
import Link from "next/link";

export async function getServerSideProps(context) {
    const city = getCityId(context.params.city);
  
    if (!city) {
      return {
        notFound: true,
      };
    }
  
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${city.coord.lat}&lon=${city.coord.lon}&appid=${process.env.API_KEY}&exclude=minutely&units=metric`
    );

    const data = await res.json();

  if (!data) {
    return {
      notFound: true,
    };
  }

    const hourlyWeather = getHourlyWeather(data.hourly);
    const weeklyWeather = data.daily;

    return {
        props: {
            city: city,
            currentWeather: data.current,
            dailyWeather: data.daily,
            hourlyWeather: hourlyWeather,
            weeklyWeather: weeklyWeather,
        }
    }
}

const getCityId = (param) => {
    const cityParam = param.trim();
    // get the id of the city
    const splitCity = cityParam.split("-");
    const id = splitCity[splitCity.length - 1];
  
    if (!id) {
      return null;
    }
  
    const city = cities.find((city) => city.id.toString() == id);
  
    if (city) {
      return city;
    } else {
      return null;
    }
  };

  const getHourlyWeather = (hourlyData) => {
      const current = new Date();
      current.setHours(current.getHours(), 0, 0, 0);
      const tomorrow = new Date(current);
      tomorrow.setDate(tomorrow.getDate() + 1);
      tomorrow.setHours(0, 0, 0, 0);

      const currentTimeStamp = Math.floor(current.getTime() / 1000);
      const tomorrowTimeStamp = Math.floor(tomorrow.getTime() / 1000);

      const todaysData = hourlyData.filter(data => data.dt < tomorrowTimeStamp);

      return todaysData;
  }

function city({ city, dailyWeather, weeklyWeather }) {
  return (
    <div>
        <Head>
            <title>Météo - {city.name}</title>
        </Head>

        <div className="mx-5 md:mx-20 lg:mx-80">
          <Link href="/">
            <button className="cursor-pointer bg-blue-600 p-2 rounded-xl mt-5 text-white">Retour à la page d'accueil</button>
          </Link>
          <TodaysWeather city={city} weather={dailyWeather[0]} />
          <WeeklyWeather weeklyWeather={weeklyWeather} />
        </div>

    </div>
  )
}

export default city