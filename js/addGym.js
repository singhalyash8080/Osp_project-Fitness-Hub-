function backToHome(){


    var body = {
        "gymname": $('#name').val(),
        "location":  $('#state').val(),
        "price":  $('#price').val(),
        "detail": $('#details').val(),
        "phn":  $('#phone').val(),
        "created_by":  'yash@gmail.com'
    }

    console.log(body)

    var requestOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body)
    }

    fetch('http://localhost/osp/gym-detail-create.php', requestOptions)
        .then((response) => { return (response.json()) })
        .then((data) => {
            console.log(data)

            alert('Gym added successfully !')

            window.location.replace('./homeGym.html')

        })

}

const queryString = window.location.search

$('.logo').attr('href', './homeGym.html?' + queryString.split('?')[1])

$('.profile').attr('href', './profileOwner.html?' + queryString.split('?')[1])