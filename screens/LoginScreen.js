import React from "react";
import { View, KeyboardAvoidingView, StyleSheet, Text, Image, TextInput, Button} from "react-native";
import { connect } from 'react-redux';

import {login} from '../redux/actions';

class LoginScreen extends React.Component {
    state = {
        username: '',
        password: ''
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.user === 'Unable to register.') {
            alert(nextProps.user);
        }
        else if (nextProps.user.id) {
            this.props.screenProps.user = nextProps.user;
            this.props.navigation.navigate('TabNavigator')
        } else {
            alert( nextProps.error)
        }
    }

    handleUsernameUpdate = username => {
        this.setState({username});
    }

    handlePasswordUpdate = password => {
        this.setState({password})
    }

    handleLogin = async () => {
        this.props.login(this.state.username, this.state.password)
    }

    render() {
        return (
        <View style={styles.container}>
        <View style={{flexDirection: "row", alignItems: 'center', width: '100%', justifyContent: 'space-around'}}>
            <Image style={{width: 150, height: 150}} source={require('../images/fflogo.png')} />
            <Text style={styles.headerText}>Welcome to {'\n'} Faux Finance</Text>
        </View>
        
        <KeyboardAvoidingView style={styles.notHeader} behavior="padding" enabled >
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
                title={'Login'}
                disabled={!this.state.password || !this.state.username}
                onPress={this.handleLogin}
            />
        </KeyboardAvoidingView>
        <Button 
            title={'No account? Click here to register!'}
            onPress={()=> this.props.navigation.navigate('RegisterScreen')}
        />
        </View>
        );
    }
}

const mapStateToProps = state => ({ 
    user: state.user.user,
    error: state.user.error
});
  
export default connect(mapStateToProps, {login})(LoginScreen);


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center", 
        justifyContent: "space-around",
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