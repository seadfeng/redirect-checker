"use client"

import { BrowserSwitch } from "@/components/shared/browser-switch";
import { DeviceSwitch } from "@/components/shared/device-switch";
import { Markdown } from "@/components/shared/markdown";
import { SystemSwitch } from "@/components/shared/system-switch";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { userAgents } from "@/devices";
import apiClient from "@/lib/api";
import { cn } from "@/lib/utils";
import { Browser, browsers, desktopOperatingSystems, Device, devices, mobileOperatingSystems, OperatingSystem, operatingSystems, ResponseInfo, SelectOptionType } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import { Faqs } from "../../shared/faqs";
import { Results } from "./results";

const FormValueSchema = z.object({
  url: z.string().url(),
  device: z.enum(devices),
  browser: z.enum(browsers),
  system: z.enum(operatingSystems)
})

type FormValues = z.infer<typeof FormValueSchema>;
 
export function Main({
  markdownContents
}: Readonly<{  
  markdownContents: Record<string, string|undefined>;
}>) {
  const { block1 } = markdownContents;
  const t = useTranslations();
  const [fetching,setFetching] = useState<boolean>(false);
  const [error,setError] = useState<any>(false);
  const [userAgent,setUserAgent] = useState<string>("");
  const [browser,setBowser] = useState<Browser>("chrome");
  const [device,setDevice] = useState<Device>("desktop");
  const [operatingSystem,setOperatingSystem] = useState<OperatingSystem>("macos"); 
  const [currentOperatingSystems,setCurrentOperatingSystems] = useState<SelectOptionType[]>([]);  
  const [infos,setInfos] = useState<ResponseInfo[]>([]); 

  let form = useForm<FormValues>({
    resolver: zodResolver(FormValueSchema),
    defaultValues:{
      url: "",
      device: "desktop",
      browser: "chrome",
      system: "macos"
    }
  })

  const faqs = [
    // {
    //   question: t('frontend.home.faq.qa1.question'),
    //   answer: t('frontend.home.faq.qa1.answer')
    // },
    {
      question: t('frontend.home.faq.qa2.question'),
      answer: t('frontend.home.faq.qa2.answer')
    },
    {
      question: t('frontend.home.faq.qa3.question'),
      answer: t('frontend.home.faq.qa3.answer')
    },
    {
      question: t('frontend.home.faq.qa4.question'),
      answer: t('frontend.home.faq.qa4.answer')
    },
    {
      question: t('frontend.home.faq.qa5.question'),
      answer: t('frontend.home.faq.qa5.answer')
    },
  ]

  useEffect(()=>{
    let items: SelectOptionType[] = [];
    if(device === "desktop"){
      items = desktopOperatingSystems.map(item =>{
        return {
          label: item,
          value: item
        }
      })
    }else{ // mobile
      items = mobileOperatingSystems.map(item =>{
        return {
          label: item,
          value: item
        }
      })
    }
    setCurrentOperatingSystems(items); 
    if (items.length > 0 && items[0].value !== operatingSystem) {
      setOperatingSystem(items[0].value as OperatingSystem);
    }
  },[device]); 
 

  const currentBrowsersOptions = useMemo(()=>{
    let objs: {
      key: string;
      userAgents: string[]
    }[] = []; 
    let options: (SelectOptionType & { userAgents: string[] })[] =  []; 
    const deviceOperatingSystems = userAgents[device];

    // find active browsers and userAgents
    for( const [key,operatingSystemsBrowsers] of Object.entries(deviceOperatingSystems)){
      if(operatingSystem as string === key){
        for(const [browserName, browserUserAgents] of Object.entries( operatingSystemsBrowsers )){
          objs.push({
            key: browserName,
            userAgents: browserUserAgents
          })
        }
      }
    } 

    objs.forEach(item =>{
      options.push({
        label: item.key,
        value: item.key,
        userAgents: item.userAgents
      })
    }) 
    return options;
  },[browser, device, operatingSystem]);

  useEffect(()=>{  
    form.setValue("system", operatingSystem as OperatingSystem );

    // Reset form for browser
    if(!currentBrowsersOptions.find(browserItem => browserItem.value === browser as string )){
      form.setValue("browser", "chrome");  
    }
  },[currentBrowsersOptions, operatingSystem, browser, form]);
 
  const handleSubmit =(values: FormValues)=>{
    setFetching(true);
    setError(false);
    setUserAgent("");
    setInfos([]);
    const userAgents = currentBrowsersOptions.find(item =>{
      return item.value === values.browser
    })?.userAgents;

    if(!userAgents){
      console.error("userAgents not found");
      setFetching(false);
      return;
    }
    const randomIndex = Math.floor(Math.random() * userAgents.length);
    const randomUserAgent = userAgents[randomIndex];
    console.log("randomUserAgent", randomUserAgent);
    setUserAgent(randomUserAgent);
    apiClient.post("/redirectcheck", {
      ...values,
      headers: {
        "User-Agent": randomUserAgent
      }
    })
    .then((res) => { 
      setInfos(res as any);
      setFetching(false);
    })
    .catch((error) => {
      setError(error.message);
      console.log("error", error);
      setFetching(false);
    });
  }
 
  
  const textCls = "text-primary font-medium";

  return (
    <div className={cn("max-w-4xl mx-auto w-full leading-9 text-base")}> 
      <h1 className="text-4xl mb-2 font-extrabold">Redirect Checker</h1>
      <p className={`${textCls} border-l-8 border-primary/60 pl-4 font-semibold`}>{t('frontend.home.h1')}</p>
      <h2 className="text-2xl flex items-center mt-10 font-semibold">
        {t('frontend.home.sub_to_h1')} 
      </h2> 
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="w-full">
        <FormField
            control={form.control}
            name="url"
            render={({ field }) => (
              <FormItem nospace={true} className="mt-5 mb-8"> 
                <div className="flex w-full">
                  <FormControl>
                    <Input type="search" className="rounded-s-md h-13 text-xl aria-[describedby*=-form-item-message]:ring-red-400" placeholder="Enter URL (e.g., https://example.com)" {...field} />
                  </FormControl>
                  <Button loading={fetching} className="h-13 rounded-e-md" disabled={!field.value || fetching}>{t('frontend.home.trace_url')}</Button>
                </div>  
                {field.value && <FormMessage /> }
              </FormItem>
            )}
          />
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full mb-8">
        
          <FormField
              control={form.control}
              name="device"
              render={({ field }) => (
                <FormItem> 
                  <DeviceSwitch defaultValue={field.value} onValueChange={(e) => {field.onChange(e); setDevice(e); }} /> 
                </FormItem>
              )}
            />
          <FormField
              control={form.control}
              name="system"
              render={({ field }) => (
                <FormItem> 
                  <SystemSwitch value={field.value} onValueChange={(e) => {field.onChange(e); setOperatingSystem(e); }} options={currentOperatingSystems} /> 
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="browser"
              render={({ field }) => (
                <FormItem> 
                  <BrowserSwitch value={field.value} onValueChange={(e) => {field.onChange(e); setBowser(e); }} options={currentBrowsersOptions}/> 
                </FormItem>
              )}
            /> 
        </div>
        </form>
      </Form>
      {error && <div className="rounded-md border border-red-500 p-10 mb-10">{error}</div>}
      {fetching && <Skeleton className="h-96 w-full rounded-md" />} 
      {infos && (
        <Results 
          userAgent={userAgent} 
          infos={infos}
        />
      )}
      {block1 && <Markdown content={block1} className="mt-10" />}
      <Faqs faqs={faqs} title={t('frontend.home.faq.title')} />
    </div>
  );
}
