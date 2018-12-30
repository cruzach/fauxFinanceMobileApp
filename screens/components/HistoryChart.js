import React from 'react'
import {View, Text } from 'react-native';
import { LineChart, Grid, YAxis } from 'react-native-svg-charts'

export default class HistoryChart extends React.PureComponent {

    render() {

        const data = this.props.chartData;

        const axesSvg = { fontSize: 10, fill: 'grey' };
        const verticalContentInset = { top: 10, bottom: 10 }
        const xAxisHeight = 30

        return (
            <View style={{ height: 340, padding: 20, flexDirection: 'row' }}>
                <YAxis
                    data={data}
                    style={{ marginBottom: xAxisHeight }}
                    contentInset={verticalContentInset}
                    svg={axesSvg}
                />
                <View style={{ flex: 1, marginLeft: 10 }}>
                    <LineChart
                        style={{ flex: 1 }}
                        data={data}
                        contentInset={verticalContentInset}
                        svg={{ stroke: 'rgb(134, 65, 244)' }}
                    >
                        <Grid/>
                    </LineChart>
                </View>
            </View>
        )
    }

}