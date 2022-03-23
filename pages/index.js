import Head from 'next/head'
import Image from 'next/image'
import { useEffect, useState } from 'react';

import Searchbar from '../components/Searchbar'

import { shuffle } from "lodash";

import cities from "../lib/city.list.json";
import Link from 'next/link';

const Home = ({ city, currentWeather, dailyWeather, hourlyWeather }) => {

  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const onChange = (e) => {
    const { value } = e.target;
    setQuery(value);

    let matchingCities = [];

    if (value.length > 3) {
      for (let city of cities) {
        if (matchingCities.length >= 5) {
          break;
        }

        const match = city.name.toLowerCase().startsWith(value.toLowerCase());

        if (match) {
          const cityData = {
            ...city,
            slug: `${city.name.toLowerCase().replace(/ /g, "-")}-${city.id}`,
          };

          matchingCities.push(cityData);
          continue;
        }
      }
    }

    return setResults(matchingCities);
  };

  return (
    <div className='py-5'>
      <h1 className='text-center text-2xl font-bold'>Freedom/Meteo</h1>
      <div class="flex justify-center py-5">
        <div class="mb-3 w-96">
          <div class="input-group relative flex flex-wrap items-stretch w-full mb-4">
            <input type="text" class="form-control relative flex-auto min-w-0 block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-black focus:outline-none mb-3" placeholder="Cherche la météo de ta ville" aria-label="Search" value={query} onChange={onChange} />

            {query.length > 3 && (
              <ul className='border border-black p-2 w-full rounded'>
                {results.length > 0 ? (
                  results.map((city) => {
                    return (
                      <li key={city.slug} className='border border-white border-b-gray-300 py-[2px]'>
                        <Link href={`/location/${city.slug}`}>
                          <a>
                            {city.name}
                            {city.state ? `, ${city.state}` : ""}{" "}
                            <span>({city.country})</span>
                          </a>
                        </Link>
                      </li>
                    );
                  })
                  ) : (
                  <li className="py-2 text-red-400 font-bold">Aucun résultat</li>
                )}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home

