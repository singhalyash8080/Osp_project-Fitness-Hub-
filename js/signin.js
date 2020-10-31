function openHomePage() {

    if ($('#option').is(":checked")) {

        var body = {
            "email": $('#email').val(),
            "password": $('#pwd').val(),

        }

        console.log(body)

        var requestOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body)
        }

        fetch('http://localhost/osp/login-member.php', requestOptions)
            .then((response) => { return (response.json()) })
            .then((data) => {
                console.log((data))

                if (data.status != false) {
                    alert('Logged In successfully !')
                    window.location.replace('./homeUser.html?'+data[0].email)

                }
                else {
                    alert('Wrong password or username. Try again !')

                }


            })

    }
    else {


        var body = {
            "email": $('#email').val(),
            "password": $('#pwd').val(),

        }

        console.log(body)

        var requestOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body)
        }

        fetch('http://localhost/osp/login-gymowner.php', requestOptions)
            .then((response) => { return (response.json()) })
            .then((data) => {
                console.log(data)

                if (data.status != false) {
                    alert('Logged In successfully !')
                    window.location.replace('./homeGym.html?'+data[0].email)
                }
                else {
                    alert('Wrong password or username. Try again !')

                }

            })

    }

}