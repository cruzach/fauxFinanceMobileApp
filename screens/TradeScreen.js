import React from "react";
import { View, StyleSheet, Text, TextInput, Button, Picker, KeyboardAvoidingView} from "react-native";
import { connect } from 'react-redux';

import {getPortfolio} from '../redux/actions';

class TradeScreen extends React.Component {
    static navigationOptions = {
        headerTitle: 'Trade',
    };

    state = {
        buyDisabled: false,
        sellDisabled: false,
        actionString: '',
        sellStockName:'',
        searchValue: '',
        results: [],
        searchResultSymbol: '',
        searchResultPrice: '',
        tradeCount: '',
        portfolio: [],
        pickerResult: '',
    }

    componentDidMount() {
        this.loadPortfolio();
    }

    loadPortfolio = async () => {
        this.props.getPortfolio(this.props.screenProps.user.id)
    }

    updateUser = (data) => {
        this.props.screenProps.user.totalcash = data.totalcash;
      }
    
    selectTransactionType(type) {
        if(type === 'buy') {
            this.setState({
                buyDisabled: true,
                sellDisabled: false,
                actionString: 'Buying',
                searchValue: '',
                results: [],
                searchResultSymbol: '',
                searchResultPrice: '',
                tradeCount: '',
            });
        } else if(type === 'sell'){
            this.setState({
                buyDisabled: false,
                sellDisabled: true,
                actionString: 'Selling',
                searchValue: '',
                results: [],
                searchResultSymbol: '',
                searchResultPrice: '',
                tradeCount: '',
            });
        }
    }

    onSearchSubmit = () => {
        fetch(`https://api.iextrading.com/1.0/stock/${this.state.searchValue}/batch?types=quote,news,chart&range=1m&last=1`)
            .then(response => response.json())
                .then(data => {
                    this.setState({results:data.quote, searchResultSymbol: data.quote.companyName, searchResultPrice: data.quote.latestPrice });
                })
            .catch(err=> {
                this.setState({searchValue: '', results:'', searchResultSymbol:'No stocks found for that symbol.'});
            })
        
    }

    onPickerResultChange = (itemValue) => {
        if (itemValue !== 'noValue') {
            this.setState({pickerResult: itemValue});
            fetch(`https://api.iextrading.com/1.0/stock/${itemValue}/batch?types=quote,news,chart&range=1m&last=1`)
                .then(response => response.json())
                    .then(data => {
                        this.setState({results:data.quote, searchResultSymbol: data.quote.companyName, searchResultPrice: data.quote.latestPrice });
                    })
                .catch(err=> {
                    this.setState({searchValue: '', results:'', searchResultSymbol:'No stocks found for that symbol.'});
                })
        }
    }

    onConfirmTrade = () => {
        var transactionType = null;
        if (this.state.actionString === 'Buying'){
            transactionType = 'BUY';
        } else if (this.state.actionString === 'Selling') {
            transactionType = 'SELL';
        }
        if(this.state.tradeCount%1 !== 0){
            return alert('ERROR: Shares purchased must be a whole number.')
        }
        if(this.state.tradeCount === 0 || this.state.results.length === 0){
            return alert('ERROR: Please choose a valid stock and sharecount.')
        }
        fetch('https://rocky-everglades-18419.herokuapp.com/trade', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                id: this.props.screenProps.user.id, 
                transactionType: transactionType,
                symbol: this.state.results.symbol,
                shareCount: this.state.tradeCount,
                costPerShare:this.state.results.latestPrice,
                cash: this.props.screenProps.user.totalcash 
            })
        })
            .then(response => response.json())
                .then(user => {
                    if (user.id) {
                        this.loadPortfolio(this.props.screenProps.user.id)
                        this.updateUser(user);
                        this.props.navigation.navigate('Home')
                    } else {
                        alert(user);
                    }
                })
    }

    render() {
        const filteredHoldings = this.props.portfolio.filter((each) => each.shares>0)
        return (
        <View style={styles.container}>
            <View style={{ flexDirection: 'row', justifyContent:'space-evenly' }}>
                <Button 
                    title='Buy'
                    disabled={this.state.buyDisabled}
                    onPress={() => this.selectTransactionType('buy')}
                />
                <Button 
                    title='Sell'
                    disabled={this.state.sellDisabled}
                    onPress={() => this.selectTransactionType('sell')}
                />    
            </View>
            
            <KeyboardAvoidingView style={styles.innerContainer} behavior="padding" enabled>
            
            {(this.state.actionString === 'Selling') && 
                <Picker
                    selectedValue={this.state.pickerResult}
                    style={styles.pickerInput}
                    onValueChange={(itemValue, itemIndex) => this.onPickerResultChange(itemValue)}>
                    <Picker.Item label={'Select a Stock'} value={'noValue'} />
                    {filteredHoldings.map((each,index) => {
                        return (<Picker.Item key={index} label={each.symbol} value={each.symbol} />)
                    })}
                </Picker>
            }

            {(this.state.actionString === 'Buying') && 
                <TextInput 
                    style={styles.searchBox}
                    autoCorrect={false}
                    autoCapitalize='characters'
                    placeholder={'Search by Symbol'}
                    value={this.state.searchValue}
                    onChangeText={(searchValue) => this.setState({searchValue})}
                    onSubmitEditing={this.onSearchSubmit}
                    onEndEditing={this.onSearchSubmit}
                    returnKeyType={'search'}
                />
            }

            {(this.state.actionString.length > 1) && 
                <TextInput 
                    style={styles.shareInput}
                    placeholder={`${this.state.actionString} how many shares?`}
                    value={(this.state.tradeCount).toString()}
                    onChangeText={(tradeCount) => this.setState({tradeCount})}
                    keyboardType={'numeric'}
                    returnKeyType={'done'}
                />
            }

            {/* summary string */}
            {(this.state.tradeCount > 0 && this.state.searchResultSymbol.length > 0) && 
                <Text style={styles.summaryText}>{`${this.state.actionString} ${this.state.tradeCount} shares of ${this.state.searchResultSymbol} @ $${this.state.searchResultPrice}`} {"\n"} 
                Total Cost: ${`${(this.state.tradeCount * this.state.searchResultPrice).toFixed(2)}`}
                </Text>
            }
            

            <Button 
                title={'Confirm Trade'}
                onPress={this.onConfirmTrade}
                disabled={!(this.state.tradeCount > 0 && this.state.searchResultSymbol.length > 0)}
            />

            
        </KeyboardAvoidingView>
        </View>
        );
    }
}

const mapStateToProps = state => ({ 
    portfolio: state.portfolio.portfolio,
});
  
export default connect(mapStateToProps, {getPortfolio})(TradeScreen);

const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        paddingTop: 20,
        flex: 1
    },
    innerContainer: {
        alignItems: 'center',
        flex: 1, 
        justifyContent: "space-evenly" 
    },
    shareInput: {
        padding: 15,
        fontSize: 16,
    },
    searchBox: {
        margin: 30,
        fontSize: 16,
        borderBottomWidth: 1,
        borderColor: '#C7C7CD',
    },
    pickerInput: {
        width: 200,
        height: 100
    },
    summaryText: {
        textAlign: 'center',
        paddingTop: 5,
    },
    confirmBtn: {
        alignSelf: 'flex-end',
    }
});