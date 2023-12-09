import { useIsFocused } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { FlatList, Image, StyleSheet, Text, View } from "react-native";
import {openDatabase} from 'react-native-sqlite-storage';

const Favorite_contact_list_screen=(props:any)=>{
  let [userList, setUserList] = useState([]);
  const isFocused = useIsFocused();
  let db = openDatabase({name: 'UserDatabase5.db'});
  useEffect(() => {
    db.transaction(txn => {
      txn.executeSql('SELECT * FROM table_user where favorite=?', [1], (tx, res) => {
        let temp = [];
        for (let i = 0; i < res.rows.length; ++i) {
          console.log(res.rows.item(i));
          temp.push(res.rows.item(i));
        }
        setUserList(temp);
      });
    });
  }, [isFocused]);
  console.log(userList);
return (
    
  <View style={{ flex: 1, backgroundColor: '#5da3a0' }}>

    <FlatList
      data={userList}
      renderItem={({item, index}) => {
        return (
        <View>
             <Image
             source={{ uri: item.imageSource }} 
             style={styles.addImg} />
            <Text style={{fontSize: 25}}>{'Name:   ' + item.name}</Text>
            <Text style={{fontWeight: '600'}}>
              {'Mobile No.   :' + item.mobNumber}
            </Text>
            <Text style={{fontWeight: '600'}}>
              {'LandLIne No.:' + item.landaLine}
            </Text>
            </View>
        )}
      }/>
  </View>
)
};
const styles=StyleSheet.create({
  addImg:
  {
    width:80,
    height:80,
    bottom:10,
    top:70,
    left:280
  }
})
export default Favorite_contact_list_screen;
