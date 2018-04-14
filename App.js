import React, { Component } from 'react';
import { 
  Text, 
  View, 
  Dimensions, 
  Image,
  Animated,
  PanResponder,
} from 'react-native';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

const ARTICLES = [
  { id: 1, uri: 'http://www.drsamrobbins.com/wp-content/uploads/2014/03/apples-burn-fat-400x400.jpg' },
  { id: 2, uri: 'http://www.lonestardigital.com/EOS_D30/Sample_Pix/D30_Img_3771(400x400_Crop).jpg' },
  { id: 3, uri: 'https://www.jotform.com/resources/assets/icon/min/jotform-icon-dark-400x400.png' },
  { id: 4, uri: 'https://media.forgecdn.net/avatars/83/256/636187384434867364.png' },
  { id: 5, uri: 'https://league-mp7static.mlsdigital.net/elfinderimages/DCS/facebook.png' },
]

export default class DeckSwiper extends React.Component {
  constructor(props) {
    super(props);

    this.position = new Animated.ValueXY();
    this.swipedCardPosition = new Animated.ValueXY({ x: 0, y: -SCREEN_HEIGHT });
    this.state = {
      currentIndex: 0,
    };
  }

  componentWillMount() {
    this.PanResponder = PanResponder.create({
      onStartShouldSetPanResponder: (e, gestureState) => true,
      onPanResponderMove: (evt, gestureState) => {
        if (gestureState.dy > 0 && this.state.currentIndex > 0) {
          this.swipedCardPosition.setValue({
            x: 0,
            y: -SCREEN_HEIGHT + gestureState.dy,
          })
        } else {
          this.position.setValue({
            // dy because we want scroll up
            y: gestureState.dy,
          })
        }
      },
      onPanResponderRelease: (evt, gestureState) => {
        if (this.state.currentIndex > 0 && gestureState.dy > 50 && gestureState.vy > 0.7) {
          Animated.timing(this.swipedCardPosition, {
            toValue: { x: 0, y: 0 },
            duration: 400,
          }).start(() => {
            this.setState({ currentIndex: this.state.currentIndex + 1 });
            this.position.setValue({ x: 0, y: -SCREEN_HEIGHT });
          });;
        } else if (-gestureState.dy > 50 && -gestureState.vy > 0.7) {
          Animated.timing(this.position, {
            toValue: { x: 0, y: -SCREEN_HEIGHT },
            duration: 400,
          }).start();
        } else {
          Animated.parallel([
            Animated.spring(this.position, {
              toValue: { x: 0, y: 0 },
            }),
            Animated.spring(this.swipedCardPosition, {
              toValue: { x: 0, y: -SCREEN_HEIGHT },
            }),
          ]).start();
        }
      }
    });
  }

  renderArticles = () => {
    return ARTICLES.map((item, i) => {
      if (i === this.state.currentIndex - 1) {
        return (
          <Animated.View
            key={item.id}
            style={this.swipedCardPosition.getLayout()}
            {...this.PanResponder.panHandlers}
          >
            <View
              style={{
                flex: 1,
                position: 'absolute',
                width: SCREEN_WIDTH,
                height: SCREEN_HEIGHT,
                backgroundColor: '#fff',
              }}
            >
              <View style={{ flex: 2, backgroundColor: '#000' }}>
                <Image
                  source={{ uri: item.uri }}
                  style={{
                    flex: 1,
                    width: null,
                    height: null,
                    resizeMode: 'center',
                  }}
                />
              </View>
              <View style={{ flex: 3, padding: 5 }}>
                <Text>
                  Bacon ipsum dolor amet strip steak prosciutto landjaeger short ribs tenderloin jowl
                  tongue beef ribs pork loin chicken. Biltong cow pastrami short loin landjaeger
                  capicola fatback chicken pork loin. Venison fatback sirloin salami ham hock meatball
                  drumstick filet mignon chicken. Picanha porchetta pork loin rump, pork chop beef ribs
                  filet mignon tenderloin jerky t-bone ham sirloin.
            </Text>
              </View>
            </View>
          </Animated.View>
        );
        }

        if (this.state.currentIndex > i) return null;

        if (this.state.currentIndex === i) {
          return (
            <Animated.View
              key={item.id}
              style={this.position.getLayout()}
              {...this.PanResponder.panHandlers}
            >
              <View
                style={{
                  flex: 1,
                  position: 'absolute',
                  width: SCREEN_WIDTH,
                  height: SCREEN_HEIGHT,
                  backgroundColor: '#fff',
                }}
              >
                <View style={{ flex: 2, backgroundColor: '#000' }}>
                  <Image
                    source={{ uri: item.uri }}
                    style={{
                      flex: 1,
                      width: null,
                      height: null,
                      resizeMode: 'center',
                    }}
                  />
                </View>
                <View style={{ flex: 3, padding: 5 }}>
                  <Text>
                    Bacon ipsum dolor amet strip steak prosciutto landjaeger short ribs tenderloin jowl
                    tongue beef ribs pork loin chicken. Biltong cow pastrami short loin landjaeger
                    capicola fatback chicken pork loin. Venison fatback sirloin salami ham hock meatball
                    drumstick filet mignon chicken. Picanha porchetta pork loin rump, pork chop beef ribs
                    filet mignon tenderloin jerky t-bone ham sirloin.
                    Bacon ipsum dolor amet strip steak prosciutto landjaeger short ribs tenderloin jowl
                    tongue beef ribs pork loin chicken. Biltong cow pastrami short loin landjaeger
                    capicola fatback chicken pork loin. Venison fatback sirloin salami ham hock meatball
                    drumstick filet mignon chicken. Picanha porchetta pork loin rump, pork chop beef ribs
                    filet mignon tenderloin jerky t-bone ham sirloin.
                    Bacon ipsum dolor amet strip steak prosciutto landjaeger short ribs tenderloin jowl
                    tongue beef ribs pork loin chicken. Biltong cow pastrami short loin landjaeger
                    capicola fatback chicken pork loin. Venison fatback sirloin salami ham hock meatball
                    drumstick filet mignon chicken. Picanha porchetta pork loin rump, pork chop beef ribs
                    filet mignon tenderloin jerky t-bone ham sirloin.
                  </Text>
                </View>
              </View>
            </Animated.View>
        );
      }
      
      return (
        <Animated.View
          key={item.id}
          {...this.PanResponder.panHandlers}
        >
          <View
            style={{
              flex: 1,
              position: 'absolute',
              width: SCREEN_WIDTH,
              height: SCREEN_HEIGHT,
              backgroundColor: '#fff',
            }}
          >
            <View style={{ flex: 2, backgroundColor: '#000' }}>
              <Image
                source={{ uri: item.uri }}
                style={{
                  flex: 1,
                  width: null,
                  height: null,
                  resizeMode: 'center',
                }}
              />
            </View>
            <View style={{ flex: 3, padding: 5 }}>
              <Text>
                Bacon ipsum dolor amet strip steak prosciutto landjaeger short ribs tenderloin jowl
                tongue beef ribs pork loin chicken. Biltong cow pastrami short loin landjaeger
                capicola fatback chicken pork loin. Venison fatback sirloin salami ham hock meatball
                drumstick filet mignon chicken. Picanha porchetta pork loin rump, pork chop beef ribs
                filet mignon tenderloin jerky t-bone ham sirloin.
          </Text>
            </View>
          </View>
        </Animated.View>
      );
    }).reverse();
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        { this.renderArticles()}
      </View>
    );
  }
}

