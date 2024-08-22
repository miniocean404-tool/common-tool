export const uuid = () => crypto.randomUUID()

export const blob_uuid = () => URL.createObjectURL(new Blob()).substr(-36)
