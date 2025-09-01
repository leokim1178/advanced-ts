import {Equal, Expect} from "../helper";


const getLocationWeather = (locationId: string) => {
    return `Weather at location ${locationId}`;
};
type GetLocationWeatherReturn = ReturnType<typeof getLocationWeather>;
const getDetailedWeather = (
    locationId: string,
    details?: {
        tempUnit?: 'C' | 'F';
        includeForecast?: boolean;
    },
) => {
};
type GetDetailedWeatherParameters = Parameters<typeof getDetailedWeather>;

type tests = [
    Expect<Equal<GetLocationWeatherReturn, string>>,
    Expect<Equal<GetDetailedWeatherParameters,Parameters<typeof getDetailedWeather>>>,
    Expect<Equal<GetDetailedWeatherParameters,[ // 이렇게 튜플값으로 넘기면 동일하게 추론된다
        locationId: string,
        details?: {
            tempUnit?: 'C' | 'F';
            includeForecast?: boolean;
        },
    ]>>
];
