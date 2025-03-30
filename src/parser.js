export default function parser(string) {
    return formatLinks(decodeBase64(string))
}

const formatLinks = (string) => {
    const links = string.split('\r\n').filter(Boolean)
    return links.map(link2json)
}

const link2json = (link) => {
    const decodeLink = decodeURIComponent(link)
    const token = decodeLink.match(/^ss:\/\/(?<token>.*)@/).groups.token
    const plainLink = link.replace(
        /^ss:\/\/.*@/,
        `ss://${decodeBase64(token)}@`,
    )
    return new URL(plainLink)
}

const decodeBase64 = (string) => {
    return Buffer.from(string, 'base64').toString('utf8')
}
