function openHomePage(){

    if($('#option').is(":checked")){

        window.location.replace('./homeUser.html')

    }
    else{

        window.location.replace('./homeGym.html')

    }

}