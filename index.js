import {Navigation} from 'react-native-navigation';
import {HomeScreen} from '~/HomeScreen';
import DetailScreen from '~/DetailScreen'
import ListCountryScreen from '~/ListCountryScreen'
Navigation.registerComponent('HomeScreen', () => HomeScreen);
Navigation.registerComponent('DetailScreen', () => DetailScreen);
Navigation.registerComponent('ListCountryScreen', () => ListCountryScreen);
Navigation.events().registerAppLaunchedListener(() => {
  Navigation.setRoot({
    root: {
      stack: {
        children: [
          {
            component: {
              name: 'HomeScreen',
            },
          },
        ],
      },
    },
  });
});
