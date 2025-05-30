"use client";

import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function StartPanel() {
    return (
        <div className="text-center py-12">
            <FontAwesomeIcon icon={faCalendarAlt} className="text-6xl text-gray-400 mb-4" />
            <p className="text-gray-500">Select a day to view or add events</p>
        </div>
    );
}
