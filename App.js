import { Constants, LinearGradient } from 'expo';
import {
  View,
  Image,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  UIManager,
} from 'react-native';
import React from 'react';

import { createPuzzle } from './utils/puzzle';
import { getRandomImage } from './utils/api';
import Game from './screens/Game';
import Start from './screens/Start';

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const BACKGROUND_COLORS = ['#1B1D34', '#2A2A38'];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BACKGROUND_COLORS[0],
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default class App extends React.Component {
  state = {
    size: 3,
    puzzle: null,
    image: null,
  };

  componentDidMount() {
    this.preloadNextImage();
  }

  async preloadNextImage() {
    const image = await getRandomImage();

    Image.prefetch(image.uri);

    this.setState({ image });
  }

  handleChangeSize = size => {
    this.setState({ size });
  };

  handleStartGame = () => {
    const { size } = this.state;

    this.setState({ puzzle: createPuzzle(size) });
  };

  handleGameChange = puzzle => {
    this.setState({ puzzle });
  };

  handleQuit = () => {
    this.setState({ puzzle: null, image: null });

    this.preloadNextImage();
  };

  render() {
    const { size, image, puzzle } = this.state;
    return (
      <View style={styles.container}>
        <LinearGradient style={styles.background} colors={BACKGROUND_COLORS}>
          <StatusBar barStyle={'light-content'} />
          <SafeAreaView style={styles.container}>
            {!puzzle && ( 
              <Start
                size={size}
                onStartGame={this.handleStartGame}
                onChangeSize={this.handleChangeSize}
              />
            )}
            {puzzle && (
              <Game
                puzzle={puzzle}
                image={image}
                onChange={this.handleGameChange}
                onQuit={this.handleQuit}
              />
            )}
          </SafeAreaView>
        </LinearGradient>
      </View>
    );
  }
}


