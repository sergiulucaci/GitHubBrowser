import React from 'react';
import { StyleSheet, Text, StatusBar } from 'react-native';

import { Colors } from 'react-native/Libraries/NewAppScreen';

const styles = StyleSheet.create({
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
});

const OrganizationList = () => (
  <>
    <StatusBar barStyle="dark-content" />
    <Text style={styles.sectionTitle}>Organization</Text>
  </>
);

export default OrganizationList;
