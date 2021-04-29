import React, { FC, useEffect, useState } from 'react';
import MapView, {Marker} from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions } from 'react-native';

const Map: FC<any> = ({latitude, longitude}) => {
  const [state, setLongLat] = useState({latitude: latitude || undefined, longitude: longitude || undefined});

  useEffect(() => {
    setLongLat({latitude: latitude, longitude: longitude});
}, [latitude, longitude]);

  return(
        <View style={styles.container}>
            <MapView
            style={styles.map}
            initialRegion={{
                latitude: state.latitude,
                longitude: state.longitude,
                latitudeDelta: 0.009,
                longitudeDelta: 0.009,
            }}
            >
            <Marker
            key={1}
            coordinate={{ latitude : Number(state.latitude), longitude : Number(state.longitude) }}
            title="Title"
            description="Some description"
            />
            </MapView>
        </View>


    );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#f9f9f9',
      alignItems: 'center',
      justifyContent: 'center',
    },
    map: {
      width: Dimensions.get('window').width,
      height: 200,
    },
  });

export default Map;
