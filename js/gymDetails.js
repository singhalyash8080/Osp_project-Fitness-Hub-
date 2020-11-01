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


    var body = {

        "search": queryArray[1]
    }

    var requestOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body)
    }

    fetch('http://localhost/osp/get-member-profile.php', requestOptions)
        .then((response) => {

            return response.json()
        })
        .then((data) => {

            console.log(data)

            var current_amount = data[0].account_balance

            console.log('curr_amount:' + current_amount)

            console.log(monthly_price)

            if (parseInt(monthly_price) <= parseInt(current_amount)) {

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


                        var body = {
                            "email": queryArray[1],
                            "option": "sub",
                            "amount": monthly_price
                        }

                        var requestOptions = {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify(body)
                        }

                        fetch('http://localhost/osp/update_balance.php', requestOptions)
                            .then((response) => { return (response.json()) })

                        var body = {
                            "email": queryArray[1],
                            "status": "active"
                        }

                        var requestOptions = {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify(body)
                        }

                        fetch('http://localhost/osp/update_bstatus.php', requestOptions)
                            .then((response) => { return (response.json()) })

                        var body = {
                            "email": queryArray[1],
                            "status": "inactive"
                        }

                        var requestOptions = {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify(body)
                        }

                        fetch('http://localhost/osp/update_tstatus.php', requestOptions)
                            .then((response) => { return (response.json()) })

                        alert('Your account has been debited and the status of your selected base gym is now active !')

                    })

            }
            else{
                alert('Insufficient balance ! Please add $' + (monthly_price - current_amount) + ' more amount to select this gym !')

            }

        })

}

function selectTempGym() {

    var body = {

        "search": queryArray[1]
    }

    var days = prompt('Enter number of days for which you want to select this gym as temp gym.')


    var requestOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body)
    }

    fetch('http://localhost/osp/get-member-profile.php', requestOptions)
        .then((response) => {

            return response.json()
        })
        .then((data) => {

            console.log(data)

            var current_amount = data[0].account_balance

            var bgym_price = data[0].bgym_price

            console.log('curr_amount:' + current_amount+' amount needed : '+(monthly_price / 30) * days)

            console.log(monthly_price)

            if (((parseInt(monthly_price) / 30) * days <= parseInt(bgym_price))) {

                console.log('yes')

                var body = {
                    "email": queryArray[1],
                    "temp": gym_name,
                    "price": monthly_price
                }

                var requestOptions = {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(body)
                }

                fetch('http://localhost/osp/select-temp-gym.php', requestOptions)
                    .then((response) => { return (response.json()) })
                    .then((data) => {

                        //a route to update account balance

                        var body = {
                            "email": queryArray[1],
                            "option": "add",
                            "amount": ((bgym_price / 30) * days - (monthly_price / 30) * days)
                        }

                        var requestOptions = {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify(body)
                        }

                        fetch('http://localhost/osp/update_balance.php', requestOptions)
                            .then((response) => { return (response.json()) })

                        var body = {
                            "email": queryArray[1],
                            "status": "active"
                        }

                        var requestOptions = {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify(body)
                        }

                        fetch('http://localhost/osp/update_tstatus.php', requestOptions)
                            .then((response) => { return (response.json()) })

                        var body = {
                            "email": queryArray[1],
                            "status": "inactive"
                        }

                        var requestOptions = {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify(body)
                        }

                        fetch('http://localhost/osp/update_bstatus.php', requestOptions)
                            .then((response) => { return (response.json()) })

                        alert('Your account has been debited and the status of your selected temp gym is now active !')

                    })

            }
            else if (((parseInt(monthly_price) / 30) * days <= parseInt(current_amount))) {

                console.log('yeah')

                var body = {
                    "email": queryArray[1],
                    "temp": gym_name,
                    "price": (monthly_price)
                }

                var requestOptions = {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(body)
                }

                fetch('http://localhost/osp/select-temp-gym.php', requestOptions)
                    .then((response) => { return (response.json()) })
                    .then((data) => {

                        //a route to update account balance

                        var body = {
                            "email": queryArray[1],
                            "option": "sub",
                            "amount": ((bgym_price / 30) * days)
                        }

                        var requestOptions = {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify(body)
                        }

                        fetch('http://localhost/osp/update_balance.php', requestOptions)
                            .then((response) => { return (response.json()) })

                        var body = {
                            "email": queryArray[1],
                            "status": "active"
                        }

                        var requestOptions = {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify(body)
                        }

                        fetch('http://localhost/osp/update_tstatus.php', requestOptions)
                            .then((response) => { return (response.json()) })

                        var body = {
                            "email": queryArray[1],
                            "status": "inactive"
                        }

                        var requestOptions = {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify(body)
                        }

                        fetch('http://localhost/osp/update_bstatus.php', requestOptions)
                            .then((response) => { return (response.json()) })

                        alert('Your account has been debited and the status of your selected temp gym is now active !')
                    })
            }
            else {

                alert('Insufficient balance ! Please add $' + ((monthly_price / 30) * days - current_amount) + ' more amount to select this gym !')

            }

        })

}