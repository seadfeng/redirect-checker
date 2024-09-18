import { TidyURL } from '@protontech/tidy-url';
import { StripTrackingSwitch } from "@/components/shared/strip-tracking-switch";
import { ResponseInfo } from "@/types";
import { SearchCheckIcon } from "lucide-react";
import { useTranslations } from "next-intl";

export const Results = ({ infos, userAgent, stripTracking, onStripTrackingChange }: {
  infos: ResponseInfo[];
  userAgent: string;
  stripTracking: boolean;
  onStripTrackingChange?: (value: boolean) => void;
}) => {
  if(infos.length === 0 ) return null;
  const fromUrl = infos[0].url;
  const t = useTranslations();
  return(
    <>
    <div className="text-xs text-pretty mb-5">User-Agent: {userAgent}</div>
    <div className="bg-secondary/60 p-5 text-xl flex flex-col gap-5">
      <div className="font-semibold flex items-center">{t('frontend.home.results_for')}: {fromUrl} <SearchCheckIcon size={28} className="ml-2 text-green-700" /></div>
      {infos.length === 1 && <div className="text-primary">{t('frontend.home.no_redirects_found')}</div>} 
      {infos.map((info, index) =>
        <div key={index}>
          {info.location && <div className="flex flex-col gap-3 font-medium">
            {index === 0 && <div className="font-semibold">{t('frontend.home.redirect_chain')}: </div>}
            <div className="bg-secondary p-3 leading-8 text-base">
              <div className="text-primary truncate">{index + 1}. From: {info.url}</div>
              <div className="text-green-600 truncate">To: {info.location}</div>
              <div className="text-yellow-500">{t('frontend.home.status')}: {info.status}</div>
              {info.metaRefresh && <div className="text-orange-500">Meta Refresh</div>}
              <div className="text-slate-500">{t('frontend.home.duration')}: {info.duration}</div>
            </div>
          </div>}
          {!info.location && <div data-status={info.status} className="flex flex-col gap-3 font-medium">
              <div data-status={info.status} className="font-semibold data-[status='0']:text-red-500">{t('frontend.home.final_destination')}:</div>
              <div data-status={info.status} className="bg-secondary data-[status='0']:bg-red-500 data-[status=0]:bg-opacity-5 p-3 leading-8 text-base">
                <div data-status={info.status} className="text-green-600 data-[status='0']:text-red-500 truncate">URL: {stripTracking ? TidyURL.clean(info.url).url : info.url}</div>
                <div className="text-yellow-500 data-[status='0']:text-yellow-700">{t('frontend.home.status')}: {info.status}</div> 
                <div className="text-slate-500">{t('frontend.home.duration')}: {info.duration}</div>
              </div>
            </div>}
          </div>
        )}
        <div className="mt-5">
          <StripTrackingSwitch
            defaultValue={stripTracking}
            onValueChange={onStripTrackingChange}
          />
        </div>
      </div>
    </>
  )
} 
