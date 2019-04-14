const { useEffect, useState } = require('react')

const useHistory = () => {
	const [url, setUrl] = useState(location.pathname)
	const [state, setState] = useState(window.history.state)

	const handlePopstate = (ev) => {
		setUrl(location.pathname)
		setState(ev.state)
	}

	useEffect(() => {
		window.addEventListener('popstate', handlePopstate)

		return () => window.removeEventListener('popstate', handlePopstate)
	})

	return {
		navigate(url, state = {}) {
			setUrl(url);
			setState(state);
			window.history.pushState(state, null, url);
		}
	}
}
