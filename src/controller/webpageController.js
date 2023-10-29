const webpageService = require('../service/webpageService')
const { isValidUrl } = require('../util/validator')

exports.checkWebpageCompliance = async function (req, res) {
    const activity = "Check Webpage Compliance"
    try {
        const { webpageUrl } = req.query || {}
        if (!webpageUrl || !isValidUrl(webpageUrl)) {
            console.log(`${activity} | webpage url is required and must be a valid url`)
            return res.status(400).send({ status: false, message: "webpage url is required and must be a valid url" })
        }
        const { status, message, code, data } = await webpageService.checkWebpageCompliance(webpageUrl)
        return res.status(code || 200).send({ status, ...(message && { message }), ...(data && { data }) })
    } catch (error) {
        console.log(`${activity} | Error while Checking Webpage Compliance`, error?.message, { error })
        return res.status(500).send({ status: false, message: `Error while Checking Webpage Compliance : ${error?.message}` })
    }
}