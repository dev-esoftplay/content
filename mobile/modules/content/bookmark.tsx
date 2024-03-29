// withHooks
import { useGlobalReturn, useGlobalState } from 'esoftplay';
import { ContentHeader } from 'esoftplay/cache/content/header/import';
import { ContentItem } from 'esoftplay/cache/content/item/import';
import { LibIcon } from 'esoftplay/cache/lib/icon/import';
import { LibList } from 'esoftplay/cache/lib/list/import';
import { LibStyle } from 'esoftplay/cache/lib/style/import';
import esp from 'esoftplay/esp';

import React from 'react';
import { Text, View } from 'react-native';


export interface ContentBookmarkArgs {

}
export interface ContentBookmarkProps {

}

export interface ContentBookmarkData {
  id: string,
  title: string,
  intro: string,
  description: string,
  image: string,
  created: string,
  updated: string,
  url: string,
  publish: string,
  type_id: string,
  created_by: string,
  created_by_alias: string,
  modified_by: string,
  revised: string,
  hits: string,
  rating: string,
  last_hits: string,
  is_popimage: string,
  is_front: string,
  is_config: string,
  config: string,
}
export interface ContentBookmarkType {
  ids: number[],
  data: ContentBookmarkData[]
}


const _state = useGlobalState<ContentBookmarkType>({ data: [], ids: [] }, { persistKey: 'content_bookmark_data' })

export function toggle(row: ContentBookmarkData) {
  let { data, ids } = _state.get()
  const idx = ids.indexOf(Number(row.id))
  if (idx < 0) {
    data.unshift(row)
    ids.unshift(Number(row.id))
  } else {
    data.splice(idx, 1)
    ids.splice(idx, 1)
  }
  _state.set({ data, ids })
}

export function state(): useGlobalReturn<ContentBookmarkType> {
  return _state
}

export default function m(props: ContentBookmarkProps): any {
  const data = _state.useSelector(s => s.data)
  return (
    <View style={{ flex: 1 }} >
      <ContentHeader title={esp.lang("content/bookmark", "header_title")} searchButton />
      <LibList
        data={data}
        ListEmptyComponent={
          <View style={{ height: LibStyle.height - 100, justifyContent: 'center', alignItems: 'center', marginHorizontal: 24 }} >
            <LibIcon name='bookmark-plus-outline' color={"#FD5593"} size={40} />
            <Text style={{ fontSize: 34, marginTop: 10, fontWeight: "500", lineHeight: 40, textAlign: "center", color: "#060606" }} >{esp.lang("content/bookmark", "empty_title")}</Text>
            <Text style={{ fontSize: 16, marginTop: 10, lineHeight: 22, textAlign: "center", color: "#686868" }} >{esp.lang("content/bookmark", "empty_msg")}</Text>
          </View>
        }
        renderItem={(item: any, index: number) => <ContentItem key={index} {...item} />}
      />
    </View>
  )
}