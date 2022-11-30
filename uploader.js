const Client = require('ssh2-sftp-client');

let sftp = new Client();

function uploadToServer(host, un, pw, path, filename) {

    const config = {
        host: host,
        username: un,
        password: pw,
        port: 22
    };

    sftp.connect(config)
        .then(() => {
            return sftp.put(data, remote);
        })
        .then(() => {
            return sftp.end();
        })
        .catch(err => {
            console.error(err.message);
        });
}

exports.uploadToServer = uploadToServer;