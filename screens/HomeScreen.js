import React from "react";
import { View, StyleSheet, Text} from "react-native";
import Table from './components/Table';
import { connect } from 'react-redux';

import {getPortfolio} from '../redux/actions';

class HomeScreen extends React.Component {
    static navigationOptions = {
        headerTitle: 'Your Portfolio',
    };

    componentDidMount() {
        this.loadPortfolio();
    }

    loadPortfolio = async () => {
        this.props.getPortfolio(this.props.screenProps.user.id)
      }

    render() {
        return (
        <View style={styles.container}>
        {(this.props.portfolio === undefined) && 
            <Text style={{color: 'grey'}}>Retreiving your stocks...</Text>
        }
        { this.props.portfolio && 
            <Table
                portfolio={this.props.portfolio}
                user={this.props.screenProps.user}
            />
        }
        </View>
        );
    }
}



const mapStateToProps = state => ({ 
    portfolio: state.portfolio.portfolio
});
  
export default connect(mapStateToProps, {getPortfolio})(HomeScreen);


const styles = StyleSheet.create({
    container: {
        alignItems: "center", 
        justifyContent: "center",
        paddingTop: 20
    },
});