import {
  Text,
  View,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  PermissionsAndroid,
  ScrollView,
  Button,
  TextInput,
} from 'react-native';

import Contacts from 'react-native-contacts';
import { useIsFocused } from '@react-navigation/native';
import { useState, useEffect, useRef } from 'react';
import { openDatabase } from 'react-native-sqlite-storage';
import { Component } from 'ionicons/dist/types/stencil-public-runtime';
import { Colors } from 'react-native/Libraries/NewAppScreen';

const Contact_list_screen = (props: any) => {
  let [userList, setUserList] = useState([]);
  let [search, setSearch] = useState('');
  let [data, setData] = useState([]);
  let searchRef = useRef();
  const isFocused = useIsFocused();
  let db = openDatabase({ name: 'UserDatabase5.db' });
  useEffect(() => {
    db.transaction(txn => {
      txn.executeSql('SELECT * FROM table_user', [], (tx, res) => {
        let temp = [];
        for (let i = 0; i < res.rows.length; ++i) {
          console.log(res.rows.item(i));
          temp.push(res.rows.item(i));
        }
        setUserList(temp);
      });
    });
  }, [isFocused]);

  const onSearch = (text) => {
    let tempList = data.filter((item => {
      return item.titlr.toLowerCase().indexOf(text.toLowerCase()) > -1;
    }))
    setData(tempList);
  };
  const favList = (id: any) => {
    console.warn("id" + id);
    db.transaction(txn => {
      txn.executeSql('UPDATE table_user set favorite=? where user_id=?', [1, id], (tx, res) => {
        if (res.rowsAffected > 0) {
          console.warn("Succesfully");

        }
        else {
          console.warn("error");
        }
      });
    });
    props.navigation.navigate("FavoriteContact");

  }

  return (
    <View style={styles.container}>
      <TextInput
        ref={searchRef}
        placeholder='search name here..'
        style={{ width: '100%', height: 40, backgroundColor: '#135451', fontSize: 20, fontWeight: 'bold' }}
        value={search}
        onChangeText={txt => {
          onSearch(txt);
          setSearch(txt);
        }} />
      {
        search === '' ? null : (
          <TouchableOpacity style={{ marginRight: 15 }}
            onPress={() => {
              setSearch('');
            }} />
        )
      }

      <FlatList
        data={userList}
        renderItem={({ item, index }) => {
          return (
            <TouchableOpacity
              style={styles.userItem}
              onPress={() => {
                props.navigation.navigate('UpdateContact', {
                  data: {
                    id: item.user_id,
                    userName: item.name,
                    mobileNumber: item.mobNumber,
                    landLineNumber: item.landaLine,
                    image: item.imageSource,
                  },
                });
              }}>
              <Text style={{ fontSize: 25 }}>{'Name:   ' + item.name}</Text>
              <Text style={{ fontWeight: '600' }}>
                {'Mobile No.   :' + item.mobNumber}
              </Text>
              <Text style={{ fontWeight: '600' }}>
                {'LandLIne No.:' + item.landaLine}
              </Text>
              <View>
                <Button
                  title='Add to fav'
                  onPress={() => favList(item.user_id)}
                ></Button>
              </View>

            </TouchableOpacity>
          );
        }}
      />
      <View style={styles.addButton}>
        <TouchableOpacity
          onPress={() => props.navigation.navigate('AddContact')}>
          <Text style={styles.addButtonText}> +</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#5da3a0'
  },
  userItem: {
    paddingBottom: 20,
    marginBottom: 30,
    top: 30,
    backgroundColor: '#1e615e',
    margin: 10,
    backgroundcolor: 'blue',
  },
  addIcon: {
    color: 'red',
  },
  addButton: {
    flex: 1,
    position: 'absolute',
    top: 20,
    right: 30,
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#b1f2ef',
  },

  addButtonText: {
    color: '#fff',
    fontSize: 40,
    left: 5,
    bottom: 5,
    fontWeight: 'bold',
    alignItems: 'center',
  },
});
export default Contact_list_screen;
