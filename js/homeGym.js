
const queryString = window.location.search

$('.logo').attr('href','./homeGym.html?'+ queryString.split('?')[1])

$('.profile').attr('href','./profileOwner.html?'+ queryString.split('?')[1])

function openAddGym() {

    window.location.replace('./addGym.html?'+queryString.split('?')[1])

}

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

            var ob = `<div class="card text-white cardStyle">
            <div class="card-body">
              <h4 class="card-title">`+ data[i].gym_name + `</h4>
              <p class="card-text">`+data[i].detail+`</p>
              <a href="./gymDetailsOwner.html?`+data[i].gym_name+`" class="card-link">View</a>
            </div>
          </div> <br>`

            $('.gyms_list').append(ob)

        }

    })