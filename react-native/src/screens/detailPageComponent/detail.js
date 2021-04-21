import React, { useState, Component } from "react";
import {
  Text,
  View,
  Image,
  TextInput,
  Alert,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import Icon from "@expo/vector-icons/Entypo";
import Utility from "../../common/utility";
import {Linking} from 'react-native'
import { ScrollView } from "react-native-gesture-handler";

const styles = StyleSheet.create({
  view: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#fff",
    height: "100%",
  },

  property: {
    height: "80%",
    width: "80%",
    // display: "flex",
    // flexDirection: "column",
    justifyContent: "space-around",
    marginTop: "5%",
    marginLeft: "5%",
    borderWidth: 0,
    borderRadius: 15,
  },

  corner: {
    height: "10%",
    width: "20%",
    position: "absolute",
    right: 5,
    marginTop: "2%",
  },

  callbutton: {
    justifyContent: "center",
    marginTop: 60,
    marginLeft: 40,
    backgroundColor: "#3ead23",
    paddingVertical: 10,
    borderRadius: 23,
    shadowColor: "#000",
    shadowRadius: 5,
    shadowOpacity: 0.7,
    shadowOffset: { width: 0, height: 3 },
    elevation: 4,
    width: "80%",
    display: "flex",
    flexDirection: "row"
  },
});
// =====================STYLE_SHEET===========================

class detail extends React.Component {
  utility;
  state = {
    user: {},
    search: "",
    property: {},
  };

  constructor() {
    super();
    this.utility = new Utility();
  }

  componentDidMount() {
    this.utility.getValue("user").then((user) => {
      this.setState({ user: JSON.parse(user) });
      this.setState({ property_id: this.props.navigation.getParam("id") });
      const apiResponse = this.utility
        .makeGetRequest("properties/" + this.state.property_id)
        .then((resp) => {
          if (resp.success) {
            this.setState({ property: resp.data });
            console.log(this.state);
          }
        });
      console.log("user in profile", this.state.user);
    });
  }

  render() {
    const { navigate } = this.props.navigation;
    var property = this.state.property;
    return (
      <View style={styles.view}>
      <View style={styles.property} key={property?.id}>
        <TouchableOpacity
          activeOpacity={1}
          style={{
            width: "90%",
            height: "50%",
            borderRadius: 15,
            left: "10%",
            bottom: "5%",
          }}
          onPress={() => {
            navigate("Detail", { id: property?.id });
          }}
        >
          <Image
            key={property?.id}
            source={
              !property?.image_url
                ? require("../../../assets/1.jpg")
                : {
                    uri:
                      this.utility.getApiUrl().slice(0, -1) +
                      property.image_url,
                  }
            }
            style={{ width: "100%", height: "100%", borderRadius: 15, }}
          />
        </TouchableOpacity>
        {property?.for_sell == "true" ? (
          <Image
            key={property?.for_rent}
            source={require("../../../assets/sell.png")}
            style={styles.corner}
          />
        ) : (
          <Image
            key={property?.for_rent}
            source={require("../../../assets/rent.png")}
            style={styles.corner}
          />
        )}
        <View
          style={{
            marginLeft: "20%",
            marginTop: "10%",
            justifyContent: "flex-start",
            paddingVertical: 10,
          }}
        >
          <Text
            style={{
              fontSize: 24,
              color: "#23b3d5",
              fontWeight: "bold",
            }}
          >
            Location : {property?.location}
          </Text>
          <View style={{display:"flex", flexDirection:"row"}}>
            <Text style={{fontSize: 16, fontWeight: "bold",  color: "#057a0f"}}>
              {property.user?.name }
              </Text>
              {property.user?.role == "seller" ? (
              <Image
              source={require("../../../assets/verified.png")}
                style={{width: 20, height: 20,}}
              />):(<Image/>)
              }
          </View>
          <Text
            style={{
              fontSize: 16,
              fontWeight: "bold",
              color: "#000",
            }}
          >
            {property?.address_1 + "," + property?.address_2 + "," + property?.post_code}
          </Text>
          <Text
            style={{
              fontSize: 16,
              fontWeight: "bold",
              color: "#057a0f",
            }}
          >
            ₹
            {property?.rent_detail?.rent_per_month == undefined
              ? "50,00000"
              : property?.rent_detail?.rent_per_month + "/month"}
          </Text>
          {property?.for_rent == "true" ? (
            <Text
              style={{
                fontSize: 16,
                fontWeight: "bold",
              }}
            >
              Members Allowed:{" "}
              {property?.rent_detail?.members == undefined
                ? "2"
                : property?.rent_detail?.members}
              {"\n"}
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "bold",
                  position: "absolute",
                  color: "#D3D3D3"
                }}
              >
                {parseInt(property?.created_at) == 0 ? "Published Today" : "Published " + property?.created_at +" ago" }
              </Text>
            </Text>
          ) : (
            <Text
              style={{
                fontSize: 12,
                fontWeight: "bold",
              }}
            >
              {parseInt(property?.created_at) == 0 ? "Published Today" : "Published " + property?.created_at +" ago" }
            </Text>
          )}
        {property?.for_rent ?( 
        <View style={{marginTop: "20%"}}>
          <Text style={{color:"#23b3d5", fontWeight: "bold"}}>Is apartment?: <Text style={{color:"#057a0f"}}> {property?.amenity?.apartment} </Text></Text>
          <Text style={{color:"#23b3d5", fontWeight: "bold"}} >Floor:  <Text style={{color:"#057a0f"}}>{property?.amenity?.floor_no}</Text></Text>
          <Text style={{color:"#23b3d5", fontWeight: "bold"}} >Bedroom(s):  <Text style={{color:"#057a0f"}}>{property?.amenity?.bedroom_count}</Text></Text>
          <Text style={{color:"#23b3d5", fontWeight: "bold"}} >Bathroom(s):  <Text style={{color:"#057a0f"}}>{property?.amenity?.bathroom_count}</Text></Text>
          <Text style={{color:"#23b3d5", fontWeight: "bold"}} >Poperty area?:  <Text style={{color:"#057a0f"}}>{property?.amenity?.house_area}</Text></Text>
          <Text style={{color:"#23b3d5", fontWeight: "bold"}} >Pet friendly?:  <Text style={{color:"#057a0f"}}>{property?.amenity?.apartment}</Text></Text>
          <Text style={{color:"#23b3d5", fontWeight: "bold"}} >Lift?:  <Text style={{color:"#057a0f"}}>{property?.amenity?.lift}</Text></Text>
          <Text style={{color:"#23b3d5", fontWeight: "bold"}} >Garage?:  <Text style={{color:"#057a0f"}}>{property?.amenity?.garage}</Text></Text>
        </View>):(<TouchableOpacity></TouchableOpacity>)}
        </View>
          <TouchableOpacity style={styles.callbutton}
          onPress={()=>Linking.openURL(`tel:${property?.contact}`)}>
          <Image 
                source={require("../../../assets/call.png")}
                style={{width: 20, height: 20,}}/>
          <Text  style={{
            color: "#FFF",
            fontFamily: "SemiBold",
            paddingLeft: 20,
            paddingRight: 20,
          }}> {property?.contact} </Text>
          </TouchableOpacity>
      </View>
      </View>
    );
  }
}
export default detail;
