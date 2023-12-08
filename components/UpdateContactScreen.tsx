import { useIsFocused } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { Button, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native"
import { launchImageLibrary } from 'react-native-image-picker';
import { openDatabase } from 'react-native-sqlite-storage';

const Update_contact_screen = (props: any) => {
  console.warn("update==" + props.route.params.data.id);
  let [name, setName] = useState('');
  let [mobNumber, setMobNumber] = useState('');
  let [landaLine, setLandLine] = useState('');
  let [imageSource, setImageSource] = useState('');

  const isFocused = useIsFocused();
  let db = openDatabase({ name: 'UserDatabase5.db' });

  const selectImage = () => {
    launchImageLibrary({ mediaType: 'photo' }, response => {
      if (!response.didCancel && !response.errorCode) {
        console.log("image ::" + response.assets[0].uri);

        setImageSource(response.assets[0].uri);
      }
    });
  };
  useEffect(() => {
    setName(props.route.params.data.userName);
    setMobNumber(props.route.params.data.mobileNumber);
    setLandLine(props.route.params.data.landLineNumber);
    setImageSource(props.route.params.data.image);

  }, [isFocused]);

  const mobileNumber = mobNumber.toString();
  const landLine = landaLine.toString();

  const updateUser = () => {
    db.transaction(txn => {
      txn.executeSql('UPDATE table_user set name=?,mobNumber=?,landaLine=?,imageSource=? where user_id=?', [name, mobNumber, landaLine, imageSource, props.route.params.data.id],
        (tx, res) => {
          props.navigation.goBack();

        })

    })
  }

  const deleteUser = () => {
    db.transaction(txn => {
      txn.executeSql('DELETE FROM table_user where user_id=?',
        [props.route.params.data.id],
        (txn, res) => {
          props.navigation.goBack();
        })
    })
  }
  return (
    <View style={styles.container}>
      <Text
        style={{
          fontSize: 20,
          color: 'black',
          marginBottom: 10,
          fontWeight: "bold",
          left: 100,
          top: 150,
          marginLeft: 20
        }}>
        Edit Contact
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
        value={mobileNumber}></TextInput>
      <TextInput
        style={styles.textInput}
        placeholder="enter LandLine Number"
        onChangeText={text => setLandLine(text)}
        keyboardType="numeric"
        value={landLine}></TextInput>




      <TouchableOpacity onPress={selectImage}>
        <Image source={{ uri: imageSource }} style={styles.addImg} />

      </TouchableOpacity>
      <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 20, marginBottom: 100,top:180 }}>
        <Button
          color="#105753"
          title="Update Contact"
          onPress={() => updateUser()}
        />
        <Button
          color="#105753"
          title="Delete Contact"
          onPress={() => deleteUser()}
        />
      </View>

    </View>
  );
};
const styles = StyleSheet.create({
  textInput: {
    top: 250,
    fontSize: 16,
    color: 'black',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'black',
    margin: 4,
    padding: 5,
    backgroundColor: 'white'
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
    backgroundColor: 'floralwhite',
  },
  addText: {
    fontSize: 30,
    position: 'absolute',
    top: 80,
    right: 200,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'skyblue',
  },
  addImg:
  {
    width: 80,
    height: 80,
    bottom: 10,
    top: 10,
    left: 130,
    backgroundColor: 'skyblue',

  }
});
export default Update_contact_screen;