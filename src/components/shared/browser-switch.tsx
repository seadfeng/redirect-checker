"use client"
  
import { Browser, SelectOptionType } from "@/types"
import { useTranslations } from "next-intl"
import { useMemo, useState } from "react"
import { FaChrome, FaEdge, FaFirefox, FaSafari } from 'react-icons/fa'
import { FormControl } from "../ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"

export function BrowserSwitch({
  onValueChange,
  defaultValue = "chrome",
  options = []
}:{
  defaultValue: Browser
  onValueChange?: (value: Browser)=> void,
  options: SelectOptionType[]
}) {
  const t = useTranslations();
  const [browser, setBrowser] = useState<Browser>(defaultValue);
 
  const current = useMemo(()=>{
    return options.find(option =>  option.value === browser as string )
  },[browser]);

  const IconItem = useMemo(()=>{
     if(current?.value === "chrome"){
      return <FaChrome size={20}  style={{ color: '#4285F4' }}/>
     }else if(current?.value === "edge"){
      return <FaEdge size={20}  style={{ color: '#0078D7' }} />
     }else if(current?.value === "safari"){
      return <FaSafari size={20} style={{ color: '#00A1E0' }} />
     }else{
      return <FaFirefox size={20} style={{ color: '#FF7139' }} />
     }
  },[current]);

  return (
    <Select 
      onValueChange={(value) => {
        setBrowser(value as Browser);
        if(onValueChange) onValueChange(value as Browser)
      }} 
      defaultValue={defaultValue}
      >
      <FormControl>
        <div className="relative">
          <span className="absolute left-3.5 top-3 text-muted-foreground">{IconItem}</span>
          <SelectTrigger className="pl-12 capitalize" > 
            <SelectValue/> 
          </SelectTrigger>
        </div>
      </FormControl>
      <SelectContent className="capitalize">
        {options.map(option => <SelectItem key={option.value} value={option.value} disabled={option.disabled}>{option.label}</SelectItem>)}
      </SelectContent>
    </Select>
  )
}
