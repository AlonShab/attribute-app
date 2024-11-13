// src/pages/api/weather.ts
import {NextApiRequest, NextApiResponse} from 'next';
import axios from 'axios';
import {withCors} from '../../utils/corsMiddleware';
import { Errors } from "@/consts/errorsServer";

const handler = async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        res.setHeader('Allow', ['POST']);
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }

    const {startDate, endDate} = req.body;

    if (!startDate || !endDate) {
        return res.status(400).json({error: Errors.MISSING_PARAMETER});
    }

    const start = new Date(startDate as string);
    const end = new Date(endDate as string);
    const today = new Date();

    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
        return res.status(400).json({error: Errors.INVALID_DATE});
    }

    if (end >= today) {
        return res.status(400).json({error: Errors.FUTURE_RANGE});
    }

    if (end < start) {
        return res.status(400).json({error: Errors.START_DATE_LATER_THAN_END_DATE});
    }

    try {
        // Fetch weather data from Open-Meteo API for TLV
        const weatherApiUrl = `https://archive-api.open-meteo.com/v1/archive?latitude=32.0833&longitude=34.8000&start_date=${formatDateToOpenMetro(start)}&end_date=${formatDateToOpenMetro(end)}&daily=temperature_2m_max,temperature_2m_min&timezone=auto`;
        const response = await axios.get(weatherApiUrl);

        res.status(200).json(response.data);
    } catch (error) {
        console.error('Error fetching weather data:', error);
        res.status(500).json({error: Errors.FAILED_TO_FETCH});
    }
};

export default withCors(handler);

const formatDateToOpenMetro = (date: Date) => {
    return date.toISOString().slice(0, 10);
}