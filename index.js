const { createElement, useEffect } = require('react')
const { setGlobal, useGlobal } = require('reactn')

setGlobal({
	useHistoryUrl: location.pathname,
	useHistoryState: window.history.state,
})

const navigate = (url, state = {}, { push = true } = {}) => {
	setGlobal({
		useHistoryUrl: url,
		useHistoryState: state,
	})

	if(push) {
		window.history.pushState(state, null, url)
	}
}

const handleLink = event => {
	event.preventDefault()
	navigate(event.target.pathname)
}

const Link = props => createElement(
	'a',
	Object.assign(
		{},
		props,
		{ onClick: handleLink }
	)
)

const useCurrentUrl = () => {
	const [url] = useGlobal('useHistoryUrl')
	const [state] = useGlobal('useHistoryState')
	return {url, state}
}

const useHistory = () => {
	const handlePopstate = ev => {
		navigate(location.pathname, ev.state, { push: false })
	}

	useEffect(() => {
		window.addEventListener('popstate', handlePopstate)
		return () => window.removeEventListener('popstate', handlePopstate)
	})

	return useCurrentUrl()
}

module.exports = useHistory

Object.assign(module.exports, {
	useHistory,
	useCurrentUrl,
	navigate,
	handleLink,
	Link,
})