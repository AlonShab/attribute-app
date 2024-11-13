"use client"
import React from "react";
import styles from "./page.module.css";
import { WeatherControl } from "@/app/components/weatherControl/weatherControl";


export default function Page() {
    return (
        <div className={styles.page}>
            <WeatherControl />
        </div>
    );
}
