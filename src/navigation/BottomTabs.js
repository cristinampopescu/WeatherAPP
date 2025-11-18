import {Image, StyleSheet} from "react-native";
import React from "react";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {Home, MapScreen, MyCity, SettingsScreen} from "../screens";
import imagePath from "../constants/imagePath";
import {moderateScale, moderateScaleVertical} from "../styles/ResponsiveSize";
import colors from "../styles/Colors";

const Tab = createBottomTabNavigator();

const BottomTabs = () => {
    return (
        <Tab.Navigator screenOptions={{
            headerShown: false,
            tabBarStyle: {backgroundColor: colors.bottomTabsColor}
        }}>
            <Tab.Screen
                name="Home"
                component={Home}
                options={{
                    tabBarLabel:"",
                    tabBarIcon:({focused}) => (
                        <Image
                            tintColor={focused?colors.white:colors.grey}
                            source={imagePath.rainy}
                            style={styles.imageStyle}
                        />
                    )
                }}
            />
            <Tab.Screen
                name="MyCity"
                component={MyCity}
                options={{
                    tabBarLabel:"",
                    tabBarIcon:({focused}) => (
                        <Image
                            tintColor={focused?colors.white:colors.grey}
                            source={imagePath.optionsList}
                            style={styles.imageStyle}
                        />
                    )
                }}
            />
            <Tab.Screen
                name="MapScreen"
                component={MapScreen}
                options={{
                    tabBarLabel:"",
                    tabBarIcon:({focused}) => (
                        <Image
                            tintColor={focused?colors.white:colors.grey}
                            source={imagePath.map}
                            style={styles.imageStyle}
                        />
                    )
                }}
            />
            <Tab.Screen
                name="SettingsScreen"
                component={SettingsScreen}
                options={{
                    tabBarLabel:"",
                    tabBarIcon:({focused}) => (
                        <Image
                            tintColor={focused?colors.white:colors.grey}
                            source={imagePath.settings}
                            style={styles.imageStyle}
                        />
                    )
                }}
            />
        </Tab.Navigator>
    )
}

export default BottomTabs;
const styles = StyleSheet.create({
    imageStyle: {
        width: moderateScale(32),
        height: moderateScaleVertical(32),
        marginTop: moderateScale(20),
    }
})
