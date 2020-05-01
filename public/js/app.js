
const fuelForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')



fuelForm.addEventListener('submit', (e) => {
    e.preventDefault();
    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''
    const postCode = search.value

    fetch('/location?postCode=' + postCode).then((response) => {
        response.json().then((data) => {

            if (data.error) {
                messageTwo.textContent = data.error
                return;
            } else {

                if (data.stations.length > 0) {
                    messageOne.textContent = JSON.stringify(data.stations)
                    messageTwo.textContent = JSON.stringify(data.prices)
        
                } else {
                    messageOne.textContent = 'No Data Found'
                }
               
            }
        })
    })


})