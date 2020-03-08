const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const myLocWeather = document.querySelector('#location-weather')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const adress = search.value
    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''

    fetch(`/weather?address=${adress}`).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = data.error
            } else {
                messageOne.textContent = data.location
                messageTwo.textContent = data.forecast
            }
        })
    })

})

myLocWeather.addEventListener('click', () => {
    navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords
        search.value = ''
        messageOne.textContent = 'Loading...'
        messageTwo.textContent = ''

        fetch(`weather?location=${latitude},${longitude}`).then((response) => {
            response.json().then((data) => {
                if (data.error) {
                    messageOne.textContent = data.error
                } else {
                    messageOne.textContent = data.location
                    messageTwo.textContent = data.forecast
                }
            })
        })
    })
})