import {Image, StyleSheet, Text, View} from "react-native";
import React, { useState } from "react";
import WrapperContainer from "../../components/WrapperContainer";
import MapView, {Marker} from "react-native-maps";
import {moderateScale, scale} from "../../styles/ResponsiveSize";
import colors from "../../styles/Colors";
import imagePath from "../../constants/imagePath";

const MapScreen = () => {
    const [region, setRegion] = useState(
        {
            latitude: 46.770439,
            longitude: 23.591423,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121,
        }
    );
    const [markers, setMarker] = useState([
        {
            id: 1,
            title: "Alba-Iulia",
            description: "AB",
            temp: 27,
            coordinates: {
                latitude: 46.0677,
                longitude: 23.5696,
            }
        },
        {
            id: 2,
            title: "Sibiu",
            description: "SB",
            temp: 25,
            coordinates: {
                latitude: 45.7958,
                longitude: 24.1522,
            }
        },
        {
            id: 3,
            title: "Cluj-Napoca",
            description: "CJ",
            temp: 20,
            coordinates: {
                latitude: 46.7784,
                longitude: 23.6172,
            }
        },
    ]);
    return (
        <WrapperContainer>
            <MapView
                style={StyleSheet.absoluteFill}
                region={region}
                zoomEnabled={true}
                zoomControlEnabled={true}
                showsUserLocation={true}
            >
                {markers?.map((item)=>{
                    return(
                        <Marker key={item?.id} coordinate={item?.coordinates}>
                            <View style={styles.markerStyle}>
                                <Text style={styles.textStyle}>{item.title}</Text>
                                <Image style={styles.imageMarkerStyle} source={imagePath.sun} />
                                <Text style={{...styles.textStyle, marginBottom: moderateScale(4)}}>
                                    {item.temp}
                                </Text>
                            </View>
                        </Marker>
                    )
                })}
            </MapView>
        </WrapperContainer>
    )
}

export default MapScreen;
const styles = StyleSheet.create({
    markerStyle: {
        backgroundColor: colors.sectionBackgroundColor,
        height: moderateScale(92),
        width: moderateScale(100),
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 20,
    },
    imageMarkerStyle: {
        width: moderateScale(24),
        height: moderateScale(24),
    },
    textStyle: {
        color: colors.white,
        fontSize:scale(16),
    },
})