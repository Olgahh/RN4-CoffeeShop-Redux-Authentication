import React, { Component } from "react";

// Screen Names
import { LOGIN, SHOP, COFFEESHOPS } from "../../Navigation/screenNames";

// Styling Components
import { TextInput, TouchableOpacity, View } from "react-native";
import { Text } from "native-base";
import styles from "./styles";
import { connect } from "react-redux";
import { signup } from "../../redux/actions";

class Login extends Component {
  state = {
    username: "",
    password: "",
  };

  render() {
    const { navigation, signup } = this.props;
    const { username, password } = this.state;

    const goToCoffeeList = () =>
      navigation.navigate(SHOP, { screen: COFFEESHOPS });
    return (
      <View style={styles.authContainer}>
        <Text style={styles.authTitle}>SIGNUP</Text>
        <TextInput
          style={styles.authTextInput}
          placeholder="Username"
          placeholderTextColor="#A6AEC1"
          value={username}
          onChangeText={(username) => this.setState({ username })}
        />
        <TextInput
          style={styles.authTextInput}
          placeholder="Password"
          placeholderTextColor="#A6AEC1"
          secureTextEntry={true}
          value={password}
          onChangeText={(password) => this.setState({ password })}
        />
        <TouchableOpacity
          style={styles.authButton}
          onPress={() => signup(this.state, goToCoffeeList)}
        >
          <Text style={styles.authButtonText}>Log in</Text>
        </TouchableOpacity>
        <Text
          style={styles.authOther}
          onPress={() => navigation.replace(SIGNUP)}
        >
          Click here to register!
        </Text>
      </View>
    );
  }
}

const mapDispatchToProps = { signup };

export default connect(null, mapDispatchToProps)(Signup);
