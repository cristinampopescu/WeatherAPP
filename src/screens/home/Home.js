import {FlatList, Image, Pressable, ScrollView, StyleSheet, Text, View} from "react-native";
import React, {useEffect, useState} from "react";
import WrapperContainer from "../../components/WrapperContainer";
import colors from "../../styles/Colors";
import {moderateScale, scale} from "../../styles/ResponsiveSize";
import imagePath from "../../constants/imagePath";
import TodayWeatherInfoComponent from "../../components/TodayWeatherInfoComponent";
import {useNavigation} from '@react-navigation/native';
import {Current_Api, Forecast_Api} from "../../config/urls";
import axios from "axios";
import CustomActivityIndicator from "../../components/CustomActivityIndicator";

const Home = () => {
    const airData = [
        {id: 1, weather: "Real Feel", image: imagePath.hot, desc:"feelslike_c", unit: "º"},
        {id: 2, weather: "winds", image: imagePath.windy, desc: "wind_kph", unit:"km/k"},
        {id: 3, weather: "Chance of Rain", image: imagePath.drop, desc: "daily_chance_of_rain", unit: "%"},
        {id: 4, weather: "UV", image: imagePath.ultraviolet, desc: "uv", unit:""},
    ];
    const navigation = useNavigation();

    const [currentLatLong, setCurrentLatLong] = useState('46.770439,23.591423');
    const [currentLocationData, setCurrentLocationData] = useState()
    const [forecastData, setForecastData] = useState()
    const [forecastWeekData, setForecastWeekData] = useState()
    const [isLoading, setIsLoading] = useState(true)


    const callTheCurrentApi = async () => {
        setIsLoading(true);
        try{
            const res = axios.get(Current_Api(currentLatLong)).then(
                res=>{
                    setIsLoading(false);
                    console.log(res,"curresntApiResp");
                    setCurrentLocationData(res);
                }
            )
        }catch(error){
            setIsLoading(false);
            console.log(error, "error");
        }
    };

    const getForecastApiCall = async () => {
        setIsLoading(true);
        try{
            const res = axios.get(Forecast_Api(currentLatLong, 1)).then(
                res=>{
                    setIsLoading(false);
                    setForecastData(res);
                    console.log(res?.data?.forecast, "forecastData");
                }
            )
        }catch(error){
            setIsLoading(false);
            console.log(error, "error");
        }
    };

    const getForecastWeekApiCalls = async () => {
        setIsLoading(true);
        try{
            const res = axios.get(Forecast_Api(currentLatLong, 7)).then(
                res=>{
                    setIsLoading(false);
                    setForecastWeekData(res);
                    console.log(res?.data?.forecast, "forecastData");
                }
            )
        }catch(error){
            setIsLoading(false);
            console.log(error, "error");
        }
    };

    useEffect(() => {
        callTheCurrentApi();
        getForecastApiCall();
        getForecastWeekApiCalls();
    }, [])

    return (
        <WrapperContainer>
            { !isLoading
                ? <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollViewStyle}>
                    <View style={styles.mainStyle}>
                        <Text style={styles.titleStyle}>{
                            currentLocationData?.data?.location?.name}
                        </Text>
                        <Text style={styles.chanceText}>
                            {`Chance of rain: ${currentLocationData?.data?.current?.precip_mm}%`}
                        </Text>
                        <Image
                            style={styles.mainImageStyle}
                            source={currentLocationData?.data?.current?.is_day == 0 ? imagePath.sun : imagePath.clouds}
                        />
                        <Text style={{...styles.titleStyle, marginTop:moderateScale(30)}}>
                            {`${currentLocationData?.data?.current?.temp_c}º`}
                        </Text>
                    </View>
                    <View style={{paddingHorizontal: moderateScale(25)}}>
                        <TodayWeatherInfoComponent data={forecastData?.data?.forecast?.forecastday[0]} />
                        <FlatList
                            scrollEnabled={false}
                            nestedScrollEnabled={true}
                            style={styles.flatListStyle}
                            data={forecastWeekData?.data?.forecast?.forecastday}
                            ListHeaderComponent={ () => {
                                return(
                                    <View style={{marginBottom:moderateScale(20)}}>
                                        <Text style={{color:colors.grey}}>{"7-Day Forecast"}</Text>
                                    </View>
                                )
                            }}
                            ItemSeparatorComponent={()=><View style={{height:moderateScale(12)}}/>}
                            renderItem={({item, index})=>{ return (
                                <View
                                    style={{
                                        ...styles.renderItemViewStyle,
                                        borderBottomWidth: index === 6 ? 0 : 0.5,
                                    }}
                                >
                                    <Text style={{...styles.weekStyle, width:"15%"}}>
                                        {
                                            new Intl.DateTimeFormat(
                                            "en-US", { weekday: "short" }).format(new Date(item?.date)
                                            )
                                        }
                                    </Text>
                                    <View style={styles.forecastItemStyle}>
                                        <Image
                                            style={styles.renderItemImageStyle}
                                            source={{uri: `https:${item?.day?.condition?.icon}`}}
                                        />
                                        <Text style={{...styles.weekStyle, marginLeft: moderateScale(10)}}>
                                            {item?.day?.condition?.text}
                                        </Text>
                                    </View>
                                    <Text style={styles.weekStyle}>
                                        {`${item?.day?.mintemp_c}/${item?.day?.maxtemp_c}`}
                                    </Text>
                                </View>
                            )}}
                        />
                        <FlatList
                            scrollEnabled={false}
                            nestedScrollEnabled={true}
                            style={styles.flatListStyle}
                            data={airData}
                            ListHeaderComponent={(item)=> {
                                return(
                                    <View style={styles.airConditionHeaderStyle}>
                                        <Text style={styles.bottomTextStyle}>{"AIR CONDITIONS"}</Text>
                                        <Pressable
                                            style={styles.seeMoreStyle}
                                            onPress={()=>navigation.navigate("Details", {item})}
                                        >
                                            <Text style={styles.seeMoreTextStyle}>{"See More"}</Text>
                                        </Pressable>
                                    </View>
                                )
                            }}
                            numColumns={2}
                            columnWrapperStyle={styles.columnWrapperStyle}
                            renderItem={({item})=>{
                                return (
                                    <View>
                                        <View style={{flexDirection:"row", alignItems:"center"}}>
                                            <Image
                                                style={styles.airConditionImageStyle}
                                                source={item.image}
                                            />
                                            <Text style={styles.bottomTextStyle}>{item.weather}</Text>
                                        </View>
                                        <Text style={styles.airConditionValueStyle}>
                                            {
                                                item?.id !== 3
                                                    ? `${currentLocationData?.data?.current?.[item?.desc]}${item.unit}`
                                                    : `${forecastData?.data?.forecast?.forecastday?.[0]?.day?.[item?.desc]}${item.unit}`
                                            }
                                        </Text>
                                    </View>
                                )
                            }}
                        />
                    </View>
                </ScrollView>
                : <View style={styles.activityIndicatorStyle}>
                    <CustomActivityIndicator size={"large"} color={colors.white} />
                </View>
            }
        </WrapperContainer>
    )
}

