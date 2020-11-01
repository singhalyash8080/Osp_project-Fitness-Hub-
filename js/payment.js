const queryString = window.location.search

$('.logo').attr('href', './homeUser.html?' + queryString.split('?')[1])

$('.profile').attr('href', './profileUser.html?' + queryString.split('?')[1])

$('.payment').attr('href', './payment.html?' + queryString.split('?')[1])

var queryArray = queryString.split('?')



function pay() {


    var body = {
        "email": queryArray[1],
        "option": "add",
        "amount": $('#amount').val()
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
        .then((data)=>{ alert('Payment successful !')})

}