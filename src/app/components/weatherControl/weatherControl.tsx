"use client";
import React, {useState, useEffect, useMemo} from "react";
import WeatherControlProps from "./weatherControlProps";
import DatePicker from "react-datepicker";
import {useRouter} from 'next/navigation';
import {ChartContainer, ControlInputsContainer, DateSelectContainer, WeatherControlWithStyles} from "./styles"
import "react-datepicker/dist/react-datepicker.css";
import {WeatherData, WeatherDataResponse} from "@/types/weather";
import {fetchWeatherData} from '../../services/weatherService'
import {TempChart} from './components/tempChart/tempChart';
import { validateDateRange } from '@/utils/date';

export const WeatherControl = ({className}: WeatherControlProps) => {
    const [isError, setIsError] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [startDate, setStartDate] = useState<Date>(() => {
        const result = new Date();
        result.setDate(result.getDate() - 30);
        return result;
    });
    const [endDate, setEndDate] = useState<Date>(new Date());
    const [weatherData, setWeatherData] = useState<WeatherData | null>(null);

    const router = useRouter();

    const updateUrlWithEncodedDates = (start: Date, end: Date) => {
        const encodedStart = btoa(start.toISOString());
        const encodedEnd = btoa(end.toISOString());

        const newUrl = `${window.location.pathname}?start=${encodeURIComponent(encodedStart)}&end=${encodeURIComponent(encodedEnd)}`;
        router.replace(newUrl, undefined, {shallow: true});
    };

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const encodedStart = params.get('start');
        const encodedEnd = params.get('end');

        if (encodedStart && encodedEnd) {
            const start = new Date(atob(decodeURIComponent(encodedStart)));
            const end = new Date(atob(decodeURIComponent(encodedEnd)));

            setStartDate(start);
            setEndDate(end);
            fetchData(start, end);
        } else {
            fetchData(startDate, endDate);
        }
    }, []);

    useEffect(() => {
        if (endDate && startDate) {
            updateUrlWithEncodedDates(startDate, endDate);
        }
    }, [endDate, startDate]);

    useEffect(() => {
        if (startDate && endDate) {
            fetchData(startDate, endDate);
        }
    }, [startDate, endDate]);

    const fetchData = async (start: Date, end: Date) => {
        try {
            if (!validateDateRange(start, end)) {
                setIsError(true);
                setErrorMessage("Please make sure that both dates are valid and the 'From' date is prior to the 'To' date and none is in the future.");
                return;
            }

            setIsError(false);
            setErrorMessage('');

            const data: WeatherDataResponse = await fetchWeatherData(start, end);
            const {time, temperature_2m_min, temperature_2m_max} = data.daily;
            setWeatherData({dates: time, maxTemp: temperature_2m_max, minTemp: temperature_2m_min});
        } catch (error) {
            console.error('Error fetching weather data:', error);
            setIsError(true);
            setErrorMessage("It seems that we are experiencing technical difficulties. Please try again later.");
        }
    };

    return (
        <WeatherControlWithStyles>
            <ChartContainer>
                {isError ? (
                    errorMessage
                ) : (
                    weatherData ? <TempChart weatherData={weatherData}/> : 'Loading'
                )}
            </ChartContainer>
            <ControlInputsContainer>
                <DateSelectContainer>
                    <label className={'date-label'} htmlFor={'start-date'}>From:</label>
                    <DatePicker className={'date-input'} id={'start-date'} selected={startDate} onChange={(date) => {
                        if (date) setStartDate(date)
                    }}/>
                </DateSelectContainer>
                <DateSelectContainer>
                    <label className={'date-label'} htmlFor={'end-date'}>To:</label>
                    <DatePicker className={'date-input'} id={'end-date'} selected={endDate} onChange={(date) => {
                        if (date) setEndDate(date)
                    }}/>
                </DateSelectContainer>
            </ControlInputsContainer>
        </WeatherControlWithStyles>
    );
}