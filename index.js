const { createElement, useEffect } = require('react')
const { setGlobal, useGlobal } = require('reactn')

setGlobal({
	useHistoryUrl: location.pathname,
	useHistoryState: window.history.state,
})

const useNavigation = () => {
	const navigate = (url, state = {}, { push = true } = {}) => {
		setGlobal({
			useHistoryUrl: url,
			useHistoryState: state,
		})

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
		navigate,
		handleLink,
		Link,
	}
}

const useCurrentUrl = () => {
	const [url] = useGlobal('useHistoryUrl')
	const [state] = useGlobal('useHistoryState')
	return {url, state}
}

const useHistory = () => {
	const navigation = useNavigation()
	const url = useCurrentUrl()

	const handlePopstate = ev => {
		navigation.navigate(location.pathname, ev.state, { push: false })
	}

	useEffect(() => {
		window.addEventListener('popstate', handlePopstate)

		return () => window.removeEventListener('popstate', handlePopstate)
	})

	return Object.assign(url, navigation)
}

module.exports = useHistory

Object.assign(module.exports, {
	useHistory,
	useNavigation,
	useCurrentUrl,
})