// :: commands

const NPC = require('../model/npc');

async function command(socket, message) {
    const { player } = socket;
    const { command, args } = message;

    if (!player.isAdministrator()) {
        return;
    }

    switch (command) {
        case 'appearance':
            player.sendAppearance();
            break;
        case 'step':
            const deltaX = +args[0];
            const deltaY = +args[1];

            player.message(player.canWalk(deltaX, deltaY).toString());
            player.walkTo(deltaX, deltaY);
            break;
        case 'npc': {
            const npc = new NPC(player.world, {
                id: +args[0],
                x: player.x,
                y: player.y,
                minX: player.x - 4,
                maxX: player.x + 4,
                minY: player.y - 4,
                maxY: player.y + 4
            });

            player.spawnedNPCs.push(npc);
            player.world.addEntity('npcs', npc);
            break;
        }
    }
}

module.exports = { command };