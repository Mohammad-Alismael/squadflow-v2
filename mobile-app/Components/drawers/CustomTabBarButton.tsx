import React from "react";
import PropTypes from "prop-types";
import { TouchableOpacity } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

CustomTabBarButton.propTypes = {};

const CustomTabBarButton = ({ children, onPress }) => {
  const [modalVisible, setModalVisible] = React.useState(false);

  const handlePress = () => {
    setModalVisible(true);
  };

  const handleClose = () => {
    setModalVisible(false);
  };

  return (
    <React.Fragment>
      <TouchableOpacity
        style={{
          justifyContent: "center",
          alignItems: "center",
          width: 40,
          height: 40,
          borderRadius: 30,
          backgroundColor: "#006241", // Set Add button background color to white
        }}
        onPress={handlePress}
      >
        <Ionicons name="add-outline" size={25} color="#fff" />
      </TouchableOpacity>
      {/*<BottomNavigationDrawer visible={modalVisible} onClose={handleClose} />*/}
    </React.Fragment>
  );
};

export default CustomTabBarButton;
