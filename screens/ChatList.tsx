import { observer, observerBatching } from 'mobx-react-lite';
import React, { useState, useCallback, useEffect } from 'react';
import { Avatar, ListItem } from 'react-native-elements';
import { GiftedChat, IMessage } from 'react-native-gifted-chat';
import { StatusBar } from 'expo-status-bar';
import {
  StyleSheet,
  View,
  SafeAreaView,
  FlatList,
  ActivityIndicator,
  Alert,
} from "react-native";
import GoBackHeader from '../components/header/GoBackHeader';

const ChatList: React.FC<any> = observer(({navigation}) => {
  const [messages, setMessages] = useState<any>([]);

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: 'Hello there!',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'React Native',
          avatar: 'https://placeimg.com/140/140/any',
        },
      },
    ]);
  }, []);

  const onSend = useCallback((messages = []) => {
    setMessages((previousMessages: IMessage[] | undefined) => GiftedChat.append(previousMessages, messages));
  }, []);

  return (
    <>

        <SafeAreaView style={styles.topSafeArea} />
        <StatusBar style="dark" />
        <View style={styles.header}>
        <GoBackHeader navigation={navigation} />
        </View>

     <ListItem
        bottomDivider={true}
        onPress={() =>  navigation.navigate("Chat")}
      >
        <Avatar
          source={{uri:'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=634&q=80'}}
          size="medium"
        />

        <ListItem.Content>
          <ListItem.Title>Marcus</ListItem.Title>

          <ListItem.Subtitle style={styles.listItemSubtitle}>
            #
          </ListItem.Subtitle>
        </ListItem.Content>

        <View style={{ flexDirection: "row" }}></View>
      </ListItem>
    </>
    
  );
});

const HEADER_BACKGROUND = '#3498db';
const CONTENT_BACKGROUND = '#f9f9f9';


const styles = StyleSheet.create({
  listItemSubtitle: { marginTop: 10, color: "#939393" },
  topSafeArea: {
    backgroundColor: CONTENT_BACKGROUND,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    height: 44,
    backgroundColor: CONTENT_BACKGROUND,
  },
});

export default ChatList;