function logout() {

    var requestOptions = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        }
    }

    fetch('http://localhost/osp/logout.php', requestOptions)
        .then((response) => {

            window.location.replace('./index.html')

        })

}

const queryString = window.location.search

$('.logo').attr('href','./homeUser.html?'+ queryString.split('?')[1])

$('.profile').attr('href','./profileUser.html?'+ queryString.split('?')[1])

$('.payment').attr('href', './payment.html?' + queryString.split('?')[1])



console.log(queryString.split('?')[1])

var body = {

    "search": queryString.split('?')[1]
}

var requestOptions = {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify(body)
}

fetch('http://localhost/osp/get-gymOwner-profile.php', requestOptions)
    .then((response) => {

        return response.json()
    })
    .then((data) => {

        $('.name').text(data[0].name)

        $('.state').text(data[0].state)

        $('.phone').text(data[0].phn)

        $('.location').text(data[0].address)

        $('.basegym').text(data[0].basegym)

        $('.basegym_price').text(data[0].bgym_price)

        $('.tempgym').text(data[0].tempgym)

        $('.tempgym_price').text(data[0].tgym_price)

        // $('.balance').text(data[0].balance)

    })
