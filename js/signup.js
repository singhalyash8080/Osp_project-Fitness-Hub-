function openCreateProfile() {

    if ($('#option').is(":checked")) {

        var body = {

            "name": $('#name').val(),
            "state": $('#state').val(),
            "phn": $('#phone').val(),
            "address": $('#address').val(),
            "email": $('#email').val(),
            "password": $('#pwd').val(),
            "base": '',
            "temp": ''

        }

        console.log(body)

        var requestOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body)
        }

        fetch('http://localhost/osp/member-details-create.php', requestOptions)
            .then((response) => { return (response.json()) })
            .then((data) => {
                console.log(data)

                alert('Member profile created successfully !')

                window.location.replace('./homeUser.html?'+$('#email').val())

            })

    }
    else {

        // window.location.replace('./createOwnerProfile.html')

        var body = {

            "name": $('#name').val(),
            "state": $('#state').val(),
            "phn": $('#phone').val(),
            "address": $('#address').val(),
            "email": $('#email').val(),
            "password": $('#pwd').val()

        }

        console.log(body)

        var requestOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body)
        }

        fetch('http://localhost/osp/gym-ownerdetail-create.php', requestOptions)
            .then((response) => { return (response.json()) })
            .then((data) => {
                console.log(data)

                alert('Owner profile created successfully !')

                window.location.replace('./homeGym.html?'+$('#email').val())

            })

    }
}