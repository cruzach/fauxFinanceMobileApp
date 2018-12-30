export const loadPortfolio = async (id) => {
    var Results = [];
        const response = await fetch('https://rocky-everglades-18419.herokuapp.com/portfolio', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                id: id
            })
        })
        const list = await response.json()
        for(const each of list) {
            const response = await fetch(`https://api.iextrading.com/1.0/stock/${each.symbol}/batch?types=quote,news,chart&range=1m&last=1`)
            const data = await response.json();
            Results = await Results.concat({
                            companyName: data.quote.companyName,
                            symbol: each.symbol,
                            shares: each.sum,
                            averageCostPerShare: parseFloat(each.avg),
                            currentCostPerShare: data.quote.latestPrice,
                            profit: data.quote.latestPrice - parseFloat(each.avg)
                        })
        }
        return Results;
}

export const loginUser = async (username, password) => {
    const response = await fetch('https://rocky-everglades-18419.herokuapp.com/signin', {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            email: username,
            password: password
        })
    })
    const user = await response.json();

    if (user.id) {
        return user;
    } else {
        throw 'Unable to Log in';
    }
}

export const registerUser = async (name, username, password) => {
    const response = await fetch('https://rocky-everglades-18419.herokuapp.com/register', {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            name: name,
            email: username,
            password: password
        })
    })
    const user = await response.json();
    return user;
}