var requestOptions = {
    method: "GET",
    headers: {
        "Content-Type": "application/json",
    }
}



fetch('http://localhost/osp/fetch-allgym.php', requestOptions)
    .then((response) => { return (response.json()) })
    .then((data) => {
        console.log(data)

        for (let i = 0; i < data.length; i++) {

            const queryString = window.location.search


            var ob = `<div class="card text-white cardStyle">
            <div class="card-body">
              <h4 class="card-title">`+ data[i].gym_name + `</h4>
              <p class="card-text">`+ data[i].detail + `</p>
              <a href="./gymDetailsUser.html?`+ data[i].gym_name + `/` + queryString.split('?')[1] + `" class="card-link">View</a>
            </div>
          </div> <br>`

            $('.gyms_list').append(ob)

        }

    })

const queryString = window.location.search

$('.logo').attr('href', './homeUser.html?' + queryString.split('?')[1])

$('.profile').attr('href', './profileUser.html?' + queryString.split('?')[1])

$('.payment').attr('href', './payment.html?' + queryString.split('?')[1])



function searchGym() {

    var body = {
        "search": $('#search_gym').val()
    }

    var requestOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body)
    }

    console.log(body)

    fetch('http://localhost/osp/fetch-gymbyname.php', requestOptions)
        .then((response) => { return (response).json() })
        .then((data) => {
            console.log(data)

            $('.gyms_list').empty()

            for (let i = 0; i < data.length; i++) {

                const queryString = window.location.search


                var ob = `<div class="card text-white cardStyle">
                <div class="card-body">
                  <h4 class="card-title">`+ data[i].gym_name + `</h4>
                  <p class="card-text">`+ data[i].detail + `</p>
                  <a href="./gymDetailsUser.html?`+ data[i].gym_name + `/` + queryString.split('?')[1] + `" class="card-link">View</a>
                </div>
              </div> <br>`

                $('.gyms_list').append(ob)

            }

        })

}