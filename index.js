const { createElement, useEffect, useState } = require('react')

const useHistory = () => {
	const [url, setUrl] = useState(location.pathname)
	const [state, setState] = useState(window.history.state)

	const handlePopstate = (ev) => {
		setUrl(location.pathname)
		setState(ev.state)
	}

	const navigate = (url, state = {}) => {
		setUrl(url)
		setState(state)
		window.history.pushState(state, null, url)
	}

	const handleLink = event => {
		event.preventDefault()
		navigate(event.target.href)
	}

	const Link = props => createElement(
		'a',
		Object.assign(
			props,
			{ onClick: handleLink }
		)
	)

	useEffect(() => {
		window.addEventListener('popstate', handlePopstate)

		return () => window.removeEventListener('popstate', handlePopstate)
	})

	return {
		url,
		state,
		navigate,
		handleLink,
		Link,
	}
}

module.exports = useHistory