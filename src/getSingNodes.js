export default function getSingNodes(server) {
    return { servers: server.map(parseNode) }
}

const parseNode = (node) => {
    return {
        type: 'shadowsocks',
        tag: decodeURIComponent(node.hash.substring(1)),
        server: node.hostname,
        server_port: +node.port,
        method: node.username,
        password: node.password,
        plugin: 'obfs-local',
        plugin_opts: node.searchParams.get('plugin'),
        udp_over_tcp: {
            enabled: true,
            version: 2,
        },
    }
}
