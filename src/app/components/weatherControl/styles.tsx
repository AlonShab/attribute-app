import styled from "styled-components";

export const WeatherControlWithStyles = styled.div`
    background-color: #fff;
    width: 900px;
    height: 530px;
    border-radius: 15px;
    box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
`;

export const ChartContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 820px;
    height: 420px;
    margin: 15px auto;
`;

export const ControlInputsContainer = styled.div`
    margin-top: 22px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 45px;
`

export const DateSelectContainer = styled.div`
    > .date-label {
        font-size: 1rem;
        color: #2E3A59;
        margin-right: .5rem;
    }

    > .date-input {
        padding: 8px 12px;
        font-size: 16px;
        border: 1px solid #d1d5db; /* Light gray border */
        border-radius: 8px;
        background-color: #f9fafb; /* Slightly off-white background */
        color: #2e3a59; /* Primary text color */
        box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.05); /* Light shadow */
        outline: none;
        transition: border-color 0.2s ease, box-shadow 0.2s ease;
    }

    > .date-input:focus {
        border-color: #4f46e5; /* Blue border on focus */
        box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1); /* Slightly deeper shadow on focus */
    }
`