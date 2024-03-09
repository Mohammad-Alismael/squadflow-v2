import React from "react";
import PropTypes from "prop-types";

HomeScreenAddDrawer.propTypes = {};

const HomeScreenAddDrawer = () => {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Add" component={AddScreen} />
    </Drawer.Navigator>
  );
};

const AddScreen = ({ navigation }) => {
  return (
    <View>
      <TouchableOpacity onPress={() => navigation.openDrawer()}>
        <Ionicons name="menu" size={32} color="black" />
      </TouchableOpacity>
      <Text>Add Screen</Text>
    </View>
  );
};

export default HomeScreenAddDrawer;
