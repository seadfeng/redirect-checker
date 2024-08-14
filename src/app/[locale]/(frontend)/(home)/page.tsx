 
import { Main } from "@/components/frontend/page/home/main";
import { LocaleType } from "@/config";
import { getComponentMarkdown } from "@/i18n";

export const runtime = 'edge';

export default async function  Home({
  params
}: Readonly<{ 
  params: { locale: string; };
}>) {
  // Load by key: public/data/generated/components-markdown.json
  const markdownContents = {
    block1: await getComponentMarkdown({
      locale: params.locale as LocaleType, 
      componentPathName: "home/block1"
    })
  }
 
  return (
    <div className="px-8 flex">
      <Main markdownContents={markdownContents} />
    </div>
  );
}
