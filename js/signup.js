function openCreateProfile(){

    if($('#option').is(":checked")){

        window.location.replace('../createClientProfile.html')

    }
    else{

        window.location.replace('../createOwnerProfile.html')

    }
}