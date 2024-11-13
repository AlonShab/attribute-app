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
`