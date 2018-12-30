import React from "react";
import { View, KeyboardAvoidingView, StyleSheet, Text, Image, TextInput, Button} from "react-native";
import { connect } from 'react-redux';

import {register} from '../redux/actions';

class RegisterScreen extends React.Component {
    state = {
        name: '',
        username: '',
        password: '',
    }

    handleNameUpdate = name => {
        this.setState({name});
    }

    handleUsernameUpdate = username => {
        this.setState({username});
    }

    handlePasswordUpdate = password => {
        this.setState({password})
    }

    handleRegister = async () => {
        this.props.register(this.state.name, this.state.username, this.state.password)
    }

    render() {
        return (
        <View style={styles.container}>
        <View style={{flexDirection: "row", alignItems: 'center', width: '100%', justifyContent: 'space-around'}}>
            <Image style={{width: 150, height: 150}} source={require('../images/fflogo.png')} />
            <Text style={styles.headerText}>Register for{'\n'}Faux Finance</Text>
        </View>
        
        <KeyboardAvoidingView style={styles.notHeader} behavior="padding" enabled >
            <TextInput style={styles.usernameInput}
                placeholder={'Name'}
                value={this.state.name}
                onChangeText={this.handleNameUpdate}
                autoCapitalize="none"
                autoCorrect={false}
                returnKeyType='next'
            />
            <TextInput style={styles.usernameInput}
                placeholder={'Email'}
                value={this.state.username}
                onChangeText={this.handleUsernameUpdate}
                autoCapitalize="none"
                autoCorrect={false}
                returnKeyType='next'
                keyboardType='email-address'
            />
            <TextInput style={styles.passwordInput}
                placeholder={'Password'}
                value={this.state.password}
                onChangeText={this.handlePasswordUpdate}
                autoCapitalize="none"
                autoCorrect={false}
                secureTextEntry={true}
                returnKeyType='done'
            />
            <Button 
                title={'Register'}
                disabled={!this.state.name || !this.state.username || !this.state.password}
                onPress={this.handleRegister}
            />
        </KeyboardAvoidingView>

        </View>
        );
    }
}

const mapStateToProps = state => ({ 
    user: state.user.user,
    error: state.user.error
});
  
export default connect(mapStateToProps, {register})(RegisterScreen);


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center", 
        justifyContent: "space-between",
        paddingTop: 20
    },
    notHeader: {
        marginBottom: 50,
    },
    usernameInput: {
        fontSize: 20,
        padding: 10,
        margin: 20,
        alignSelf: 'center'
    },
    passwordInput: {
        fontSize: 20,
        padding: 10,
        margin: 10,
        alignSelf: 'center'
    },
    headerText: {
        fontSize: 26,
        fontWeight: 'bold',
        textAlign: 'center',
        marginRight: 10
    }
});