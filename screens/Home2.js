import React, { Component } from "react";
import {
  StyleSheet,
  Text,Alert,
  View,
  Image,
  ImageBackground,
  ScrollView,
  TextInput,Platform,
  TouchableOpacity,
  ActivityIndicator
} from "react-native";
import { Entypo } from "@expo/vector-icons";
import { Fontisto } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import firebase from 'firebase';
import db from '../config'
import * as ImagePicker from 'expo-image-picker';
import { Feather } from '@expo/vector-icons';
import DropDownPicker from 'react-native-dropdown-picker';

export default class Home2 extends React.Component {
 
  constructor() {
    super();
    this.state = {
      yourname:"",
       email: "",
      title: "",
      description: "",
      githublink:"",
      category: "",
      image: '',
      uploading: 'none',
      open: false,
      value: null,
      items: [
       
        { label: 'Sports', value: 'Sports' },
        { label: 'Puzzle', value: 'Puzzle' },
        { label: 'Arcade', value: 'Arcade' },
        { label: 'Board', value: 'Board' },
        { label: 'Adventure', value: 'Adventure' },
      ],
  
  
      
    };
  }
  
  selectImage = async (path) => { 
    this.setState({uploading:true})
    const { cancelled, uri } = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3], 
      quality: 1,
    });
 

    if (!cancelled) {
      this.uploadImage(uri, this.state.email, path);
    }
  };

  uploadImage = async (uri, email, path) => {
    var response = await fetch(uri);
    //binary large objects
    var blob = await response.blob();

    var ref = firebase
      .storage()
      .ref()
      .child(path + email);

    return ref.put(blob).then((response) => {
      this.fetchImage(email, path);
    });
  };

  fetchImage = (email, path) => {
    var storageRef = firebase
      .storage()
      .ref()
      .child(path + email);

    // Get the download URL
    storageRef
      .getDownloadURL() 
      .then((url) => {
        this.setState({ image: url, uploading:false }); 
      })
      .catch((error) => {
        this.setState({ image: '#', uploading:'none' });
      });
  };

  
addRequest =()=>{
    
    db.collection('request').add({
      "yourname":this.state.yourname,
      "email":this.state.email,
        "title":this.state.title,
        "description":this.state.description,
        "githublink":this.state.githublink,
        "category":this.state.category,
        "image"  :this.state.image,
        "userEmail": firebase.auth().currentUser.email,
    })

   alert("Added Record Successfully")
   this.props.navigation.navigate('Category')
  }


  render() {
    var icon;
    if(this.state.uploading === 'none'){
      icon = <Entypo name="upload" size={24} color="black" />
    }
    else if(this.state.uploading){
      icon = <ActivityIndicator size={'small'} color="black" />
    }
    else{ 
      icon = <Feather name="check-circle" size={24} color="black" /> 
    }
    return (
      
       <View style={{ flex: 1,backgroundColor:"#9c78fe",borderRadius:10,borderWidth:10,borderColor:"white" }}>
          <ScrollView>
    <Text style={{ fontSize: 20, fontWeight: "bold", marginLeft: "5%",color:"white" ,marginTop:20}}>
            Add Your Idea Here..
          </Text>
      
           <TouchableOpacity
      style={{width:"100%",borderTopLeftRadius:30,borderTopRightRadius:30,height:"90%",alignItems:"center",marginTop:"10%",backgroundColor:"white"}}> 
       
         
           <View
            style={{
              flexDirection: "row",
              width: "90%",
              marginTop: 50,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
              <MaterialIcons name="person" size={20} color="grey" />
            <TextInput
              style={{
                width: "90%",
                height: 30,
                borderBottomWidth: 1,
                paddingLeft: 10,
                borderBottomColor: "grey",
              }}
              placeholder="Your Name"
              onChangeText={(val) => {
                this.setState({ yourname: val });
              }}
            />
          </View>

          <View
            style={{
              flexDirection: "row",
              width: "90%",
            
              marginTop: 20,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
              <Fontisto name="email" size={20} color="grey" />
            <TextInput
              style={{
                width: "90%",
                height: 30,
                borderBottomWidth: 1,
                paddingLeft: 10,
                borderBottomColor: "grey",
              }}
              placeholder="Email-Id"
              onChangeText={(val) => {
                this.setState({ email: val });
              }}
            />
          </View>

          <View
            style={{
              flexDirection: "row",
              width: "90%",
              
              marginTop: 20,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
              <MaterialIcons name="title" size={20} color="grey" />
            <TextInput
              style={{
                width: "90%",
                height: 30,
                borderBottomWidth: 1,
                paddingLeft: 10,
                borderBottomColor: "grey",
              }}
              placeholder="Title"
              onChangeText={(val) => {
                this.setState({ title: val });
              }}
            />
          </View>

         
          <View
            style={{
              flexDirection: "row",
              width: "90%",
        
              marginTop: 30,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
              <MaterialIcons name="description" size={20} color="grey" />
            <TextInput
              style={{
                width: "90%",
                height: 30,
                borderBottomWidth: 1,
                paddingLeft: 10,
                borderBottomColor: "grey",
              }}
              placeholder="Description"
              multiline = {true}
              onChangeText={(val) => {
                this.setState({ description: val });
              }}
            />
          </View>


         <View
            style={{
              flexDirection: "row",
              width: "90%",
              marginTop: 10,
              justifyContent: "center",
              alignItems: "center",
              marginBottom:30
            }}
          >
              <MaterialIcons name="category" size={20} color="grey" />
              <DropDownPicker
          items={this.state.items}
          open={this.state.open}
          value={this.state.value}
          setOpen={() => {
            this.setState({ open: !this.state.open });
          }}
          onSelectItem={(val) => {
            this.setState({ value: val.label });
          }}
          style={{
            width: '90%',
            height: 40,
            alignSelf: 'center', 
            backgroundColor: 'pink',
            marginTop:20
          }}
          textStyle={{ color: 'blue' }}
          labelStyle={{
            fontWeight: 'bold',
            color:'white'
          }}

        />







          </View>

           <View
            style={{
              flexDirection:"row",
              width: "90%",
             
              marginTop: 30,
              justifyContent:"space-around",
              alignItems: "center",
            }}
          >
              <MaterialIcons name="image" size={20} color="grey" />
          
<View style={{ flexDirection: 'row' }}>
          <Text>Upload Image/Video</Text>
          <TouchableOpacity
            style={{ marginHorizontal: 20 }}
            onPress={() => {
              this.selectImage('siddhant/');
            }}>
            {icon}
          </TouchableOpacity>
        </View>





          </View>

          <TouchableOpacity
            style={{
              backgroundColor: "#fe6076",
              width: "50%",
              height: 40,
              marginTop: 30,
              borderRadius: 10,
             
              justifyContent: "center",
              alignItems: "center",
            }}
            onPress={() => {
              this.addRequest()
            }}
          >
            <Text style={{ fontSize: 18, color: "white" }}>Add +</Text>
          </TouchableOpacity>
          </TouchableOpacity>
        </ScrollView>
       
      </View>
    );
  }
}
