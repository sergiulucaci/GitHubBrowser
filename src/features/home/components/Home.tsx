import React, { useEffect } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  StatusBar,
  Button,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Colors } from 'react-native/Libraries/NewAppScreen';

import { HomeStateType } from '../reducers/Home';
import { selectHomeInfo } from '../selectors/Home';
import { getHomeAction } from '../actions/Home';

import { navigateToOrganizationList } from '../../../navigation/AppNavigation';

const styles = StyleSheet.create({
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
});

const Home = ({ componentId }: { componentId: string }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getHomeAction());
  }, []);

  const { isFetching, error }: HomeStateType = useSelector(selectHomeInfo());

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <Text style={styles.sectionTitle}>Step One</Text>
        <Button
          title="Organization List"
          color="#710ce3"
          onPress={() => navigateToOrganizationList(componentId)}
        />
      </SafeAreaView>
    </>
  );
};

export default Home;
