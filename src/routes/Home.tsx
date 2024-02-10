/**
 * @file Contains functions related to rendering the current conditions.
 * @author Chad Chapman
 */
import '../css/currentConditions.css';
import '../css/currentConditionsBackground.css';
import { DateTimeUtility } from '../ts/DateTimeUtility';
import { ChangeEvent, FC, useState, useEffect } from 'react';
import { ForecastHeader } from '../components/ForecastHeader/ForecastHeader';
import { optionType } from '../ts/Option';
import SearchBar  from '../components/SearchBar.tsx';
import UnitToggleSwitch from '../components/UnitsToggleSwitch';
import { Weather } from "../ts/Weather";


/**
 * @interface HomePageProps The interface that describes props that are shared 
 * between components.
 */
interface HomePageProps {
    dateTimeUtility: DateTimeUtility;
    weather: Weather;
}


/**
 * Renders the current conditions forecast component.
 * @returns JSX.Element that contains the current conditions forecast 
 * component.
 */
const Home : FC<HomePageProps> = ({ dateTimeUtility, weather }): JSX.Element => {
    /**
     * @prop Name of city for current or remote location we are getting the 
     * weather forecast.
     */
    const [city, setCity] = useState<any>();

    /**
     * @prop Used to set background of app based on current conditions based 
     * on free tier data.
     */
    const [conditionsClassName, setConditionsClassName] = useState<string>("");

    /**
     * @prop Name of country where city is located.
     */
    const [country, setCountry] = useState(Object);

    /**
     * @prop Description of current conditions outside.
     */
    const [currentConditions, setCurrentConditions] = useState<string>();

    /**
     * @prop for date in the following format: 
     * <day_of_week>, <month> <day_of_month>, <year>.
     */
    const [date, setDate] = useState<string>("");

    const [dateTimeStamp, setDateTimeStamp] = useState<string>("");

    /**
     * @prop Property for feels like temperature.
     */
    const [feelsLikeTemperature, setFeelsLikeTemperature] = useState<string>("")

    /**
     * @prop Represents time forecast data was fetched for a particular location.
     */
    const [forecastTime, setForecastTime] = useState<string>("");

    /**
     * @prop Free tier data to display current conditions.
     */
    const [freeTierData, setFreeTierData] = useState<any>();

    /**
     * @prop Current day high temperature.
     */
    const [highTemperature, setHighTemperature] = useState<number>();

    /**
     * @prop The current time.
     */
    const [localTime, setLocalTime] = useState<Date>(new Date());

    /**
     * @prop Current day low temperature.
     */
    const [lowTemperature, setLowTemperature] = useState<number>();

    /**
     * @prop One call tier data for displaying hourly and daily forecast.
     */
    const [oneCallData, setOneCallData] = useState<any>();

    /**
     * @prop Property for current temperature.
     */
    const [temperature, setTemperature] = useState<number>();

    /**
     * @prop Label for unit of temperature measure (Ex: C or F).
     */
    const [temperatureUnitsLabel, setTemperatureUnitsLabel] = useState<string>("");

    /**
     * @prop Property for checkbox depending on whether or not it is
     * checked.
     */
    const [toggled, setIsToggled] = useState<boolean>(false);

    /**
     * This function is called when state of units toggle switch is updated.
     */
    const handleToggleChange = (): void => {
        weather.toggleUnits();
        setToggleCheckedState();
    }

    /**
     * Sets state for current city.
     */
    const setCityName = async (): Promise<void> => {
        setCity(await weather.getCityInfo());
    }

    /**
     * Sets state for country for where current city is located.
     */
    const setCountryName = async (): Promise<void> => {
        setCountry(await weather.getCountryName());
    }

    /**
     * Capitalize first letter of each word of current conditions description.
     */
    const setCurrentConditionsProps = async (): Promise<void> => {
        const currentConditions: string = await freeTierData?.weather[0].description;
        console.log("current conditions:");
        console.log(currentConditions);
        const wordsArray: string[] = currentConditions.split(" ");
        for(let i: number = 0; i < wordsArray.length; i++) {
            wordsArray[i] = wordsArray[i][0].toUpperCase() + wordsArray[i].substring(1);
        }

        setCurrentConditions(wordsArray.join(" "));
        setConditionsClassName(weather.setConditionsClass(currentConditions));
    }
 
    /**
     * Gets date time stamp from one call data and sets date as string using 
     * the format: <day_of_week>, <month> <day_of_month>, <year>.
     */
    const setCurrentDate = (): void => {
        setDate(dateTimeUtility.getDateInfo(dateTimeStamp));
    }

    /**
     * Sets date-time stamp for GMT.
     */
    const setDateTime = (): void => {
        setDateTimeStamp(dateTimeUtility.getDateTime(
            oneCallData?.current.dt, oneCallData?.timezone_offset));
    }

    /**
     * Sets the time for location we are fetching data.
     */
    const setForecastTimeInformation = (): void => {
        setForecastTime(dateTimeUtility.getTimeInfo(dateTimeStamp));
    }

    /**
     * Sets value for variable "toggled" depending on what units is being used 
     * by the Weather class instance.
     */
    const setToggleCheckedState = (): void => {
        if (weather.getUnits() === "IMPERIAL") setIsToggled(false);
        else if (weather.getUnits() === "METRIC") setIsToggled(true);
    }

    /**
     * Set the value for the units label prop to C or F.
     */
    const updateTemperatureUnitsLabel = (): void => {
        if (weather.getUnits() === "IMPERIAL") setTemperatureUnitsLabel("F");
        else if (weather.getUnits() === "METRIC" ) setTemperatureUnitsLabel("C");
    }

    const [searchCity, setSearchCity] = useState<optionType | null>(null);

    /**
     * @prop The available location suggestions presented to the user.
     */
    const [options, setOptions] = useState<[]>([]);

    /**
     * @prop The search term that the user enters into the search bar.
     */
    const [searchTerm, setSearchTerm] = useState<string>('');
    
    /**
     * Retrieves suggested names for locations when user types query into 
     * the search bar.
     * @param value Input for search bar.
     */
    const getSearchOptions = (value: string) => {
        fetch(`http://${import.meta.env.VITE_API_HOSTNAME}:3000/api?type=SEARCH_TERM&&searchTerm=${value.trim()}`)
        .then((response) => response.json())
        .then(res => {
            if (res.data) {
                setOptions(res.data);
            }
        })
    }

    /**
     * Detects input from search field and sets search term and search options 
     * that will be presented to the user.
     * @param e Event for when new input is detected in the search field.
     * @returns 
     */
    const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearchTerm(value);
        
        // Return if empty.
        if (value === '') return;
        getSearchOptions(value);
        console.log(options)
    }

    const onOptionSelect = async (option: optionType) => {
        setSearchCity(option);
        console.log(option.name);
    }

    const getForecast = async (city: optionType) => {
        console.log("Search Data");
        const freeTier =  await weather.getCityData(`${city.name},${city.state}`);
        setCity(`${city.name},${city.state}`);
        console.log(city);
        weather.setJSONFreeTierData(freeTier);
        setFreeTierData(freeTier);
        console.log(freeTier)
        const oneCall =  await weather.getOneCallWeatherData(city.lat, city.lon);
        weather.setJSONOneCallWeatherData(oneCall);
        setOneCallData(oneCall);
        console.log(oneCall);
    }

    const onSubmit = () => {
        if(!searchCity) return;
        getForecast(searchCity);
    }

    useEffect(() => {
        if(searchCity) {
            setSearchTerm(searchCity.name);
            setCity(`${searchCity.name},${searchCity.state}`);
            setOptions([]);
        } else {
            setCityName();
        }
        
        setCountryName();
        setFreeTierData(weather.getJSONFreeTierData());
        setOneCallData(weather.getJSONOneCallWeatherData());
        setToggleCheckedState();
        updateTemperatureUnitsLabel();

        // Set time to be rendered and refresh every second.
        setInterval(() => setLocalTime(new Date()), 1000);
        setDateTime();
        setForecastTimeInformation();
        setCurrentDate();

        // Temperature props.
        setTemperature(weather.calculateTemperature(freeTierData?.main.temp));
        setFeelsLikeTemperature(weather.calculateTemperature(
            freeTierData?.main.feels_like));
        setHighTemperature(weather.calculateTemperature(freeTierData?.main.temp_max));
        setLowTemperature(weather.calculateTemperature(freeTierData?.main.temp_min));

        setCurrentConditionsProps();

        console.log(city + ", " + country);
        console.log("Free tier data (ctrl+s if no output on page load):");
        console.log(freeTierData);
        console.log("One call data");
        console.log(oneCallData);

        // If something isn't right add prop to dependency array.
    }, [weather, toggled, temperature, freeTierData]);

    
    return (
        <div className={conditionsClassName}>
            <div className='forecast'>
                <ForecastHeader>
                    <SearchBar searchTerm={searchTerm}
                        options={options}
                        onInputChange={onInputChange}
                        onOptionSelect={onOptionSelect}
                        onSubmit={onSubmit}  />

                    <UnitToggleSwitch weather={weather} 
                        rounded={true} 
                        isToggled={toggled} 
                        handleToggleChange={handleToggleChange}/>
                    <h2 className='page-title'>Current conditions in {typeof city === 'string' ? city : null}</h2>
                </ForecastHeader>
                <p className='daily-description'>{oneCallData?.daily[0].summary}</p>
                <div className='current-conditions-container'>
                    <div className='current-conditions-left'>
                        <div className="date-time-container">
                            <div>{date}</div>
                            <div>Local Time: {localTime.toLocaleTimeString()}</div>
                            <div>Forecast Location Time: {typeof forecastTime === 'string' ? forecastTime : null}</div>
                        </div>
                        <div className='current-temperature'>{temperature} {'\xB0'}{typeof temperatureUnitsLabel === 'string' ? temperatureUnitsLabel : null}</div>
                        <div className='today-high-low-temperature'>Today's High: {highTemperature} {'\xB0'}{typeof temperatureUnitsLabel === 'string' ? temperatureUnitsLabel : null}</div>
                        <div className='today-high-low-temperature'>Today's Low: {lowTemperature} {'\xB0'}{typeof temperatureUnitsLabel === 'string' ? temperatureUnitsLabel : null}</div>
                        <div className='description-container'>
                            <div className='current-conditions-description'>
                                {typeof currentConditions === 'string' ? currentConditions : null}
                            </div>
                            <img className='description-icon' 
                                src={`https://openweathermap.org/img/wn/${freeTierData?.weather[0].icon}@2x.png`}>
                            </img>
                        </div>
                    </div>
                    <div className='current-conditions-right'>
                        <div className='current-conditions-info'>
                            <img src="./icons/temperature-feels-like.svg"></img>
                            <div className='current-conditions-info-description'>
                                Feels Like
                                <div>{feelsLikeTemperature} {'\xB0'}{typeof temperatureUnitsLabel === 'string' ? temperatureUnitsLabel : null}</div>
                            </div>
                        </div>
                        <div className='current-conditions-info'>
                            <img className="conditions-icon" src="./icons/humidity.png"></img>
                            <div className='current-conditions-info-description'>
                                Humidity
                                <div>{freeTierData && freeTierData.main.humidity}%</div>
                            </div>
                        </div>
                        <div className='current-conditions-info'>
                            <img className="conditions-icon" src="./icons/weather-pouring.png"></img>
                            <div className='current-conditions-info-description'>
                                Chance of PPT
                                <div>{oneCallData && (oneCallData.daily[0].pop * 100).toFixed(0)}%</div>
                            </div>
                        </div>
                        <div className='current-conditions-info'>
                            <img className="conditions-icon" src="./icons/weather-windy.png"></img>
                            <div className='current-conditions-info-description'>
                                Winds
                                <div>{weather.getWindSpeed(freeTierData?.wind.speed)}, {weather.getWindDirection(freeTierData?.wind.deg)}</div>
                                Wind Gusts
                                <div>{weather.getWindSpeed(oneCallData?.daily[0].wind_gust)}</div>
                            </div>
                        </div>
                    </div>
                </div>  
                <hr className='hr-border'></hr>
                <div>foo</div>           
            </div>
            <div className='forecast'>
                <h3>Free Tier Data</h3>
                <p>clouds: {freeTierData && freeTierData.clouds.all}</p>
                <p>cod: {freeTierData && freeTierData.cod}</p>
                <br></br>
                <h4>coord:</h4>
                <p>lat:{freeTierData && freeTierData.coord.lat}</p>
                <p>lon:{freeTierData && freeTierData.coord.lon}</p>
                <br></br>
                <p>dt: {freeTierData && freeTierData.dt}</p>
                <p>id: {freeTierData && freeTierData.id}</p>
                <br></br>
                <h4>main:</h4>
                <p>feels_like: {freeTierData && freeTierData.main.feels_like}</p>
                <p>humidity: {freeTierData && freeTierData.main.humidity}</p>
                <p>pressure: {freeTierData && freeTierData.main.pressure}</p>
                <p>temp: {freeTierData && freeTierData.main.temp}</p>
                <p>temp_max: {freeTierData && freeTierData.main.temp_max}</p>
                <p>temp_min: {freeTierData && freeTierData.main.temp_min}</p>
                <p>name: {freeTierData && freeTierData.name}</p>
                <br></br>
                <h4>sys:</h4>
                <p>country: {freeTierData && freeTierData.sys.country}</p>
                <p>id: {freeTierData && freeTierData.sys.id}</p>
                <p>sunrise: {freeTierData && freeTierData.sys.sunrise}</p>
                <p>sunset: {freeTierData && freeTierData.sys.sunset}</p>
                <p>type: {freeTierData && freeTierData.sys.type}</p>
                <br></br>
                <p>timezone: {freeTierData && freeTierData.timezone}</p>
                <p>visibility: {freeTierData && freeTierData.visibility}</p>
                <br></br>
                <h4>weather: Array[1]</h4>
                <p>description: {freeTierData && freeTierData.weather[0].description}</p>
                <p>icon:</p>
                {/* freeTierData? to prevent undefined property error */}
                <div><img src={`https://openweathermap.org/img/wn/${freeTierData?.weather[0].icon}@2x.png`}></img></div>
                <p>id: {freeTierData && freeTierData.weather[0].id}</p>
                <p>main: {freeTierData && freeTierData.weather[0].main}</p>
                <br></br>
                <h4>wind:</h4>
                <p>deg: {freeTierData && freeTierData.wind.deg}</p>
                <p>gust: {freeTierData && freeTierData.wind.gust}</p>
                <p>speed: {freeTierData && freeTierData.wind.speed}</p>
                <br></br>
                <hr></hr>
                <h3>One Call Data</h3>
                {/* oneCallData? to prevent undefined property error */}
                <p>{JSON.stringify(oneCallData)}</p>
            </div>
        </div> 
    )
};

export default Home;