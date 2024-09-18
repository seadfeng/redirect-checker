"use client"

import { TrackingOption } from "@/types"
import { useState } from "react"
import { Switch } from "../ui/switch"
import { useTranslations } from "next-intl"

export function StripTrackingSwitch({
    onValueChange,
    defaultValue = false
}: {
    defaultValue: TrackingOption;
    onValueChange?: (value: TrackingOption) => void;
}) {
    const t = useTranslations();
    const [stripTracking, setStripTracking] = useState<TrackingOption>(defaultValue);

    const handleValueChange = (checked: boolean) => {
        const booleanValue = checked;
        setStripTracking(booleanValue);
        if (onValueChange) onValueChange(booleanValue);
    };

    return (
        <div className="flex items-center space-x-2">
            <span className="text-sm">{t('shared.strip_tracking_parameters')}</span>
            <Switch
                checked={stripTracking}
                onCheckedChange={handleValueChange}
            />
        </div>
    )
}
