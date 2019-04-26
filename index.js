const { createElement, useEffect } = require('react')
const { setGlobal, useGlobal } = require('reactn')

setGlobal({
	useHistoryUrl: location.pathname,
	useHistoryState: window.history.state,
})

const useNavigation = () => {
	const [url, setUrl] = useGlobal('useHistoryUrl')
	const [state, setState] = useGlobal('useHistoryState')

	const navigate = (url, state = {}, { push = true } = {}) => {
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

	return {
		url,
		state,
		navigate,
		handleLink,
		Link,
	}
}

const useHistory = () => {
	const navigation = useNavigation()

	const handlePopstate = ev => {
		navigation.navigate(location.pathname, ev.state, { push: false })
	}

	useEffect(() => {
		window.addEventListener('popstate', handlePopstate)

		return () => window.removeEventListener('popstate', handlePopstate)
	})

	return navigation
}

module.exports = useHistory

Object.assign(module.exports, {
	useHistory,
	useNavigation,
})