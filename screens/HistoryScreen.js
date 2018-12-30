import React from "react";
import { View, StyleSheet, Text, FlatList} from "react-native";
import Table from './components/Table';

export default class HistoryScreen extends React.Component {
    static navigationOptions = {
        headerTitle: 'Your Past Trades',
    };

    state = {
        history: [],
    }

    componentDidMount() {
        //this.loadHistory(1);
    }

    loadHistory = (id) => {
        var Results = [];
        fetch('https://rocky-everglades-18419.herokuapp.com/', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                id: id
            })
        })
            .then(response => response.json())
            .then(list => {
                list.forEach((each,index)=>{
                    fetch(`https://api.iextrading.com/1.0/stock/${each.symbol}/batch?types=quote,news,chart&range=1m&last=1`)
                    .then(response => response.json())
                    .then(data => {
                        Results = Results.concat({
                            companyName: data.quote.companyName,
                            symbol: each.symbol,
                            shares: each.sum,
                            averageCostPerShare: parseFloat(each.avg),
                            currentCostPerShare: data.quote.latestPrice,
                            profit: data.quote.latestPrice - parseFloat(each.avg)
                        })
                        this.setState({history: Results});
                    })
                })
            })
    }

    render() {
        return (
        <View style={styles.container}>
            <Table
                portfolio={this.state.history}
            />
        </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center", 
        justifyContent: "center"
    },
});