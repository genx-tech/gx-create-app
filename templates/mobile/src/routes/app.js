import React from "react";
import SampleScreen from "screens/sample/SampleScreen";
import MeStack from "packages/sample";

export default {
    initialRouteName: "Main",
    screens: [
        {
            name: "Main",
            nested: "bottomTab",
            options: {
                headerShown: false,
            },
            nestedOptions: {
                initialRouteName: "Home",
                tabBarOptions: {
                    labelStyle: {
                        fontWeight: "bold",
                    },
                    style: {
                        height: 88,
                        paddingTop: 4,
                    },
                },
                screens: [
                    {
                        name: "Home",
                        options: {
                            title: "Home",
                        },
                        icon: ({ focused, color, size }) => (
                            <Icon
                                type="ionicon"
                                name={focused ? "search" : "search-outline"}
                                size={size}
                                color={focused ? "green" : "blue"}
                            />
                        ),
                        component: SampleScreen,
                    },
                    {
                        name: "Me",
                        options: {
                            title: "Me",
                        },
                        icon: ({ focused, color, size }) => (
                            <Icon
                                type="ionicon"
                                name={focused ? "person" : "person-outline"}
                                size={size}
                                color={focused ? "green" : "blue"}
                            />
                        ),
                        component: MeStack,
                    },
                ],
            },
        },
    ],
};
