// withHooks
import { esp, useGlobalReturn, useGlobalState } from 'esoftplay';
import { ContentHeader } from 'esoftplay/cache/content/header/import';
import { LibCurl } from 'esoftplay/cache/lib/curl/import';
import { LibList } from 'esoftplay/cache/lib/list/import';
import { LibNavigation } from 'esoftplay/cache/lib/navigation/import';
import { LibPicture } from 'esoftplay/cache/lib/picture/import';
import { LibStyle } from 'esoftplay/cache/lib/style/import';

import React, { useEffect, useMemo, useRef } from 'react';
import { Pressable, Text, View } from 'react-native';


export interface ContentCategoryArgs {

}
export interface ContentCategoryProps {

}

const _state = useGlobalState<any>([], { persistKey: 'content_category' })

export function state(): useGlobalReturn<any> {
  return _state
}


export default function m(props: ContentCategoryProps): any {
  let { url } = useRef<any>(LibNavigation.getArgsAll(props)).current
  const conf = esp.config()
  url = url || conf.content
  const data = _state.useSelector(s => s)

  const dimension = 3
  const imgDimension = useMemo(() => (LibStyle.width - ((dimension + 1) * 10)) / dimension, [])

  useEffect(() => {
    new LibCurl(url + 'menu', null,
      (res, msg) => {
        _state.set(res)
      },
      (msg) => {

      }
    )
  }, [])

  return (
    <View style={{ flex: 1 }} >
      <ContentHeader title="Kategori" searchButton />
      <LibList
        style={{ flex: 1, padding: 5 }}
        data={data?.list?.[0]?.filter?.((row: any) => row.par_id == 0)}
        numColumns={3}
        renderItem={(item: any, index: number) => {
          return (
            <Pressable
              key={index}
              onPress={() => { LibNavigation.push('content/list', { url: item.url, title: item.title, id: item.id }) }}
              style={{ borderRadius: 8, backgroundColor: "#f2f2f2", width: imgDimension, height: imgDimension, margin: 5, alignItems: 'center' }} >
              <LibPicture source={{ uri: item.image }} style={{ height: 70, width: 70, marginTop: 16, }} />
              <Text style={{ fontSize: 12, fontWeight: "500", lineHeight: 20, color: "#060606", marginBottom: 12, }}>{item?.title}</Text>
            </Pressable>
          )
        }}
      />
    </View>
  )
}