// withHooks
import { esp } from 'esoftplay';
import { ContentHeader } from 'esoftplay/cache/content/header/import';
import { LibInput } from 'esoftplay/cache/lib/input/import';
import { LibNavigation } from 'esoftplay/cache/lib/navigation/import';

import React, { useRef } from 'react';
import { View } from 'react-native';


export interface ContentSearchArgs {

}
export interface ContentSearchProps {

}
export default function m(props: ContentSearchProps): any {
  const searchInput = useRef<LibInput>(null)
  const content = esp.config('content')

  function doSearch() {
    const keyword = encodeURIComponent(searchInput.current?.getText() || '')
    LibNavigation.push('content/list', { title: 'Cari untuk ' + keyword, url: content + 'search.htm?id=' + keyword })
  }

  return (
    <View>
      <ContentHeader title="Cari Artikel" backButton />
      <LibInput base
        ref={searchInput}
        autoFocus
        placeholder={"Cari artikel"}
        returnKeyType="search"
        onChangeText={(text) => { }}
        onSubmitEditing={() => doSearch()}
        style={{ flex: 1, minHeight: 40, paddingHorizontal: 8, borderRadius: 8, backgroundColor: '#f5f5f5', marginVertical: 16, marginHorizontal: 16 }}
      />
    </View>
  )
}