import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap
} from "react-leaflet";

import { useEffect, useState } from "react";
import L from "leaflet";
import api from "../api/axios";


const bikeIcon = new L.Icon({
  iconUrl:
    "https://cdn-icons-png.flaticon.com/512/9561/9561688.png",
  iconSize: [50, 50],
  iconAnchor: [25, 50],
  popupAnchor: [0, -45],
});


const foodIcon = new L.Icon({
  iconUrl:
    "https://cdn-icons-png.flaticon.com/512/1046/1046784.png",
  iconSize: [40, 40],
});


const homeIcon = new L.Icon({
  iconUrl:
    "https://cdn-icons-png.flaticon.com/512/1946/1946488.png",
  iconSize: [40, 40],
});


function MoveMap({ position }) {

  const map = useMap();

  useEffect(() => {

    map.flyTo(
      position,
      15,
      {
        duration: 1.5
      }
    );

  }, [position]);

  return null;
}



function LiveMap({ orderId }) {


  const restaurant = [
    12.9716,
    77.5946
  ];


  const customer = [
    12.9800,
    77.6100
  ];


  const [deliveryBoy, setDeliveryBoy] =
    useState([
      12.975,
      77.600
    ]);



  const fetchLocation = async () => {

    try {

      const response = await api.get(
        `/delivery/order/${orderId}/location/`
      );


      console.log(
        "BIKE LOCATION:",
        response.data
      );


      if (
        response.data.latitude &&
        response.data.longitude
      ) {


        const location = [

          Number(response.data.latitude),

          Number(response.data.longitude)

        ];


        console.log(
          "MOVING:",
          location
        );


        setDeliveryBoy(location);


      }


    } catch (error) {

      console.log(error);

    }

  };



  useEffect(() => {

    fetchLocation();


    const interval =
      setInterval(() => {

        fetchLocation();

      }, 5000);


    return () =>
      clearInterval(interval);


  }, [orderId]);



  return (

    <MapContainer

      center={deliveryBoy}

      zoom={15}

      className="h-96 w-full rounded-2xl"

    >


      <MoveMap position={deliveryBoy} />


      <TileLayer

        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"

      />


      <Marker
        position={restaurant}
        icon={foodIcon}
      >

        <Popup>
          Restaurant 🍔
        </Popup>

      </Marker>



      <Marker
        key={deliveryBoy.join("-")}
        position={deliveryBoy}
        icon={bikeIcon}
      >

        <Popup>
          Delivery Partner 🛵
        </Popup>

      </Marker>



      <Marker
        position={customer}
        icon={homeIcon}
      >

        <Popup>
          Your Location 🏠
        </Popup>

      </Marker>


    </MapContainer>

  );

}


export default LiveMap;