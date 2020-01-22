import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Image,
  ScrollView,
  FlatList,
} from 'react-native';
import SegmentedControlTab from 'react-native-segmented-control-tab';
export default class Meetings extends Component {
  constructor() {
    super();
    this.state = {
      selectedIndex: 0,
      switch1Value: false,
      Meetings: [],
    };
  }
  componentDidMount() {
    const {navigation} = this.props;
    const UserId = navigation.getParam('UserId', 0);
    try {
      var dataToSend = {UserId: UserId};
      var formBody = [];
      for (var key in dataToSend) {
        var encodedKey = encodeURIComponent(key);
        var encodedValue = encodeURIComponent(dataToSend[key]);
        formBody.push(encodedKey + '=' + encodedValue);
      }
      formBody = formBody.join('&');
      fetch(global.APIURL + 'api/Card/GetMeetings', {
        method: 'POST', //Request Type
        body: formBody, //post body
        headers: {
          //Header Defination
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        },
      })
        .then(response => response.json())
        .then(responseJson => {
          this.setState({Meetings: responseJson});
          //console.log(this.state.Meetings);
        });
    } catch (e) {}
  }
  handleSingleIndexSelect = index => {
    //handle tab selection for single Tab Selection SegmentedControlTab
    this.setState(prevState => ({...prevState, selectedIndex: index}));
  };
  AddNewMeetings = () => {
    const {navigation} = this.props;
    this.props.navigation.navigate('AddMeetings', {
      UserId: navigation.getParam('UserId', 0),
    });
  };
  render() {
    const {selectedIndex} = this.state;
    return (
      <View style={styles.container}>
        <SegmentedControlTab
          values={['INVITATIONS', 'MY MEETINGS']}
          selectedIndex={selectedIndex}
          tabStyle={styles.tabStyle}
          activeTabStyle={styles.activeTabStyle}
          onTabPress={this.handleSingleIndexSelect}
        />
        {selectedIndex === 0 && (
          <View>
            <Text>Hello</Text>
          </View>
        )}
        {selectedIndex === 1 && (
          <View style={{flexDirection: 'column', backgroundColor: '#fce9e9'}}>
            <ScrollView>
              <View
                style={{
                  width: this.state.width,
                  backgroundColor: '#fce9e9',
                  minHeight: Dimensions.get('window').height,
                }}>
                <View style={{height: 10}} />
                <FlatList
                  data={this.state.Meetings}
                  ItemSeparatorComponent={this.ListViewItemSeparator}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={({item}) => (
                    <View style={{borderBottomColor: 'black'}}>
                      <TouchableOpacity
                        style={{
                          width: Dimensions.get('window').width - 10,
                          alignSelf: 'center',
                          borderWidth: 0.5,
                          borderTopLeftRadius: 0.5,
                          borderRightWidth: 0.5,
                        }}>
                        <View
                          style={{
                            flexDirection: 'row',
                            borderRadius: 0,
                            backgroundColor: 'white',
                            alignSelf: 'stretch',
                          }}>
                          <View
                            style={{
                              width: '30%',
                              alignItems: 'center',
                              justifyContent: 'center',
                              borderWidth: 0.0,
                              borderTopLeftRadius: 50,
                              borderBottomEndRadius: 50,
                            }}>
                            <Text
                              style={{
                                fontSize: 18,
                                alignItems: 'center',
                                marginLeft: 5,
                              }}>
                              {item.eventDate}
                            </Text>
                          </View>
                          <View
                            style={{
                              backgroundColor: 'white',
                              borderRightWidth: 0.0,
                            }}>
                            <View
                              style={{flexDirection: 'column', width: '100%'}}>
                              <View
                                style={{
                                  flexDirection: 'row',
                                  paddingLeft: 10,
                                  paddingTop: 10,
                                }}>
                                <Text
                                  style={{
                                    fontSize: 18,
                                    fontWeight: 'bold',
                                    color: '#404040',
                                    textAlign: 'left',
                                    marginLeft: 5,
                                  }}>
                                  {item.title}
                                </Text>
                              </View>
                              <View
                                style={{
                                  flexDirection: 'row',
                                  paddingLeft: 10,
                                  paddingTop: 10,
                                }}>
                                <Text
                                  style={{
                                    fontSize: 18,
                                    color: '#404040',
                                    textAlign: 'left',
                                  }}>
                                  {' '}
                                  {item.duration}
                                </Text>
                              </View>
                            </View>
                            <View
                              style={{
                                width: Dimensions.get('window').width - 110,
                                flexDirection: 'row',
                                justifyContent: 'flex-end',
                                alignItems: 'center',
                                paddingLeft: 10,
                              }}>
                              <TouchableOpacity
                                style={{flexDirection: 'row', marginTop: 10}}>
                                <Image
                                  source={require('../Images/edit.png')}
                                  style={{
                                    width: 25,
                                    height: 25,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    alignSelf: 'center',
                                  }}
                                />
                                <Text
                                  style={[
                                    styles.buttonText,
                                    {marginLeft: -10},
                                  ]}>
                                  Edit
                                </Text>
                              </TouchableOpacity>
                              <TouchableOpacity
                                style={{
                                  flexDirection: 'row',
                                  marginTop: 10,
                                  backgroundColor: '',
                                }}>
                                <Image
                                  source={require('../Images/delete.png')}
                                  style={{
                                    width: 25,
                                    height: 25,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    alignSelf: 'center',
                                  }}
                                />
                                <Text
                                  style={[
                                    styles.buttonText,
                                    {marginLeft: -10},
                                  ]}>
                                  Delete
                                </Text>
                              </TouchableOpacity>
                            </View>
                          </View>
                        </View>
                      </TouchableOpacity>
                    </View>
                  )}
                />
              </View>
            </ScrollView>
          </View>
        )}
        <View
          style={{
            justifyContent: 'flex-end',
            height: Dimensions.get('window').height - 250,
          }}>
          <TouchableOpacity onPress={() => this.AddNewMeetings()}>
            <Image
              source={require('../Images/add-user.png')}
              style={{height: 25, width: 25}}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    padding: 10,
    height: 120,
  },
  tabStyle: {
    borderColor: 'orange',
    height: 40,
    marginTop: 5,
  },
  activeTabStyle: {
    backgroundColor: 'orange',
  },
  buttonText: {
    padding: 20,
    color: 'black',
    fontSize: 18,
  },
});
