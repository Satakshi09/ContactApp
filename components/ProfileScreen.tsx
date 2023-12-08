import { TabRouter } from "@react-navigation/native";
import { useEffect } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Image, Text, View } from "react-native"

const Profile=(props:any)=>{
    console.warn(props.route.params.data);
    let url=props.route.params.data;
    return(
     
        <View style={styles.container}>
            <Text style={{fontSize:25,alignItems:'center',left:140,fontWeight:'600', color:'midnightblue'}}>Details</Text>
            <Image
             source={{ uri: url.image }} 
             style={styles.addImg} />
            <Text style={{fontSize:25,alignItems:'center',left:100,top:100,fontWeight:'600',color:'black'}}>{url.userName}</Text>
            <View style={styles.insideContainer}>
                <Text style={{color:'skyblue',fontWeight:'bold',fontSize:17}}>[Google]</Text>
                 <Text style={{color:'#6495ed',fontWeight:'bold',fontSize:13}}>{url.userName}@gamil.com</Text>
                <Text style={styles.textw}>+91 {url.mobileNumber}</Text>
                <Text style={styles.textw}>LandLine: {url.landLineNumber}</Text>

            </View>
            <View style={{flex:1}}>
            <TouchableOpacity style={styles.userItem} onPress={(url:any)=>{props.navigation.navigate("UpdateContact",{
            data:
        {
            userName:url.userName,
            mobileNumber:url.mobileNumber,
            landLineNumber:url.landLineNumber,
            imageSource:url.imageSource
            
        },
    });
          

        }}>
            <Text style={{fontSize:20,fontWeight:'900',color:'navy',right:20,top:50,shadowColor:'grey'}}>UPDATE</Text>
        </TouchableOpacity>
            </View>
           
    
        </View>
    )
}

const styles=StyleSheet.create({
    userItem:{
        paddingBottom:60,
        top:40,
        left:50,
        margin:10,
    },
    container:{
        flex:1

    },
    textw:{
        fontSize:20,
        color:'midnightblue',
        margin:3,
        fontWeight:'bold'
        
    },
    insideContainer:{
        flex:1,
        padding:10,
        top:180,
        left:20,
    },
    addImg:
  {
    width:80,
    height:80,
    bottom:10,
    top:70,
    left:150,
    backgroundColor:'skyblue',
  }
})
export default Profile;