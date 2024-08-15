"use client"
 
import { Device, SelectOptionType } from "@/types"
import { Monitor, Smartphone } from "lucide-react"
import { useTranslations } from "next-intl"
import { useMemo, useState } from "react"
import { FormControl } from "../ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"

export function DeviceSwitch({
  onValueChange,
  defaultValue = "desktop" 
}:{
  defaultValue: Device;
  onValueChange?: (value: Device)=> void; 
}) {
  const t = useTranslations();
  const [device, setDevice] = useState<Device>(defaultValue);
  const options: SelectOptionType[] = [
    {
      label: t('shared.desktop'),
      value: "desktop",
      icon: <Monitor size={20} className="text-muted-foreground" />
    },
    {
      label: t('shared.mobile'),
      value: "mobile",
      icon: <Smartphone size={20} className="text-muted-foreground" />
    }
  ] 

  const current = useMemo(()=>{
    return options.find(option =>  option.value === device as string )
  },[device])
  return (
    <Select 
      onValueChange={(value) => {
        setDevice(value as Device);
        if(onValueChange) onValueChange(value as Device)
      }} 
      defaultValue={defaultValue}
      >
      <FormControl>
        <div className="relative">
          <span className="absolute left-3.5 top-3 text-muted-foreground">{current?.icon}</span>
          <SelectTrigger className="pl-12" > 
            <SelectValue/> 
          </SelectTrigger>
        </div>
      </FormControl>
      <SelectContent>
        {options.map(option => <SelectItem key={option.value} value={option.value} disabled={option.disabled}>{option.label}</SelectItem>)}
      </SelectContent>
    </Select>
  )
}
