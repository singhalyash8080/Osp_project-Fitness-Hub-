const queryString = window.location.search

var queryArray = queryString.split('/')

queryArray2 = queryArray[0].split('%20')

var searchText = ''

for (let i = 0; i < queryArray2.length; i++) {

    if (i == 0) {

        for (let j = 1; j < queryArray2[i].length; j++) {
            searchText += (queryArray2[i][j])
        }

        searchText += ' '
    }
    else if (i < queryArray2.length - 1) {

        searchText += (queryArray2[i] + ' ')

    }
    else {

        searchText += (queryArray2[i])

    }
}

console.log(searchText)

console.log(queryArray[1])

var body = {
    "search": searchText
}

var requestOptions = {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify(body)
}

var monthly_price = ''
var gym_name = ''

fetch('http://localhost/osp/fetch-gymbyname.php', requestOptions)
    .then((response) => { return (response.json()) })
    .then((data) => {
        console.log(data)

        $('.detailsHead').text(data[0].gym_name)
        gym_name = data[0].gym_name


        $('#location').text(data[0].location)

        $('#details').text(data[0].detail)

        $('#price').text(data[0].monthly_price)

        monthly_price = data[0].monthly_price

        $('#phone').text(data[0].phn)


    })



function selectBaseGym() {

    var current_amount = 1000000000 // route to retrieve current_amount

    console.log(monthly_price)

    if ((monthly_price <= current_amount)) {

        console.log('yes')

        var body = {
            "email": queryArray[1],
            "base": gym_name,
            "price": monthly_price
        }

        var requestOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body)
        }

        fetch('http://localhost/osp/select-base-gym.php', requestOptions)
            .then((response) => { return (response.json()) })
            .then((data) => {

                //a route to update account balance

                //a route to update active status of gym

                alert('Your account has been debited and the status of your selected base gym is now active !')

            })

    }
    else {
        alert('Insufficient balance ! Please add $' + (monthly_price - current_amount) + ' more amount to select this gym !')
    }

}

function selectTempGym() {

    var days = prompt('Enter number of days for which you want to select this gym !')

    console.log(monthly_price)
    var current_amount = 0 // route to retrieve current_amount

    console.log(days)

    if (((monthly_price / 30)*days <= current_amount)) {

        //a route to select temp gym
        //a route to update account balance
    }
    else {
        alert('Insufficient balance ! Please add $' + ((monthly_price / 30)*days - current_amount) + ' more amount to select this gym !')
    }

}