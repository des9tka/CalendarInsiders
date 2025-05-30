"use client";

import { JSX } from "react";
import CalendarDay from "./CalendarDay";
import CalendarHeader from "./CalendarHeader";

interface CalendarGridProps {
    currentDate: Date;
    setCurrentDate: (date: Date) => void;
}

export default function CalendarGrid({ currentDate, setCurrentDate }: CalendarGridProps) {
    const firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const lastDay = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);

    const days: JSX.Element[] = [];
    for (let i = 0; i < firstDay.getDay(); i++) {
        days.push(<div key={`empty-${i}`} className="h-24 bg-gray-800 rounded-lg" />);
    }

    for (let i = 1; i <= lastDay.getDate(); i++) {
        days.push(<CalendarDay key={i} day={i} currentDate={currentDate} />);
    }

    return (
        <div>
            <CalendarHeader currentDate={currentDate} setCurrentDate={setCurrentDate} />
            <div className="calendar-grid">
                <div className="grid grid-cols-7 gap-1 text-center font-semibold text-gray-500 mb-2">
                    <div>SUN</div>
                    <div>MON</div>
                    <div>TUE</div>
                    <div>WED</div>
                    <div>THU</div>
                    <div>FRI</div>
                    <div>SAT</div>
                </div>
                <div className="grid grid-cols-7 gap-1">{days}</div>
            </div>
        </div>
    );
}
