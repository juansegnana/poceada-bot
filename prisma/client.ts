import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    console.log('Conectando DB...')
    await prisma.$connect();
    console.log('Listo!')
}

main().catch((e) => {
    throw e;
});

// Create
const createUser = async (chatId: number) => {
    const userCreated = await prisma.user.create({
        data: {
            id: chatId,
            cant_jugadas: 0
        }
    });
    return userCreated;
};

const createJugada = async (chatId: number, jugada: string) => {
    const jugadaCreated = await prisma.jugada.create({
        data: {
            chatId,
            jugada,
        }
    });
    await updateCantidad(chatId);
    return jugadaCreated;
}

// Read
const getUser = async (chatId: number) => {
    const user = await prisma.user.findUnique({
        where: {
            id: chatId,
        },
    });
    return user;
}

const getUsers = async () => {
    const users = await prisma.user.findMany();
    return users;
}

const getJugadas = async () => {
    const jugadas = await prisma.jugada.findMany({
        where: {
            isSent: false,
        }
    });
    return jugadas;
}

const getUserJugadas = async (chatId: number) => {
    const jugadasUser = await prisma.jugada.findMany({
        where: {
            isSent: false,
            chatId,
        }
    });
    return jugadasUser;
}

// Update
const updateCantidad = async (chatId: number) => {
    const updateUser = await prisma.user.update({
        where: {
            id: chatId,
        },
        data: {
            cant_jugadas: { increment: 1 },
        },
    });
    return updateUser;
}

const updateState = async (jugadaId: string) => {
    const updateJugada = await prisma.jugada.update({
        where: {
            id: jugadaId,
        },
        data: {
            isSent: true,
        },
    });
    return updateJugada;
}

// Delete
const deleteUser = async (chatId: number) => {
    const deletedUser = await prisma.user.delete({
        where: {
            id: chatId,
        },
    });
    return deletedUser;
}

const deleteUserJugadas = async (chatId:number) => {
    const deletedUserJugadas = await prisma.jugada.deleteMany({
        where: {
            chatId,
        },
    });
    return deletedUserJugadas;
}

const deleteJugadas = async () => {
    const deleteUsers = await prisma.jugada.deleteMany({
        where: {
            isSent: true,
        },
    });
    return deleteUsers;
};

export {
    prisma,
    // Functions
    createUser,
    createJugada,
    getUser,
    getUsers,
    getJugadas,
    getUserJugadas,
    updateCantidad,
    updateState,
    deleteUser,
    deleteUserJugadas,
    deleteJugadas,
};