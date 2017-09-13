exports.router = (handle, pathname, res, param = {}) => {
	typeof handle[pathname] === 'function' ? handle[pathname](res, param) : console.log('no request handlers')
}