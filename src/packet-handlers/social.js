async function friendAdd({ player }, { username }) {
    if (username.toLowerCase() === player.username) {
        return;
    }

    player.addFriend(username);
}

async function friendRemove(socket, message) {
}

async function ignoreAdd(socket, message) {
}

async function ignoreRemove(socket, message) {
}

module.exports = { friendAdd, friendRemove, ignoreAdd, ignoreRemove };
