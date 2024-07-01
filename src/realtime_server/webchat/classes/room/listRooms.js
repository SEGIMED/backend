import Room from "./room.js";

export class RoomsInstance {
    constructor() {
            this.rooms = []; // Aquí es donde guardamos las rooms
    }

    // Method to add a room
    addRoom(roomName) {
        const newRoom = new Room(roomName);
        this.rooms.push(newRoom);
        return this.getRoomByName(roomName);
    }

    // Método para obtener todas las rooms
    getRooms() {
        return this.rooms;
    }

    getRoomByName(roomName){        
        const findRoom = this.rooms.find((room) => room.name === roomName); 
        return findRoom
    }

    closeRoom(roomName){
        this.rooms = this.rooms.filter((room) => room.name !== roomName);
        return this.rooms
    }
    findRoomByUserId(id){
        return this.rooms.filter((room) => room.isUserExists(id));
    }

}


