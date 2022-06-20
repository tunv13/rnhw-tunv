import React, { useEffect, useState } from 'react';
import { FlatList, Text, SafeAreaView } from 'react-native';
import { NavigationFunctionComponent } from 'react-native-navigation';
import styled from 'styled-components/native';
import { Country, getCountries } from './client';
import { getScreenStyle } from './misc/getScreenStyle';

export const HomeScreen: NavigationFunctionComponent<Props> = () => {
  const [countries, setCountries] = useState<Array<Country>>([])
  useEffect(() => {
    getCountries(0, 20).then((res: Array<Country>) => {
      setCountries(res)
    })
  }, [])



  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Root>
   
        <FlatList
          keyExtractor={(item: Country) => item.code}
          renderItem={({ item, index }: { item: Country, index: number }) => {
            return <>
              <Text>{item.code}</Text>
              <Text>{item.name}</Text>

            </>
          }}
          data={countries}
        />
      </Root>
    </SafeAreaView>
  );
};

//#region
type Props = {};

const Root = styled.View`
  flex: 1;
  background-color: #e6eeff;
  align-items: center;
  justify-content: center;
`;

const Title = styled.Text`
  font-weight: bold;
  font-size: 16px;
`;

HomeScreen.options = getScreenStyle();
//#endregion
