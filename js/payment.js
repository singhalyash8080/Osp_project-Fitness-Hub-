const queryString = window.location.search

$('.logo').attr('href', './homeUser.html?' + queryString.split('?')[1])

$('.profile').attr('href', './profileUser.html?' + queryString.split('?')[1])

$('.payment').attr('href', './payment.html?' + queryString.split('?')[1])
