import * as React from 'react';
import {View, Text, Button} from 'react-native';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

function HomeScreen() {
  const navigation = useNavigation();
  const dutyStatusOnPress = () => {
    navigation.navigate('ELDScreen', {screen: 'ChangeDutyStatus'});
  };
  const hosWidgetOnPress = () => {
    navigation.navigate('ELDScreen', {screen: 'HosSummary'});
  };
  const eldAppOnPress = () => {
    navigation.navigate('ELDScreen');
  };
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Button title={'DutyStatus Widget'} onPress={dutyStatusOnPress} />
      <Button title={'HOS Widget'} onPress={hosWidgetOnPress} />
      <Button title={'ELD App'} onPress={eldAppOnPress} />
    </View>
  );
}
function ViewLogs() {
  return <Text>ViewLogs</Text>;
}

function HosSummary() {
  const navigation = useNavigation();
  const goToDutyStatus = () => {
    navigation.navigate('ChangeDutyStatus');
  };
  return (
    <View>
      <Text>HosSummary</Text>
      <Button title="Change Duty Status" onPress={goToDutyStatus} />
    </View>
  );
}

function CertifyLogs() {
  return <Text>CertifyLogs</Text>;
}

function DutyStatusComponent() {
  return <Text>DutyStatus</Text>;
}

function EventDetailsComponent() {
  return <Text>EventDetailsComponent</Text>;
}

function ELDScreen() {
  const ELDStack = createStackNavigator();
  const ELDTab = createBottomTabNavigator();
  const navigationConfig = [
    {
      routeName: 'ViewLogs',
      screenTitle: 'Logs',
      Component: ViewLogs,
      tabIcon: 'logs',
      tabName: 'logs',
    },
    {
      routeName: 'HosSummary',
      screenTitle: 'HoS',
      Component: HosSummary,
      tabIcon: 'clock_circle',
      tabName: 'hos',
    },
    {
      routeName: 'CertifyLogs',
      screenTitle: 'Certify',
      Component: CertifyLogs,
      tabIcon: 'certify_logs',
      tabName: 'certifyLogs',
    },
  ];

  return (
    <ELDStack.Navigator initialRouteName="Root">
      <ELDStack.Screen name="Root">
        {() => (
          <ELDTab.Navigator initialRouteName="ViewLogs" backBehavior="history">
            {navigationConfig.map(({Component, ...tab}) => (
              <ELDTab.Screen
                name={tab.routeName}
                key={tab.routeName}
                options={{title: tab.screenTitle}}
                component={Component}
              />
            ))}
          </ELDTab.Navigator>
        )}
      </ELDStack.Screen>
      <ELDStack.Screen
        name="ChangeDutyStatus"
        component={DutyStatusComponent}
      />
      <ELDStack.Screen name="EventDetails" component={EventDetailsComponent} />
    </ELDStack.Navigator>
  );
}

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="ELDScreen" component={ELDScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
