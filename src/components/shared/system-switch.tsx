"use client"
 
import { OperatingSystem, SelectOptionType } from "@/types"
import { useTranslations } from "next-intl"
import { useTheme } from "next-themes"
import { useMemo, useState } from "react"
import { FaAndroid, FaApple, FaLinux, FaWindows } from "react-icons/fa"
import { FormControl } from "../ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"

export function SystemSwitch({
  onValueChange,
  value = "macos",
  options 
}:{
  value?: OperatingSystem;
  onValueChange?: (value: OperatingSystem)=> void;
  options: SelectOptionType[] 
}) {
  const t = useTranslations();
  const { theme } = useTheme(); 
  const [operatingSystem, setOperatingSystem] = useState<OperatingSystem>(value);

  const IconItem = useMemo(()=>{
    let current = options.find(option =>  option.value === operatingSystem as string ); 
    if(!current) {
      current = options.find(option =>  option.value === value as string );
    }
    if (current?.value === 'macos') {
      return <FaApple size={20} style={{ color: '#A3AAAE' }} />; // macOS color
    } else if (current?.value === 'windows') {
      return <FaWindows size={20} style={{ color: '#0078D7' }} />; // Windows color
    } else if (current?.value === 'linux') {
      return <FaLinux size={20} style={{ color: '#FCC624' }} />; // Linux color
    } else if (current?.value === 'android') {
      return <FaAndroid size={20} style={{ color: '#3DDC84' }} />; // Android color
    } else if (current?.value === 'ios') { // iOS
      return <FaApple size={20} style={{ color: theme === "dark" ? '#ffffff' : '#000000' }} />; // iOS color
    }else{
      return null
    }
 },[value, operatingSystem, options]);

  return (
    <Select
      onValueChange={(value) => {
        setOperatingSystem(value as OperatingSystem);
        if(onValueChange) onValueChange(value as OperatingSystem)
      }} 
      value={value} 
      >
      <FormControl>
        <div className="relative">
          <span className="absolute left-3.5 top-3 text-muted-foreground">{IconItem}</span>
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
