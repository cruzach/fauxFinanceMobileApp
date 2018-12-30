import React from 'react'
import {StyleSheet, View, Text, FlatList } from 'react-native'

const Row = props => {
        return (
            <View style={{alignItems: 'center', justifyContent: 'center', flexDirection: 'column', borderBottomWidth: 1 }}>
                <Text style={styles.symbol}>{props.companyName} - {props.symbol}</Text>
                <View style={{flex:1, alignItems: 'center', justifyContent: 'center', flexDirection: 'row'}}>
                    <Text style={styles.shares}>{props.shares} shares</Text>
                    <Text style={styles.currentPrice}>Current Price: ${props.currentCostPerShare.toFixed(2)}</Text>
                    <Text style={[styles.profit,(props.profit > 0 ? {color: 'green'} : {color: 'red'})]}>Profit: ${props.profit.toFixed(2)}</Text>
                </View>
            </View>
        );
}

export default class Table extends React.Component {

    renderItem = ({item}) => (
        <View >
            <Row {...item} />
        </View>
    );

    render() {
        const filteredHoldings = this.props.portfolio.filter((each)=> each.shares>0)
        return (
            <View style={styles.container}>
                <FlatList
                    data={filteredHoldings}
                    renderItem={this.renderItem}
                    keyExtractor={(item, index) => String(item.symbol)}
                />
                {filteredHoldings.length === 0 && 
                    <Text style={styles.noHoldings}>Currently no holdings, head to the Trade tab to buy some shares!</Text>
                }
                <Text style={styles.cash}>Cash Available for Trading: ${this.props.user.totalcash}</Text>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        alignItems: "center", 
        justifyContent: "center"
    },
    symbol: {
        fontSize: 18,
        padding: 5,
        fontWeight: 'bold',
    },
    shares: {padding: 5,},
    currentPrice: {
        padding: 5,
    },
    avgPrice: {padding: 5,},
    profit: {padding: 5,},
    cash:{
        padding: 20,
        fontSize: 16,
        alignSelf: 'center'
    },
    noHoldings: {
        padding: 20,
        marginBottom: 150,
        fontSize: 16,
        alignSelf: 'center',
        textAlign: 'center',
    }
})
