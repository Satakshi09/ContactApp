import { useEffect, useState } from 'react';
import { Button, Image, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { StyleSheet } from 'react-native';
import { Colors, Header } from 'react-native/Libraries/NewAppScreen';
import { launchImageLibrary } from 'react-native-image-picker';
import { openDatabase } from 'react-native-sqlite-storage';
const Create_new_contact_screen = (props: any) => {
  let [name, setName] = useState('');
  let [mobNumber, setMobNumber] = useState('');
  let [landaLine, setLandLine] = useState('');
  let [imageSource, setImageSource] = useState('https://www.shutterstock.com/image-vector/man-icon-vector-600w-1040084344.jpg');
  let [favorite, setFavorite] = useState(0);
  let db = openDatabase({ name: 'UserDatabase5.db' });

  useEffect(() => {
    db.transaction((txn) => {
      txn.executeSql(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='table_user'",
        [],
        (tx, res) => {
          console.log('item:', res.rows.length);
          if (res.rows.length == 0) {
            txn.executeSql('DROP TABLE IF EXISTS table_user', []);
            txn.executeSql(
              'CREATE TABLE IF NOT EXISTS table_user(user_id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR(20), mobNumber INT(10),landaLine INT(06), imageSource VARCHAR(1000),favorite INT(2))',
              []
            );
          }
          else {
            console.log("already Created Table");
          }
        },
      );
    });
  }, []);

  const saveData = () => {
    db.transaction((tx) => {
      tx.executeSql(
        'INSERT INTO table_user(name, mobNumber,landaLine, imageSource,favorite) VALUES (?,?,?,?,?)',
        [name, mobNumber, landaLine, imageSource, favorite],
        (tx, res) => {
          console.log(res.rowsAffected);
          if (res.rowsAffected == 1) {
            console.log(res);
            props.navigation.goBack();
          }
          else {
            console.log("save data ka else" + res);
          }
        },
        (error) => {
          console.log("save data ka error " + error);
        }
      );
    }
    )
  }

  const selectImage = () => {
    launchImageLibrary({ mediaType: 'photo' }, response => {
      if (!response.didCancel && !response.errorCode) {
        console.log("image ::" + response.assets[0].uri);

        setImageSource(response.assets[0].uri);
      }
    });
  };

  return (
    <View style={styles.container}>
      <Text
        style={{
          fontSize: 20,
          color: 'black',
          marginBottom: 10,
          fontWeight: '600',
          left: 100,
          top: 5,

        }}>
        New Contact
      </Text>
      <TextInput
        style={styles.textInput}
        placeholder="Enter Person name"
        onChangeText={text => setName(text)}
        value={name}></TextInput>
      <TextInput
        style={styles.textInput}
        placeholder="enter Mobile Number"
        onChangeText={text => setMobNumber(text)}
        keyboardType="numeric"
        value={mobNumber}></TextInput>
      <TextInput
        style={styles.textInput}
        placeholder="enter LandLine Number"
        onChangeText={text => setLandLine(text)}
        keyboardType="numeric"
        value={landaLine}></TextInput>
      <TouchableOpacity onPress={selectImage}>
        <Image source={{ uri: imageSource }} style={styles.addImg} />
      </TouchableOpacity>
      <View style={styles.addButton}>
        <TouchableOpacity
          onPress={() => props.navigation.navigate('ContactList')}>
          <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'black', backgroundColor: '#5da3a0' }}> Done </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.saveData}>
        <TouchableOpacity
          style={{  backgroundColor: '#07524e',
          padding: 12,
          marginTop: 10, 
          alignItems:'center' }}
          onPress={() => saveData()}
        >
          <Text style={{ color: 'black', fontWeight: 'bold' }}>Save Data</Text>
        </TouchableOpacity>
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  saveData: {
    top: 200,
  },
  textInput: {
    top: 250,
    fontSize: 16,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'blak',
    margin: 4,
    padding: 5,
    backgroundColor: 'white',
  },
  container: {
    flex: 1,
    padding: 18,
    backgroundColor: '#5da3a0'
  },
  addButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    width: 60,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#5da3a0',

  },
  addText: {
    fontSize: 50,
    position: 'absolute',
    top: 80,
    right: 200,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'red',
    fontWeight: 'bold'
  },
  addImg:
  {
    width: 80,
    height: 80,
    bottom: 10,
    top: 10,
    left: 130,
    backgroundColor: 'yellow',
  }

});

export default Create_new_contact_screen;
