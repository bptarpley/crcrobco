document.querySelector('.hamburger-button').addEventListener('click', function() {
   document.querySelector('.hamburger-links').style.display = 
   (document.querySelector('.hamburger-links').style.display == 'none') ? 'block' : 'none';
});

function doTickerAnimation(ticker) {
	const animate = () => {
		const value = +ticker.getAttribute('data-total')
		const speed = +ticker.getAttribute('data-duration')
		const data = +ticker.innerText.replace(',', '')
		const time = value / speed

		if(data < value) {
			ticker.innerText = Math.ceil(data + time).toLocaleString()
			setTimeout(animate, 1)
		} else {
			ticker.innerText = value.toLocaleString()
		}
	}

	animate()
}

function handleTickerIntersection(entries) {
	entries.map((entry) => {
		if (entry.isIntersecting) {
			doTickerAnimation(entry.target)
		}
	})
}

const tickerObserver = new IntersectionObserver(handleTickerIntersection)

window.onload = function(event) {
	const tickers = document.querySelectorAll('.ticker')
	tickers.forEach(t => tickerObserver.observe(t))
}
