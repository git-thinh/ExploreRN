/**
 * Created by supervons on 2019/08/08.
 * 用户主界面
 * user main page
 */
import React from 'react';
import { View } from 'react-native';
import CarouselComponent from '../components/carousel';
import ChartsComponent from '../components/charts';
import BasePage from '../common/BasePage';

class MainPage extends BasePage {
  navigationOptions = {
    leftComponent: {
      text: '首页'
    }
  };

  constructor(props) {
    super(props);
  }

  renderView() {
    return (
      <View style={{ flex: 1, backgroundColor: '#ffffff' }}>
        <CarouselComponent />
        <ChartsComponent />
      </View>
    );
  }
}

export default MainPage;
