import axios from "axios";
import { BASE_URL } from "../config/api";

export const uploadToS3 = async (file, folder) => {

    const presign = await axios.post(
        `${BASE_URL}/admin/s3/presign`,
        {
            filename: file.name,
            folder,
        },
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("admin_token")}`
            }
        }
    );

    const { upload_url, file_url } = presign.data;

    await axios.put(upload_url, file, {
        headers: {
            "Content-Type": file.type,
            "x-amz-acl": "public-read",
        },
    });

    return file_url;
};