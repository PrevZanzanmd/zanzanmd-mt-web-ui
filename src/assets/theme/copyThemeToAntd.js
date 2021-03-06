var fs = require('fs')

const copy = (entry, output) => fs.writeFileSync(output, fs.readFileSync(entry))

copy('./src/assets/theme/colors.less', './node_modules/antd/lib/style/color/colors.less')
copy('./src/assets/theme/default.less', './node_modules/antd/lib/style/themes/default.less')

copy('./src/assets/img/favicon.ico', './dist/favicon.ico')

console.log('copy complete!')
