import React from "react";
import { View, StyleSheet, Text, TouchableOpacity, TextInput} from "react-native";
import HistoryChart from './components/HistoryChart';

export default class LookupScreen extends React.Component {
    static navigationOptions = {
        headerTitle: 'Company Lookup',
    };

    state = {
        query: '',
        results: [],
        chartDataRaw: [],
    };
    
    getStocks = async () => {
        try {
            const response = await fetch(`https://api.iextrading.com/1.0/stock/${this.state.query}/batch?types=quote,news,chart&range=1m&last=1`);
            const data = await response.json();
            this.setState({
                query: '', 
                results:data.quote,
                chartDataRaw: data.chart,
            });
        } catch {
            alert('Error retrieving stock information')
        }
    }

    handleQueryChange() {
        this.getStocks();
    }

    render() {
        var metaData = null;
        var chartData = null;
        var chartXLabels = null;
        if(this.state.chartDataRaw) {
            chartData = this.state.chartDataRaw.map(each => each.vwap);
            chartXLabels = this.state.chartDataRaw.map(each => each.label);
            metaData = this.state.results;
        }
        return (
            <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
            <View style={{borderBottomWidth: 1, borderColor: '#C7C7CD' }} >
                <TextInput style={styles.searchField}
                    placeholder="Search for stocks by symbol..." 
                    onSubmitEditing={() => this.handleQueryChange()} 
                    returnKeyType='search'
                    onChangeText={(text) => this.setState({query: text})}
                    autoCorrect={false}
                    autoCapitalize='characters'
                />
            </View>
            {((this.state.results.length !== 0) && (<View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                <Text style={styles.name}>{metaData.companyName} ({metaData.symbol})</Text>
                <Text style={styles.price}>Price: ${metaData.latestPrice}</Text>
                <Text>{metaData.symbol}'s Performance over the past Month</Text>
                <HistoryChart metaData={metaData} chartData={chartData} chartXLabels={chartXLabels}/>
            </View>))}
        </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        alignItems: "center", 
        justifyContent: "center"
    },
    searchField: {
        padding: 10,
    },
    name: {
        padding: 10,
        fontSize: 18,
    },
    price: {
        padding: 10,
        fontSize: 14,
        paddingBottom: 20,
    },
    link: {
        color: 'blue',
    }
});