export default Home;
const styles = StyleSheet.create({
    mainStyle: {
        flex: 1,
        alignItems: "center",
    },
    titleStyle: {
        fontSize: scale(30),
        color: colors.white,
        marginTop: moderateScale(20),
    },
    chanceText: {
        fontSize: scale(12),
        color: colors.grey,
        marginTop: moderateScale(4),
    },
    mainImageStyle: {
        width: moderateScale(120),
        height: moderateScale(120),
        marginTop: moderateScale(30),
    },
    scrollViewStyle: {
        flex: 1,
    },
    weekStyle: {
        color: colors.grey,
        fontSize: scale(12),
    },
    flatListStyle: {
        marginTop: moderateScale(20),
        paddingHorizontal: moderateScale(12),
        paddingVertical: moderateScale(12),
        backgroundColor:colors.sectionBackgroundColor,
        borderRadius: moderateScale(10),
        marginBottom: moderateScale(40),
    },
    bottomTextStyle: {
      color: colors.grey,
      fontSize: scale(14),
    },
    seeMoreStyle: {
        backgroundColor: colors.buttonColor,
        padding: moderateScale(6),
        borderRadius: 20,
        paddingHorizontal: moderateScale(12),
        alignItems: "center",
    },
    seeMoreTextStyle: {
        color: colors.white,
        fontSize: scale(12),
    },
    activityIndicatorStyle: {
        position: "absolute",
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        justifyContent: "center",
    },
    renderItemViewStyle: {
        borderColor: colors.grey,
        paddingBottom: moderateScale(10),
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    renderItemImageStyle: {
        width: moderateScale(42),
        height: moderateScale(42),
        resizeMode: "contain",
        alignItems: "center",
    },
    forecastItemStyle: {
        flexDirection: "row",
        width: "30%",
        alignItems: "center",
        justifyContent: "space-between",
    },
    airConditionHeaderStyle: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems:"center",
    },
    columnWrapperStyle: {
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: moderateScale(20),
        paddingVertical: moderateScale(20),
    },
    airConditionImageStyle: {
        width: moderateScale(24),
        height: moderateScale(24),
        marginRight:moderateScale(12),
    },
    airConditionValueStyle: {
        ontSize: scale(14),
        textAlign:"center",
        color: colors.white,
    },
})