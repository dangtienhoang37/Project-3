import ApiKey from "./apikey.chema"

export const findbyId = async (key: any) => {
    const objKey = await ApiKey.findOne({
        where: {
            key: key,
            status: true
        }
    })
    return objKey
}