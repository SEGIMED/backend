
export const mapUser = (user) =>{
    return {
    userId : user.id,
        idNumber : user.idNumber,
        userIdType : user.userIdType.name,
        name: user.name,
        lastname: user.lastname,
        role: user.userRole.roleName,
        verified: user.verified,
        avatar: user.avatar,
        cellphone: user.cellphone,
        email: user.email,
        nationality: user.userNationality?.nationality,
        lastLogin: user.lastLogin,
    }
}

export const mapUserMongoDB = (user) => {
    return {
            userId : user.id,
            idNumber : user.idNumber,
            fullName: `${user.name} ${user.lastname}`,
            role: user.userRole.roleName,
            avatar: user.avatar,
            nationality: user.userNationality?.nationality,
        }
}