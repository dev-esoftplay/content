// withHooks
import { esp, useSafeState } from 'esoftplay';
import { ContentCategory_list } from 'esoftplay/cache/content/category_list/import';
import { ContentConfig } from 'esoftplay/cache/content/config/import';
import { ContentHeader } from 'esoftplay/cache/content/header/import';
import { ContentItem } from 'esoftplay/cache/content/item/import';
import { ContentItem_header } from 'esoftplay/cache/content/item_header/import';
import { LibCarrousel } from 'esoftplay/cache/lib/carrousel/import';
import { LibInfinite } from 'esoftplay/cache/lib/infinite/import';
import { LibNavigation } from 'esoftplay/cache/lib/navigation/import';
import { LibObject } from 'esoftplay/cache/lib/object/import';
import { LibStyle } from 'esoftplay/cache/lib/style/import';
import { UserRoutes } from 'esoftplay/cache/user/routes/import';

import React, { useRef } from 'react';
import { View } from 'react-native';


export interface ContentListArgs {

}
export interface ContentListProps {

}
export default function m(props: ContentListProps): any {

  const routes = UserRoutes.state().get()

  let { url, title, id } = useRef<any>(LibNavigation.getArgsAll(props)).current
  const conf = esp.config()
  url = url || conf.content
  id = id || 0
  const [data, setData] = useSafeState<any[]>([])
  const [header, setHeader] = useSafeState<any[]>([])

  return (
    <View style={{ flex: 1 }} >
      <ContentHeader backButton={routes?.index != undefined && routes?.index > 0} title={title || esp.appjson()?.expo?.name} searchButton />
      <LibInfinite
        url={url}
        injectData={data}
        ListHeaderComponent={
          <>
            <ContentCategory_list id={id} />
            <LibCarrousel
              autoplay
              bullets
              bulletsContainerStyle={{ justifyContent: 'flex-end', marginRight: 10 }}
              chosenBulletStyle={{ width: 8, height: 4, borderRadius: 2, marginHorizontal: 4 }}
              bulletStyle={{ width: 4, height: 4, borderRadius: 2, marginHorizontal: 4 }}
              style={{ height: 3 / 4 * LibStyle.width }}>
              {header.map((item: any, index: number) => <ContentItem_header key={index} {...item} />)}
            </LibCarrousel>
          </>
        }
        onResult={(res) => {
          ContentConfig.state().set(LibObject.set(ContentConfig.state().get(), res.config)('list'))
        }}
        onDataChange={(data: any[], page) => {
          if (page == 0) {
            setData(LibObject.splice(data, 0, 4)())
            setHeader(data.slice(0, 4).filter((row) => row.created != 'sponsor'))
          } else {
            setData(data)
          }
        }}
        renderItem={(item: any, i: number) => <ContentItem key={i} {...item} />}
      />
    </View>
  )
}