async function groundItemTake({ player }, { x, y, id }) {
    player.endWalkFunction = () => {
        const { world } = player;

        if (player.inventory.items.length >= 30) {
            return;
        }

        const groundItems = world.groundItems.getAtPoint(x, y);

        for (const groundItem of groundItems) {
            if (!groundItem.withinRange(player, 2)) {
                player.message("I can't reach that!");
                return;
            }

            if (
                groundItem.id === id &&
                (!groundItem.owner || groundItem.owner === player.id)
            ) {
                // if the item is on a table or something, face it
                if (player.x !== x || player.y !== y) {
                    player.faceEntity(groundItem);
                }

                player.inventory.add(groundItem);
                world.removeEntity('groundItems', groundItem);
                player.sendSound('takeobject');
                return;
            }
        }
    };
}

async function inventoryDrop({ player }, { index }) {
    player.endWalkFunction = () => player.inventory.drop(index);
}

async function inventoryWear({ player }, { index }) {
    player.sendSound('click');
    player.inventory.equip(index);
}

async function inventoryUnequip({ player }, { index }) {
    player.sendSound('click');
    player.inventory.unequip(index);
}

module.exports = {
    groundItemTake,
    inventoryDrop,
    inventoryWear,
    inventoryUnequip
};
