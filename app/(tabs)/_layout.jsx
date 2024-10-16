import { View, Text , Image} from 'react-native'
import React from 'react';
import { Tabs, Redirect} from 'expo-router';
import {icons} from '../../constants';

const TabIcon = ({icon, color, name, focused}) => {
    return (
        <View>
            <Image 
                source={icon}
            />
        </View>
    )
}

const TabsLayout = () => {
  return (
    <>
        <Tabs>
            <Tabs.Screen 
                name="home"
                options={{
                    title: 'Home',
                    headerShown: false,
                    tabBarIcon: ({ color, focused }) => (
                        <TabIcon  
                            icon={icons.home}
                         />
                    )
                }}
            />
        </Tabs>
    </>
  )
}

export default TabsLayout